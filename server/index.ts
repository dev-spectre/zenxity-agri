import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import landRequestRouter from "./routes/landRequest";

export function createServer() {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:8080",
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/auth", authRouter);
  // app.use("/api/land", landRequestRouter);

  return app;
}
