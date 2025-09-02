import { useParams } from "react-router-dom";
import levels from "../../utils/levels";
import PlayBar from "./PlayBar.jsx";
import style from "./Play.module.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";
import type { CharacterTag } from "../../types/LevelType.js";

function Play() {
  const [showPopUpNoMatch, setShowPopUpNoMatch] = useState(false);
  const [won, setWon] = useState(false);
  const { levelName } = useParams();
  const level = levels.find((lvl) => lvl.name === levelName);
  const updatedCharacters = level?.characters.map((char) => ({
    ...char,
    tagged: false,
  }));
  const [characters, setCharacters] = useState(updatedCharacters);

  const imageRef = useRef(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null);

  const checkForWinner = (copyCharacters: CharacterTag[]) => {
    if (copyCharacters?.every((char) => char.tagged)) {
      console.log("You win!");
      setWon(true);
    }
  };

  const checkCharacterHit = (nativeX: number, nativeY: number) => {
    let hit = false;
    const copyChar = characters?.map((char) => ({ ...char }));

    copyChar?.forEach((char) => {
      if (
        nativeX >= char.coordinates.x1 &&
        nativeX <= char.coordinates.x2 &&
        nativeY >= char.coordinates.y1 &&
        nativeY <= char.coordinates.y2
      ) {
        char.tagged = true;
        hit = true;
        setCharacters(copyChar);
        checkForWinner(copyChar);
      }
    });

    if (!hit) {
      popUpNoMatch();
    }
  };

  const popUpNoMatch = () => {
    setShowPopUpNoMatch(true);

    setTimeout(() => {
      setShowPopUpNoMatch(false);
    }, 1200);
  };

  const clickImageHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    img: HTMLImageElement | null
  ) => {
    if (clickTimerRef.current) return;

    clickTimerRef.current = setTimeout(() => {
      if (!img) return;

      const rect = img.getBoundingClientRect();

      // Coordinates where user clicked, relative to the image in the DOM
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Scale factors
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;

      // Coordinates relative to the native resolution
      const nativeX = Math.round(clickX * scaleX);
      const nativeY = Math.round(clickY * scaleY);

      checkCharacterHit(nativeX, nativeY);

      clickTimerRef.current = null;
    }, 250);
  };

  const doubleClickHandler = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
  };

  if (!level) return null;

  return (
    <main>
      {won ? <div>You won!</div> : null}
      {/* Static level/artist/timer bar */}
      <PlayBar
        levelName={level.name}
        artist={level.artist}
        source_url={level.source_url}
      />

      {/* Sticky character bar */}
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
        {showPopUpNoMatch ? (
          <div className={style.popUpNoMatch}>No match - Try again!</div>
        ) : null}
      </div>

      {/* Content that scrolls */}
      <div className={style.imageWrapper}>
        <TransformWrapper
          wheel={{ disabled: true }} // disables scroll zoom
          pinch={{ disabled: false }} // keep pinch-zoom for touch devices
          doubleClick={{ step: 1, mode: "toggle" }}
          minScale={1}
          maxScale={4}
        >
          <TransformComponent>
            <img
              src={level.image}
              alt=""
              className={style.imagePlay}
              ref={imageRef}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              onMouseDown={(e) => {
                mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
              }}
              onMouseUp={(e) => {
                // Ignore non-left-clicks
                if (e.button !== 0) return;

                // check mouse position if user is dragging or clicking
                const start = mouseDownPosRef.current;
                if (!start) return;

                const dx = e.clientX - start.x;
                const dy = e.clientY - start.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const movementThreshold = 5; // pixels

                if (distance < movementThreshold) {
                  // Treat it as a click (not a drag)
                  clickImageHandler(e, imageRef.current);
                }
                mouseDownPosRef.current = null;
              }}
              onDoubleClick={doubleClickHandler}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </main>
  );
}

export default Play;
