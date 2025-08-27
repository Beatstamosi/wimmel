import style from "./Home.module.css";

function Home() {
  return (
    <div className={style.homeWrapper}>
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
            Beat the high score by finishing as fast as possible!
          </p>
        </div>
      </div>
      <p className={style.spotterCall}>
        Can you become the ultimate spotter? Ready, set, find!
      </p>
    </div>
  );
}

export default Home;
