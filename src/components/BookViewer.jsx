import { useEffect, useRef, useState } from "react";
import CoverArt from "./CoverArt";

/* A diary you can pick up and turn over. Drag left or right to spin it,
   or just watch — it turns slowly on its own until you touch it. */
export default function BookViewer({ book, onClose }) {
  const [ry, setRy] = useState(-26);   // left-right turn, in degrees
  const [rx, setRx] = useState(-8);    // slight tilt so it reads as 3D
  const [held, setHeld] = useState(false);
  const drag = useRef(null);
  const spinning = useRef(true);

  // Close on Escape, and stop the page behind from scrolling.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // The slow idle turn, until the first touch.
  useEffect(() => {
    let frame, last = performance.now();
    const tick = (now) => {
      const gap = now - last;
      last = now;
      if (spinning.current) setRy((r) => r + gap * 0.014);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const down = (e) => {
    spinning.current = false;
    setHeld(true);
    drag.current = { x: e.clientX, y: e.clientY, ry, rx };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const move = (e) => {
    if (!held || !drag.current) return;
    const d = drag.current;
    setRy(d.ry + (e.clientX - d.x) * 0.55);
    setRx(Math.max(-40, Math.min(40, d.rx - (e.clientY - d.y) * 0.3)));
  };

  const up = () => { setHeld(false); drag.current = null; };

  return (
    <div className="viewer" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="viewer-close" onClick={onClose} aria-label="Close">×</button>

      <div className="viewer-inner">
        <div className="spin-stage">
          <div
            className="book3d"
            style={{ "--tone": book.cover, "--ry": `${ry}deg`, "--rx": `${rx}deg` }}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            role="img"
            aria-label={`${book.title}, shown from all sides`}
          >
            <div className="f f-front">
              <CoverArt motif={book.motif} />
              <div className="cover-title">{book.title}</div>
            </div>
            <div className="f f-back"><p>{book.back}</p></div>
            <div className="f f-spine"><span>{book.title}</span></div>
            <div className="f f-edge" />
            <div className="f f-top" />
            <div className="f f-bot" />
          </div>
        </div>

        <h3>{book.title}</h3>
        <p className="blurb">{book.blurb}</p>
        <p className="dragtip">Drag to turn it around</p>
      </div>
    </div>
  );
}