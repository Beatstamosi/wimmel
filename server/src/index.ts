import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import "./config/passport.js";
import leaderboardRouter from "./routes/leaderbordRouter.js";
import nodeCron from "node-cron";
import prisma from "./lib/prisma.js";

// Give access to environment variables
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS only in dev
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );
}

// Routes
app.use("/leaderboard", leaderboardRouter);

// Clean up empty submissions to database
nodeCron.schedule("*/30 * * * *", async () => {
  const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);

  try {
    await prisma.leaderboard.deleteMany({
      where: {
        username: null,
        startTime: { lt: oneHourAgo },
      },
    });
  } catch (e) {
    console.log("Error cleaning up database: ", e);
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
