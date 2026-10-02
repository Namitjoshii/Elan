import { useState } from "react";
import { Link } from "react-router-dom";
import { diaries, plans, email as contactEmail } from "../data";
import CoverArt from "./CoverArt";
import BookViewer from "./BookViewer";
import Wordmark from "./Wordmark";

export function Promise_() {
  return (
    <section className="promise wrap">
      <p>
        <Wordmark /> makes the small daily things that change how a year feels.
        <span> Diaries first, then places to go and be quiet in.</span>
      </p>
    </section>
  );
}

export function Diaries() {
  const [open, setOpen] = useState(null);

  return (
    <section className="band wrap" id="diaries">
      <div className="band-head">
        <h2 className="display">Diaries you will actually finish</h2>
        <p className="lede">
          Not blank notebooks. Each one is built around a single habit, with
          enough structure that page two is easier than page one.
        </p>
      </div>

      <div className="shelf">
        {diaries.map((d) => (
          <article className="book" key={d.title}>
            <button className="book-open" onClick={() => setOpen(d)}>
              <div className="cover" style={{ "--tone": d.cover }}>
                <CoverArt motif={d.motif} />
                <span className="spin-badge" aria-hidden="true">360°</span>
                <div className="cover-title">{d.title}</div>
              </div>
            </button>
            <h3>{d.title}</h3>
            <p>{d.blurb}</p>
            <span className="openhint">Tap to turn it over</span>
          </article>
        ))}
      </div>

      {open && <BookViewer book={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

export function Programs() {
  return (
    <section className="band wrap" id="programs">
      <div className="band-head">
        <h2 className="display">And then, time away from all of it</h2>
        <p className="lede">
          Short stays in small groups. No chanting, no guru, nothing to sign up
          to afterwards. Just days set aside and held for you.
        </p>
      </div>

      <div className="plans">
        {plans.map((p) => (
          <article className="plan" key={p.name}>
            <div className="length">{p.count}<em>{p.unit}</em></div>
            <h3>{p.name}</h3>
            <p>{p.blurb}</p>
            <ol>
              {p.schedule.map((step) => (
                <li key={step.when}>
                  <b>{step.when}</b>
                  <span>{step.what}</span>
                </li>
              ))}
            </ol>
            <footer>
              <span className="where">{p.where} · {p.size}</span>
              <em>{p.when}</em>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Waitlist() {
  return (
    <section className="band wrap waitlist" id="waitlist">
      <div className="band-head">
        <h2 className="display">The door opens in 2027</h2>
        <p className="lede">
          The first run of diaries is being made now, and the first dates are
          being set. Nothing to sign up for just yet.
        </p>
      </div>

      <p className="comingsoon">Registrations opening soon</p>

      <p className="note">
        Until then, write to us at{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </p>
    </section>
  );
}

export function Foot() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <span className="foot-mark"><Wordmark /></span>
          <p>Diaries built around one habit at a time, and quiet places to go later on.</p>
        </div>

        {/* On a phone the top nav collapses, so this is the only way
            to reach the other pages. It is not decoration. */}
        <nav className="foot-nav" aria-label="Footer">
          <Link to="/#diaries">Diaries</Link>
          <Link to="/#programs">Programs</Link>
          <Link to="/about">About</Link>
          <Link to="/#waitlist">Opening soon</Link>
        </nav>

        <div className="foot-reach">
          <span>Write to us</span>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </div>

      <div className="wrap foot-base">
        <span>&copy; {new Date().getFullYear()} <Wordmark /></span>
        <span>Opening 2027</span>
      </div>
    </footer>
  );
}