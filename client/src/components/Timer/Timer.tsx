import style from "./Timer.module.css";
import { MdOutlineTimer } from "react-icons/md";

type TimerProps = {
  minutes: number;
  seconds: number;
};

function Timer({ minutes, seconds }: TimerProps) {
  return (
    <div className={style.timerWrapper}>
      <MdOutlineTimer color="white" size="1.5em" />
      <p className={style.timer}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default Timer;
