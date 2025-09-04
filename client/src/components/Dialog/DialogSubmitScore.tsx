import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../Timer/Timer.jsx";
import style from "./DialogSubmitScore.module.css";

type DialogSubmitScoreProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  isOpen: boolean;
  closeDialog: () => void;
  sessionRef: React.MutableRefObject<null>;
  minutesFinalScore: number;
  secondsFinalScore: number;
};

function DialogSubmitScore({
  dialogRef,
  isOpen,
  closeDialog,
  sessionRef,
  minutesFinalScore,
  secondsFinalScore,
}: DialogSubmitScoreProps) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmitScore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/leaderboard/submit-highscore`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            entryId: sessionRef.current,
            username: name,
          }),
        }
      );

      if (res.ok) {
        navigate("/");
      } else {
        throw new Error("Server Error submitting highscore");
      }
    } catch (err) {
      console.log("Error submitting highscore: ", err);
    }
  };

  return (
    <dialog open={isOpen} onClose={closeDialog} ref={dialogRef}>
      <form onSubmit={(e) => handleSubmitScore(e)}>
        <h2 className={style.dialogTitle}>Congratulations!</h2>
        <p>Submit your Score</p>
        <Timer minutes={minutesFinalScore} seconds={secondsFinalScore} />
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={style.wrapperButtons}>
          <button type="submit" className={style.dialogButton}>
            Submit
          </button>
          <button
            type="button"
            onClick={closeDialog}
            className={style.dialogButtonCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default DialogSubmitScore;
