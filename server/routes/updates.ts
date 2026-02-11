import { Router } from "express";
import { authenticateToken } from "./auth";
import prisma from "../prisma";
import { Request } from "express";

const landRequestRouter = Router();

landRequestRouter.use(authenticateToken);

interface TokenPayload {
  userId: string;
  email: string;
}

interface LandRequest extends Request {
  user?: TokenPayload;
}

const updatesRouter = Router();

updatesRouter.use(authenticateToken);

updatesRouter.post("/", async (req, res) => {
  const { title, content, img, requestId } = req.body;

  try {
    const update = await prisma.farmingUpdates.create({
      data: {
        title,
        content,
        img,
        requestId,
      },
    });

    return res.status(201).json({ update });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

updatesRouter.get("/my", async (req: LandRequest, res) => {
  try {
    const updates = await prisma.farmingUpdates.findMany({
      where: {
        request: {
          user: {
            id: req.user.userId,
          },
        },
      },
    });

    return res.status(201).json({ updates });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default updatesRouter;
