import { Link, useLocation } from "react-router-dom";
import Wordmark from "./Wordmark";

export default function Brandbar() {
  const home = useLocation().pathname === "/";

  return (
    <header className="brandbar">
      <Link className="wordmark" to="/"><Wordmark /></Link>
      <Link className="navlink" to={home ? "#diaries" : "/#diaries"}>Diaries</Link>
      <Link className="navlink" to={home ? "#programs" : "/#programs"}>Programs</Link>
      <Link className="navlink navlink-about" to="/about">About</Link>
      <Link className="skip" to={home ? "#waitlist" : "/#waitlist"}>Opening soon</Link>
    </header>
  );
}