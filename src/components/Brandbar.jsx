import { Link, useLocation } from "react-router-dom";

export default function Brandbar() {
  const home = useLocation().pathname === "/";

  return (
    <header className="brandbar">
      <Link className="wordmark" to="/">Elan</Link>
      <Link className="navlink" to={home ? "#diaries" : "/#diaries"}>Diaries</Link>
      <Link className="navlink" to={home ? "#programs" : "/#programs"}>Programs</Link>
      <Link className="navlink" to="/about">About</Link>
      <Link className="skip" to={home ? "#waitlist" : "/#waitlist"}>Join the waitlist</Link>
    </header>
  );
}