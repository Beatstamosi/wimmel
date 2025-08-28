import { useParams } from "react-router-dom";
import levels from "../../utils/levels";
import PlayBar from "./PlayBar.jsx";
import style from "./Play.module.css";

function Play() {
  const { levelName } = useParams();
  const level = levels.find((lvl) => lvl.name === levelName);

  if (!level) return null;

  return (
    <main>
      {/* Static level/artist/timer bar */}
      <PlayBar
        levelName={level.name}
        artist={level.artist}
        source_url={level.source_url}
      />

      {/* Sticky character bar */}
      <div className={style.charWrapper}>
        {level.characters.map((char, index) => (
          <div key={index} className={style.singleCharContainer}>
            <img
              src={char.image}
              alt={`Thumbnail of Character ${index + 1}`}
              className={style.charThumbnail}
            />
            <span>{char.name}</span>
          </div>
        ))}
      </div>

      {/* Content that scrolls */}
      <div className={style.imageWrapper}>
        <img src={level.image} alt="" className={style.imagePlay} />
      </div>
    </main>
  );
}

export default Play;
