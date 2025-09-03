import { Router } from "express";
import {
  logStartTime,
  logEndTime,
  submitScore,
  getLeaderboardForLevel,
} from "../controllers/leaderboardController.js";

const leaderboardRouter = Router();

leaderboardRouter.post("/start-time", logStartTime);
leaderboardRouter.put("/end-time", logEndTime);
leaderboardRouter.put("/submit-highscore", submitScore);
leaderboardRouter.get("/:levelName", getLeaderboardForLevel);

export default leaderboardRouter;
