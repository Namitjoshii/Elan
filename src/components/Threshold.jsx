import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/* Keeps a number inside 0 and 1. */
const clamp = (n) => Math.min(1, Math.max(0, n));

/* Turns the overall scroll progress into a 0 -> 1 value for one
   slice of the journey. seg(0.6, 0.5, 1) is 0.2, for example. */
const seg = (p, from, to) => clamp((p - from) / (to - from));

/* Slows the start and the end of the door swing so it feels heavy. */
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function Threshold() {
  const track = useRef(null);
  const stage = useRef(null);

  // How far we have scrolled through the tall .threshold block: 0 -> 1
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // Every time that number changes, write the CSS variables the stylesheet
  // listens to. No re-render happens, so the scroll stays smooth.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty("--approach", seg(p, 0, 0.4));       // door comes closer
    el.style.setProperty("--titleOut", seg(p, 0.2, 0.36));    // name fades away
    el.style.setProperty("--carveIn", seg(p, 0.28, 0.44));    // carved words appear
    el.style.setProperty("--open", ease(seg(p, 0.48, 0.84))); // door swings open
    el.style.setProperty("--inside", seg(p, 0.76, 0.94));     // logo fades in
  });

  const carved = (
    <div className="carve-wrap" aria-hidden="true">
      <p className="carve">
        What can you expect from us
        <small>Keep going</small>
      </p>
    </div>
  );

  return (
    <section className="threshold" ref={track}>
      <div className="stage" ref={stage}>
        {/* the morning on the other side */}
        <div className="beyond">
          <div className="sun" />
          <div className="horizon" />
          <div className="ground" />

          <div className="inside">
            <div className="logoslot">
              <img src="/logo.png" alt="Elan — Elevate your mindset" />
            </div>
          </div>
        </div>

        {/* the door itself */}
        <div className="doorway">
          <div className="leaves">
            <div className="panel panel-l">
              <div className="plank plank-top" />
              <div className="plank plank-bot" />
              {carved}
              <div className="pull" />
            </div>
            <div className="panel panel-r">
              <div className="plank plank-top" />
              <div className="plank plank-bot" />
              {carved}
              <div className="pull" />
            </div>
            <div className="seam" />
          </div>
          <div className="frame" />
          <div className="sill" />
        </div>

        <div className="titleblock">
          <h1 className="display">Elan</h1>
          <p>Elevate your mindset</p>
        </div>

        <div className="scrollhint">Scroll</div>
      </div>
    </section>
  );
}