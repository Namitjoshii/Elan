import { Link } from "react-router-dom";
import { beliefs, founder } from "../data";
import { Foot } from "../components/Interior";
import Wordmark from "../components/Wordmark";

export default function About() {
  return (
    <main className="interior">
      <section className="about-hero">
        <div className="wrap">
          <h1 className="display">We are building a door, and a reason to walk through it</h1>
          <p className="lede">
            <Wordmark /> is a small studio in India making plain objects that help people think clearly.
          </p>
        </div>
      </section>

      <section className="story wrap">
        <div className="prose">
          <p>
            <Wordmark /> started with a complaint. Everything meant to make you calmer had
            become either an app that wanted your attention or a retreat that
            wanted your belief. Nothing in between: no plain object you could
            keep on a table and use before work.
          </p>
          <p>
            So we began with diaries. Each one is built around a single habit and
            nothing else, with the structure already printed on the page so that
            starting takes no willpower. They are made in India, bound to lie
            flat, and designed to be finished rather than admired.
          </p>
          <p>
            The programs come next: short stays in small groups, held somewhere
            quiet, with no teaching and no joining. You arrive, the days are
            already arranged, and at the end you go home.
          </p>
        </div>

        <aside className="founder">
          <img src={founder.photo} alt={founder.name} />
          <h3>{founder.name}</h3>
          <p className="role">{founder.role}</p>
          <blockquote>{founder.quote}</blockquote>
        </aside>
      </section>

      <section className="wrap">
        <div className="beliefs">
          {beliefs.map((b) => (
            <div className="belief" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pagefoot-cta wrap">
        <h2 className="display">The door opens in 2027</h2>
        <Link className="btn" to="/#waitlist">See what is coming</Link>
      </section>

      <Foot />
    </main>
  );
}