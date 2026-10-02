import { useState } from "react";
import { diaries, plans, email as contactEmail } from "../data";
import CoverArt from "./CoverArt";
import BookViewer from "./BookViewer";

export function Promise_() {
  return (
    <section className="promise wrap">
      <p>
        Elan makes the small daily things that change how a year feels.
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
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | error | done

  const submit = async () => {
    if (!/.+@.+\..+/.test(email)) { setState("error"); return; }

    // Swap this for your real backend call when you have one:
    // await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) })
    console.log("waitlist signup:", email);

    setState("done");
  };

  return (
    <section className="band wrap waitlist" id="waitlist">
      <div className="band-head">
        <h2 className="display">The door opens in 2027</h2>
        <p className="lede">
          Leave your email and you will be the first one through it: the first
          run of diaries at founding price, and first pick of dates.
        </p>
      </div>

      {state === "done" ? (
        <p className="note">You are on the list. We will write to you before anyone else.</p>
      ) : (
        <>
          <div className="signup">
            <input
              type="email"
              value={email}
              placeholder="you@email.com"
              aria-label="Your email address"
              onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button onClick={submit}>Join the waitlist</button>
          </div>
          <p className={state === "error" ? "note warn" : "note"}>
            {state === "error"
              ? "That address is missing an @ or a dot. Check it and try again."
              : "One email when we open. Nothing else, ever."}
          </p>
        </>
      )}
    </section>
  );
}

export function Foot() {
  return (
    <footer className="site-foot wrap">
      <span>Elan</span>
      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
    </footer>
  );
}