import Threshold from "../components/Threshold";
import { Promise_, Diaries, Programs, Waitlist, Foot } from "../components/Interior";

export default function Home() {
  return (
    <>
      <Threshold />
      <main className="interior">
        <Promise_ />
        <Diaries />
        <Programs />
        <Waitlist />
        <Foot />
      </main>
    </>
  );
}