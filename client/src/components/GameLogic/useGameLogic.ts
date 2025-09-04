import { useState, useEffect } from "react";
import type { CharacterTag } from "../../types/LevelType.js";

function useGameLogic(
  openDialog: () => void,
  setCharacters: React.Dispatch<React.SetStateAction<CharacterTag[]>>,
  triggerDialogNoMatch: () => void,
  characters: CharacterTag[],
  sessionRef: React.MutableRefObject<null>
) {
  const [won, setWon] = useState(false);
  const [minutesFinalScore, setMminutesFinalScore] = useState(0);
  const [secondsFinalScore, setsecondsFinalScore] = useState(0);

  useEffect(() => {
    const logEndTime = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/leaderboard/end-time`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              entryId: sessionRef.current,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setMminutesFinalScore(data.minutes);
          setsecondsFinalScore(data.seconds);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (won) {
      logEndTime();
    }
  }, [won, sessionRef]);

  const checkForWinner = (copyCharacters: CharacterTag[]) => {
    if (copyCharacters?.every((char) => char.tagged)) {
      console.log("You win!");
      setWon(true);
      openDialog();
    }
  };

  const checkCharacterHit = (nativeX: number, nativeY: number) => {
    let hit = false;
    const copyChar = characters?.map((char) => ({ ...char }));

    copyChar?.forEach((char) => {
      if (
        nativeX >= char.coordinates.x1 &&
        nativeX <= char.coordinates.x2 &&
        nativeY >= char.coordinates.y1 &&
        nativeY <= char.coordinates.y2
      ) {
        char.tagged = true;
        hit = true;
        setCharacters(copyChar);
        checkForWinner(copyChar);
      }
    });

    if (!hit) {
      triggerDialogNoMatch();
    }
  };

  return { checkCharacterHit, won, minutesFinalScore, secondsFinalScore };
}

export default useGameLogic;
