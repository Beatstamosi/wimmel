import style from "./Home.module.css";
import levels from "../../utils/levels";
import LevelPreview from "../LevelPreview/LevelPreview";

function Home() {
  return (
    <div className={style.homeWrapper}>
      <div className={style.welcomeTextWrapper}>
        <h2>Welcome to Wimmel — The Ultimate Photo Tagging Challenge!</h2>
        <div>
          <div className={style.step}>
            <span className={style.stepNumber}>1</span>
            <p className={style.stepText}>Choose a level from the selection.</p>
          </div>

          <div className={style.step}>
            <span className={style.stepNumber}>2</span>
            <p className={style.stepText}>
              The timer starts as soon as the level loads.
            </p>
          </div>

          <div className={style.step}>
            <span className={style.stepNumber}>3</span>
            <p className={style.stepText}>
              Find all the hidden characters listed for that level.
            </p>
          </div>

          <div className={style.step}>
            <span className={style.stepNumber}>4</span>
            <p className={style.stepText}>
              Double Click to zoom in & out. Hold down left mouse to navigate
              around image.
            </p>
          </div>

          <div className={style.step}>
            <span className={style.stepNumber}>5</span>
            <p className={style.stepText}>
              Beat the high score by finishing as fast as possible!
            </p>
          </div>
        </div>
      </div>

      <div className={style.levelGrid}>
        {levels.map((level) => (
          <LevelPreview key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}

export default Home;
