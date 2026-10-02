import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Brandbar from "./components/Brandbar";
import Home from "./pages/Home";
import About from "./pages/About";

/* React Router does not scroll on its own. Without this, going to
   /#diaries from the About page lands you at the top of the home page
   and nothing moves. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        // wait one frame so the new page has actually rendered
        requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth" }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div id="top">
      <ScrollManager />
      <Brandbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}