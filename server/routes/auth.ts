import { Request, Response, NextFunction, Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import prisma from "../prisma";

// 3. PASS THE ARGUMENT (This is what you missed)

// Load environment variables
dotenv.config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "30d";
const SALT_ROUNDS = 10;

// Prisma Client

// Google OAuth Client
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID || "",
  process.env.GOOGLE_CLIENT_SECRET || "",
  process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:3000/api/auth/google/callback",
);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface TokenPayload {
  userId: string;
  email: string;
}

interface AuthRequest extends Request {
  user?: TokenPayload;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Password Utilities
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateRandomToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// JWT Utilities
const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
};

const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
};

const generateTokens = (payload: TokenPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

// Validation Utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (
  password: string,
): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one number",
    };
  }
  return { valid: true };
};

const validateMobileNumber = (mobileNumber: string): boolean => {
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  return phoneRegex.test(mobileNumber) || true;
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// Email Utilities
const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
): Promise<void> => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Google OAuth Utilities
const getGoogleAuthUrl = (): string => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
};

const getGoogleUserInfo = async (code: string): Promise<GoogleUserInfo> => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user info from Google");
  }

  return await response.json();
};

// ============================================================================
// MIDDLEWARE
// ============================================================================

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: "Access token required" });
      return;
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ error: "Token expired" });
        return;
      }
      if (error.name === "JsonWebTokenError") {
        res.status(403).json({ error: "Invalid token" });
        return;
      }
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// ============================================================================
// ROUTE HANDLERS
// ============================================================================

// Sign Up
const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, mobileNumber } = req.body;

    // Validation
    if (!name || !email || !password || !mobileNumber) {
      res.status(400).json({
        error: "Name, email, password, and mobile number are required",
      });
      return;
    }

    if (!validateName(name)) {
      res
        .status(400)
        .json({ error: "Name must be at least 2 characters long" });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      res.status(400).json({ error: passwordValidation.message });
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      res.status(400).json({ error: "Invalid mobile number format" });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ error: "User with this email already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        mobileNumber,
      },
    });

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
      ...tokens,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Sign In
const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Check if user signed up with OAuth
    if (!user.password) {
      res.status(401).json({
        error:
          "This account was created with Google. Please sign in with Google.",
      });
      return;
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
    });

    res.status(200).json({
      message: "Sign in successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profilePicture: user.profilePicture,
      },
      ...tokens,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Google OAuth - Get Auth URL
const googleAuthUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const url = getGoogleAuthUrl();
    res.status(200).json({ url });
  } catch (error) {
    console.error("Google auth URL error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Google OAuth - Callback
const googleCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      res.status(400).json({ error: "Authorization code is required" });
      return;
    }

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(code);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (user) {
      // Update Google ID if not set
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: googleUser.id,
            profilePicture: googleUser.picture,
          },
        });
      }
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.id,
          profilePicture: googleUser.picture,
          isVerified: googleUser.verified_email,
        },
      });
    }

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
    });

    // Redirect to frontend with tokens
    const redirectUrl = `${process.env.CLIENT_URL}/user-dashboard?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Google callback error:", error);
    res.redirect(`${process.env.CLIENT_URL}/auth/error`);
  }
};

// Refresh Token
const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Generate new tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
    });

    res.status(200).json(tokens);
  } catch (error) {
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      res.status(403).json({ error: "Invalid refresh token" });
      return;
    }
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Forgot Password
const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists or not
    if (!user) {
      res.status(200).json({
        message:
          "If a user with that email exists, a password reset link has been sent",
      });
      return;
    }

    // Check if user has a password (not OAuth only)
    if (!user.password) {
      res.status(200).json({
        message:
          "If a user with that email exists, a password reset link has been sent",
      });
      return;
    }

    // Generate reset token
    const resetToken = generateRandomToken();
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    });

    // Send reset email
    await sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({
      message:
        "If a user with that email exists, a password reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset Password
const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ error: "Token and new password are required" });
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      res.status(400).json({ error: passwordValidation.message });
      return;
    }

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      res.status(400).json({ error: "Invalid or expired reset token" });
      return;
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Change Password (for authenticated users)
const changePassword = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!currentPassword || !newPassword) {
      res
        .status(400)
        .json({ error: "Current password and new password are required" });
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      res.status(400).json({ error: passwordValidation.message });
      return;
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Check if user has a password (not OAuth only)
    if (!user.password) {
      res.status(400).json({
        error: "Cannot change password for OAuth-only accounts",
      });
      return;
    }

    // Verify current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      res.status(401).json({ error: "Current password is incorrect" });
      return;
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Current User
const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        mobileNumber: true,
        profilePicture: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout
const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // In a stateless JWT setup, logout is typically handled client-side
    // by removing the tokens. However, you can implement token blacklisting here
    // if needed by storing invalidated tokens in Redis or database

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Auth Routes
const authRouter = Router();

// Public routes
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

// Google OAuth routes
authRouter.get("/google", googleAuthUrl);
authRouter.get("/google/callback", googleCallback);

// Protected routes (require authentication)
authRouter.get("/me", authenticateToken, getCurrentUser);
authRouter.post("/change-password", authenticateToken, changePassword);
authRouter.post("/logout", authenticateToken, logout);

authRouter.post("/admin/signin", async (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const tokens = generateTokens({
      email: "",
      userId: "",
    });

    return res.status(200).json({
      ...tokens,
    });
  } else {
    return res.status(400).json({
      message: "Wrong credentials",
    });
  }
});

export default authRouter;
