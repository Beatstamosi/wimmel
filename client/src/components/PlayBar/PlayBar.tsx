import style from "./PlayBar.module.css";
import Timer from "../Timer/Timer.jsx";

interface PlayBarProps {
  levelName: string;
  artist: string;
  source_url: string;
  minutes: number;
  seconds: number;
}

function PlayBar({
  levelName,
  artist,
  source_url,
  minutes,
  seconds,
}: PlayBarProps) {
  return (
    <div className={style.playBarWrapper}>
      <h2>
        {levelName} by{" "}
        <a
          href={source_url}
          target="_blank"
          rel="noopener noreferrer"
          className={style.artist}
        >
          {artist}
        </a>
      </h2>

      <Timer minutes={minutes} seconds={seconds} />
    </div>
  );
}

export default PlayBar;
