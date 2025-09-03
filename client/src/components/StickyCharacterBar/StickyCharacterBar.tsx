import style from "./StickyCharacterBar.module.css";
import type { CharacterTag } from "../../types/LevelType";

interface StickyCharacterBarProps {
  characters: CharacterTag[];
  showPopUpNoMatch: boolean;
}

function StickyCharacterBar({
  characters,
  showPopUpNoMatch,
}: StickyCharacterBarProps) {
  return (
    <div className={style.charWrapper}>
      {characters?.map((char, index) => (
        <div
          key={index}
          className={`${style.singleCharContainer} ${
            char.tagged ? style.tagged : ""
          }`}
        >
          <img
            src={char.image}
            alt={`Thumbnail of Character ${index + 1}`}
            className={style.charThumbnail}
          />
          <span>{char.name}</span>
        </div>
      ))}
      {showPopUpNoMatch && (
        <div className={style.popUpNoMatch}>No match - Try again!</div>
      )}
    </div>
  );
}

export default StickyCharacterBar;
