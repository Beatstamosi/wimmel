import { useParams } from "react-router-dom";
import { useMemo, useEffect } from "react";
import levels from "../../utils/levels";
import PlayBar from "../PlayBar/PlayBar.js";
import style from "./Play.module.css";
import { useRef, useState } from "react";
import useDialog from "../Dialog/useDialog.js";
import DialogSubmitScore from "../Dialog/DialogSubmitScore.js";
import StickyCharacterBar from "../StickyCharacterBar/StickyCharacterBar.js";
import useGameLogic from "../GameLogic/useGameLogic.js";
import ZoomableImage from "../ZoomableImage/ZoomableImage.js";
import type { CharacterTag } from "../../types/LevelType.js";
import useTimer from "../useTimer.js";

function Play() {
  // Prepare Characters
  const { levelName } = useParams();
  const level = useMemo(
    () => levels.find((lvl) => lvl.name === levelName),
    [levelName]
  );
  const updatedCharacters = useMemo(
    () =>
      level?.characters.map((char) => ({
        ...char,
        tagged: false,
      })),
    [level]
  );
  const [characters, setCharacters] = useState<CharacterTag[]>(
    updatedCharacters ?? []
  );

  // Pass starting time to backend; retrieve session Id and use to log other info to db
  const sessionRef = useRef(null);

  useEffect(() => {
    const logStartTime = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/leaderboard/start-time`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              levelName,
              levelId: level?.id,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          sessionRef.current = data.entryId;
        }
      } catch (e) {
        console.error(e);
      }
    };

    logStartTime();
  }, [levelName, level?.id]);

  // Submit Score Pop Up
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, openDialog, closeDialog, showPopUp, triggerDialog } =
    useDialog(dialogRef);

  // Set up game instance
  const { checkCharacterHit, won, minutesFinalScore, secondsFinalScore } =
    useGameLogic(
      openDialog,
      setCharacters,
      triggerDialog,
      characters,
      sessionRef
    );

  // UI Timer
  const { start, stop, minutes, seconds } = useTimer();
  // Start timer on page load
  useEffect(() => {
    start();
  }, [start]);

  // Stop timer when game is won
  useEffect(() => {
    if (won) stop();
  }, [won, stop]);

  if (!level) return null;

  return (
    <main className={style.playWrapper}>
      {won && (
        <DialogSubmitScore
          dialogRef={dialogRef}
          closeDialog={closeDialog}
          isOpen={isOpen}
          sessionRef={sessionRef}
          minutesFinalScore={minutesFinalScore}
          secondsFinalScore={secondsFinalScore}
          levelName={levelName!}
        />
      )}

      <PlayBar
        levelName={level.name}
        artist={level.artist}
        source_url={level.source_url}
        minutes={minutes}
        seconds={seconds}
      />

      <StickyCharacterBar
        characters={characters!}
        showPopUpNoMatch={showPopUp}
      />

      <ZoomableImage src={level.image} checkCharacterHit={checkCharacterHit} />
    </main>
  );
}

export default Play;
