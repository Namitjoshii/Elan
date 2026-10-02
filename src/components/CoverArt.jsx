/* Each diary's cover is drawn, not photographed — one simple theme per
   habit. Swap these for real artwork later; the shape stays the same. */

const paper = "rgba(214, 203, 240, 0.6)";
const soft = "rgba(214, 203, 240, 0.26)";

const box = {
  className: "art",
  viewBox: "0 0 300 410",
  fill: "none",
  stroke: paper,
  strokeWidth: 1.2,
  "aria-hidden": true,
};

export default function CoverArt({ motif }) {
  // A sun coming up over a line — morning pages.
  if (motif === "firstlight") {
    return (
      <svg {...box}>
        {[196, 176, 156, 136].map((y, i) => (
          <line key={y} x1={150 - (56 - i * 13)} y1={y} x2={150 + (56 - i * 13)} y2={y} stroke={soft} />
        ))}
        <path d="M 92 258 A 58 58 0 0 1 208 258" />
        <line x1="44" y1="258" x2="256" y2="258" />
      </svg>
    );
  }

  // A crescent and a few late stars — the evening page.
  if (motif === "quiet") {
    return (
      <svg {...box}>
        <path d="M 168 112 A 74 74 0 1 0 168 268 A 58 74 0 1 1 168 112 Z" />
        {[[82, 132], [226, 160], [96, 232], [214, 248], [150, 96]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 2.4 : 1.6} fill={soft} stroke="none" />
        ))}
      </svg>
    );
  }

  // Ninety squares. The filled ones are the days you did not break.
  if (motif === "steady") {
    const cells = [];
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        const done = (r * 9 + c) % 7 !== 3 && r < 7;
        cells.push(
          <rect key={`${r}-${c}`} x={62 + c * 20} y={108 + r * 20} width="13" height="13"
            fill={done ? soft : "none"} />
        );
      }
    }
    return <svg {...box}>{cells}</svg>;
  }

  // One mark a day, gathering up the page.
  const rows = [];
  for (let r = 0; r < 8; r++) {
    const n = 3 + (r % 3);
    for (let i = 0; i < n; i++) {
      rows.push(
        <line key={`${r}-${i}`}
          x1={150 - (n * 11) / 2 + i * 11} y1={118 + r * 26}
          x2={150 - (n * 11) / 2 + i * 11} y2={138 + r * 26}
          stroke={r < 5 ? paper : soft} />
      );
    }
  }
  return <svg {...box}>{rows}</svg>;
}