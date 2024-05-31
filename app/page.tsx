import CountdownTimer from "./countdownTimer/CountdownTimer";
import Shortcut from "./shortcut/Shortcut";
import Alltask from "./task/Task";

export default function Home() {

  return (
    <div className="flex justify-center flex-col items-center">
      <CountdownTimer />
      <Alltask />
      {/* <Shortcut /> */}
    </div>
  );
}
