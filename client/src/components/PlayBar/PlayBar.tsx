import style from "./PlayBar.module.css";
import { MdOutlineTimer } from "react-icons/md";

interface PlayBarProps {
  levelName: string;
  artist: string;
  source_url: string;
}

function PlayBar({ levelName, artist, source_url }: PlayBarProps) {
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

      <div className={style.timerWrapper}>
        <MdOutlineTimer color="white" size="1.5em" />
        <p>00:10</p>
      </div>
    </div>
  );
}

export default PlayBar;
