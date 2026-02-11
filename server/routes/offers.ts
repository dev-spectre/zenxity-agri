import { Router } from "express";
import { authenticateToken } from "./auth";
import prisma from "../prisma";

const offerRouter = Router();

offerRouter.use(authenticateToken);

offerRouter.post("/", async (req, res) => {
  const { title, description, validUntil, img } = req.body;

  try {
    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        validUntil,
        img,
      },
    });

    return res.status(201).json({ offer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

offerRouter.get("/all", async (req, res) => {
  try {
    const offers = await prisma.offer.findMany({ where: {} });
    return res.status(200).json({ offers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

offerRouter.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.offer.delete({ where: { id } });
    return res.status(200).json({ message: "Offer deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default offerRouter;
