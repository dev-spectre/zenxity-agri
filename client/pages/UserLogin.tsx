import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Phone } from "lucide-react";

export default function UserLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/user-dashboard");
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/user-dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 justify-center hover:opacity-80 transition"
        >
          <img src="/logo-transparent.png" alt="" className="w-10 h-10" />
          <span className="text-2xl font-bold text-primary">Zenxity</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            {isLogin
              ? "Sign in to your Zenxity account"
              : "Join Zenxity to book farming services"}
          </p>

          {isLogin ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email ID
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-foreground">
                  Full Name
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mobile" className="text-foreground">
                  Mobile Number
                </Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="9876543210"
                    className="pl-10"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signupEmail" className="text-foreground">
                  Email ID
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signupPassword" className="text-foreground">
                  Create Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          )}

          {/* Toggle Button */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail("");
                  setPassword("");
                  setFullName("");
                  setMobile("");
                }}
                className="text-primary font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
