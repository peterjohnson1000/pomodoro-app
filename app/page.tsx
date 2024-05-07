'use client'
import { useEffect, useState } from "react";

export default function Home() {

  const minutesFromLocalStorage = localStorage.getItem("minutes");

  const hours = 0;
  const [minutes, setMinutes] = useState(minutesFromLocalStorage ? parseInt(minutesFromLocalStorage) : 25);
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(false);

  const totalTimeCalculator = (hours: number, minutes: number) => {
    return ((hours * 60 * 60 * 1000) + (minutes * 60 * 1000))
  }

  useEffect(() => {
    if (time > 0) {
      const titleData = formattedTime(time);
      document.title = titleData;
    }

    let timer: any;
    if (!pause && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1000);
      }, 1000)
    }
    else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time, pause])

  const formattedTime = (time: any) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours}h : ${minutes}m : ${seconds}s`;
  }

  const setHoursAndMinutes = (e: any) => {
    e.preventDefault();

    const newTime = totalTimeCalculator(hours, minutes);
    setTime(newTime)
  }

  const minutesInputOnChange = (e: any) => {
    if (e.target.value) {
      setMinutes(parseInt(e.target.value));
      localStorage.setItem("minutes", e.target.value);
    } else {
      setMinutes(0);
    }
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-5xl mt-10">{formattedTime(time)}</h1>

      <div className="my-5">
        <input placeholder="minutes" className="border-2 p-2" type="number" value={minutes ? minutes : ""}
          onChange={(e) => minutesInputOnChange(e)} />
      </div>

      <div>
        {
          time > 0 ?
            <div>
              <button className="mr-5 bg-red-600 text-white px-3 py-1 rounded-2xl" onClick={() => setTime(0)}>Stop Timer</button>
              <button onClick={() => setPause(!pause)} className={`text-white px-3 py-1 rounded-2xl ${pause ? "bg-green-600" : "bg-orange-600"}`}>
                {pause ? "Resume" : "Pause"}
              </button>
            </div>
            :
            <div>
              <button className="bg-green-600 text-white px-3 py-1 rounded-2xl" onClick={setHoursAndMinutes}>Start Time</button>
            </div>
        }
      </div>

    </div>
  );
}