import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import handleError from "../services/handleError.js";

type Entry = {
  id: string;
  username: string | null;
  startTime: Date;
  endTime: Date | null;
  durationMs: number | null;
  levelName: string;
  levelId: number;
};

const logStartTime = async (req: Request, res: Response) => {
  try {
    const entry = await prisma.leaderboard.create({
      data: {
        startTime: new Date(),
        levelName: req.body.levelName,
        levelId: req.body.levelId,
      },
    });

    res.status(200).json({ entryId: entry.id });
  } catch (e) {
    handleError(e, res);
  }
};

const logEndTime = async (req: Request, res: Response) => {
  try {
    await prisma.leaderboard.update({
      where: {
        id: req.body.entryId,
      },
      data: {
        endTime: new Date(),
      },
    });

    const entry = await prisma.leaderboard.findUnique({
      where: { id: req.body.entryId },
    });

    if (!entry) {
      return res.status(500).json({ error: "Entry could not be found." });
    }

    const durationMs = calculateDuration(entry);
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    res.status(200).json({ minutes, seconds });
  } catch (e) {
    handleError(e, res);
  }
};

const submitScore = async (req: Request, res: Response) => {
  try {
    const entry = await prisma.leaderboard.findUnique({
      where: { id: req.body.entryId },
    });

    if (!entry?.startTime || !entry.endTime) {
      return res.status(400).json({ error: "Start or end time is missing." });
    }

    const durationMs = calculateDuration(entry);

    await prisma.leaderboard.update({
      where: {
        id: entry.id,
      },
      data: {
        durationMs,
        username: req.body.username,
      },
    });

    res.sendStatus(200);
  } catch (e) {
    handleError(e, res);
  }
};

const getLeaderboardForLevel = async (req: Request, res: Response) => {
  try {
    const entries = await prisma.leaderboard.findMany({
      where: {
        levelName: req.body.levelName,
      },
    });
    res.status(200).json({ entries });
  } catch (e) {
    handleError(e, res);
  }
};

function calculateDuration(entry: Entry) {
  return (
    new Date(entry.endTime!).getTime() - new Date(entry.startTime).getTime()
  );
}

export { logStartTime, logEndTime, submitScore, getLeaderboardForLevel };
