import Analytics from "./(analytics)/Analytics";
import CountdownTimer from "./(countdownTimer)/CountdownTimer";
import Header from "./(header)/Header";
import Alltask from "./(task)/Task";

export default function Home() {

  return (
    <div className="flex justify-center flex-col items-center">
      <Header />
      <CountdownTimer />
      <Alltask />
    </div>
  );
}
