import { useState } from "react";
import type { CharacterTag } from "../../types/LevelType.js";

function useGameLogic(
  openDialog: () => void,
  setCharacters: React.Dispatch<React.SetStateAction<CharacterTag[]>>,
  triggerDialogNoMatch: () => void,
  characters: CharacterTag[]
) {
  const [won, setWon] = useState(false);

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

  return { checkCharacterHit, won };
}

export default useGameLogic;
