import { useParams } from "react-router-dom";
import { useMemo } from "react";
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

  // Submit Score Pop Up
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, openDialog, closeDialog, showPopUp, triggerDialog } =
    useDialog(dialogRef);

  // Set up game instance
  const { checkCharacterHit, won } = useGameLogic(
    openDialog,
    setCharacters,
    triggerDialog,
    characters
  );

  if (!level) return null;

  return (
    <main className={style.playWrapper}>
      {won && (
        <DialogSubmitScore
          dialogRef={dialogRef}
          closeDialog={closeDialog}
          isOpen={isOpen}
          levelName={levelName!}
        />
      )}

      <PlayBar
        levelName={level.name}
        artist={level.artist}
        source_url={level.source_url}
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
