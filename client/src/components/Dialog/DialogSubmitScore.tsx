import { useState } from "react";
import { useNavigate } from "react-router-dom";
import levels from "../../utils/levels";
import style from "./DialogSubmitScore.module.css";

type DialogSubmitScoreProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  isOpen: boolean;
  closeDialog: () => void;
  levelName: string;
};

function DialogSubmitScore({
  dialogRef,
  isOpen,
  closeDialog,
  levelName,
}: DialogSubmitScoreProps) {
  const [name, setName] = useState("");
  const level = levels.find((lvl) => lvl.name === levelName);
  const navigate = useNavigate();

  const handleSubmitScore = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/highscore/submit`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            levelName,
            levelId: level?.id,
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
      <form onSubmit={handleSubmitScore}>
        <h2 className={style.dialogTitle}>Congratulations!</h2>
        <p>Submit your Score</p>
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
