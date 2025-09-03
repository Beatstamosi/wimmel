import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import style from "./ZoomableImage.module.css";
import { useRef } from "react";

interface ZoomableImageProps {
  src: string;
  checkCharacterHit: (nativeX: number, nativeY: number) => void;
}

function ZoomableImage({ src, checkCharacterHit }: ZoomableImageProps) {
  const imageRef = useRef(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null);

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

  return (
    <div className={style.imageWrapper}>
      <TransformWrapper
        wheel={{ disabled: true }} // disables scroll zoom
        pinch={{ disabled: false }} // keep pinch-zoom for touch devices
        doubleClick={{ step: 1, mode: "toggle" }}
        minScale={1}
        maxScale={4}
      >
        <TransformComponent>
          <img src={src} alt="" className={style.imagePlay} ref={imageRef} />
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
  );
}

export default ZoomableImage;
