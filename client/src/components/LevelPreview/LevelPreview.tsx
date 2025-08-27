import style from "./LevelPreview.module.css";
import type { LevelType } from "../../types/LevelType";
import { Link } from "react-router-dom";

interface LevelPreviewProps {
  level: LevelType;
}

function LevelPreview({ level }: LevelPreviewProps) {
  return (
    <div className={style.levelContainer}>
      <img
        src={level.image}
        alt={`Thumbnail of ${level.name}`}
        className={style.thumbnail}
      />

      <span className={`${style.difficultyBadge} ${style[level.difficulty.toLowerCase()]}`}>
        {level.difficulty}
      </span>

      <h2 className={style.levelName}>{level.name}</h2>
      <p className={style.levelArtist}>
        Artist:{" "}
        <a href={level.source_url} target="_blank" rel="noopener noreferrer">
          {level.artist}
        </a>
      </p>

      <div className={style.buttonGroup}>
        <Link to={`/play/${level.name}`} className={style.buttonPrimary}>
          ▶ Play
        </Link>
        <Link to={`/leaderboards/${level.name}`} className={style.buttonSecondary}>
          🏆 View Leaderboard
        </Link>
      </div>
    </div>
  );
}


export default LevelPreview;
