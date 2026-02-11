import { Router } from 'express';
import prisma from '../prisma';
import { authenticateToken } from './auth';
import { Request, Response } from 'express';

const landRequestRouter = Router();

landRequestRouter.use(authenticateToken);

interface TokenPayload {
  userId: string;
  email: string;
}

interface LandRequest extends Request {
  user?: TokenPayload;
}

landRequestRouter.post("/request",  async (req: LandRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { landSize, preferredLanguage, landAddress, notes } = req.body;

    // Validate input
    if (!landSize || !preferredLanguage || !landAddress) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Create new farming request
    const newRequest = await prisma.farmingRequest.create({
      data: {
        userId,
        landSize,
        preferredLanguage,
        landAddress,
        notes,
      },
    });

    res.status(201).json({ message: "Land request submitted successfully", request: newRequest });
  } catch (error) {
    console.error("Error submitting land request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

landRequestRouter.get("/request", async (req: LandRequest, res) => {
  try {
    const userId = req?.user?.userId;
    const requests = await prisma.farmingRequest.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching land requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default landRequestRouter;