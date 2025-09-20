import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import leaderboardRouter from "./routes/leaderbordRouter.js";
import { Request, Response } from "express";

// Give access to environment variables
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS in dev AND when CLIENT_URL is provided (Railway production)
if (process.env.NODE_ENV === "development" || process.env.CLIENT_URL) {
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );
}

// Routes
app.use("/leaderboard", leaderboardRouter);

// Serve static files only for "single service" deployment
if (process.env.NODE_ENV === "production" && !process.env.CLIENT_URL) {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
