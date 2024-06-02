'use client'
import { useEffect, useRef, useState, useCallback } from "react";
import useKeyPress from "../(hook)/useKeyPress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaRegStopCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";

export default function CountdownTimer() {
    const hours: number = 0;
    let startorstop: Boolean = true; // used to differentiate between start and stop for shortcut "s" 
    const [minutes, setMinutes] = useState<number>(25);
    const [time, setTime] = useState<number>(0);
    const [pause, setPause] = useState<boolean>(false); //temp disabling the pause button
    const [stop, setStop] = useState<boolean>(false); //for playing audio(stop button pressed/not)
    // const [dialogBoxOpen, setDialogBoxOpen] = useState<boolean>(false); //all related can be removed from the codebase
    const [initialDataFetched, setInitialDataFetched] = useState<boolean>(false);
    const [displayTimer, setDisplayTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const startTimeRef = useRef<any>();

    const totalTimeCalculator = (hours: number, minutes: number) => {
        return ((hours * 60 * 60 * 1000) + (minutes * 60 * 1000))
    }

    const handleKeyPress = (event: any) => {
        // console.log(`Key pressed CountdownTimer: ${event.key}`);
        if (startorstop) {
            if (event.ctrlKey && event.key == " ") {
                setHoursAndMinutes(event);
                startorstop = false;
            }
        }
        else {
            stopTimer();
            startorstop = true;
        }
        // in order to use key combinations {event.metaKey && event.key == "Enter"}
    }

    useKeyPress(handleKeyPress, ' ', minutes, 'ctrlKey');

    useEffect(() => {

        if (time > 0) {
            document.title = formattedTime(time);;
        }

        if (time == 0) {
            document.title = "0h : 0m : 0s"
            if (!stop && initialDataFetched) {
                // initialDataFetched added otherwise notification will be triggered for every refresh
                //play a sound when timer naturally becomes 0
                // playAudio();
                setStop(false);
                notifyMe();
            }
        }

        let timer: any;
        if (!pause && time > 0) {
            timer = setInterval(() => {
                // due to the browser throttling issue we are going to use Date()
                // even if the browser throttles we need to continue from elapsed time
                let now = new Date().getTime(); //current time
                const elapsedTime = now - (startTimeRef.current || now); //calculating the elapsed time
                setTime((prevTime) => Math.max(prevTime - elapsedTime, 0));
                startTimeRef.current = now;
                // setTime((prevTime) => prevTime - 1000);
            }, 1000)
        }
        else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [time, pause])

    useEffect(() => {
        const minutesFromLocalStorage = localStorage.getItem("minutes");
        if (!initialDataFetched && minutesFromLocalStorage) {
            setMinutes(parseInt(minutesFromLocalStorage))
        }
        setInitialDataFetched(true);
    }, []);

    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyPress);

    //     return () => { //this represents componentwillunmount
    //         document.removeEventListener('keydown', handleKeyPress);
    //     };

    // this useEffect hook is called only once that is during the initial 
    // render(which means no matter what useEffect will be called during the inital render).
    // the keydown even is mapped with handleKeyPress function and is stored in the browsers internal list of events
    // whenever a respective event occurs the corresponding fuctions mapped to that event will be called.
    // since handleKeyPress is memoized this useEffect won't be called again.
    // just before the component is about to be unmounted the cleanup function is called which is executes removeEventListener
    // }, [handleKeyPress]);

    const formattedTime = (time: any) => {
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        setDisplayTimer({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })

        return `${hours}h : ${minutes}m : ${seconds}s`;
    }

    const setHoursAndMinutes = (e: any) => {
        e.preventDefault();

        // setDialogBoxOpen(!dialogBoxOpen)
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

    const stopTimer = () => {
        setTime(0);
        setPause(false);
        setStop(true);
        setDisplayTimer({
            hours: 0,
            minutes: 0,
            seconds: 0
        })
        startTimeRef.current = 0;
    }

    const playAudio = () => {
        const audio = new Audio("https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3");
        audio.play();
    }

    Notification.requestPermission(); //this initially check for permission otherwise the request will be asked when timer ends.

    function notifyMe() {
        if (Notification.permission === "granted") {
            const notification = new Notification("Time Up!");
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    const notification = new Notification("Time Up!");
                }
            });
        }
    }

    return (
        <div className="flex justify-center flex-col items-center">
            {/* <h1 className="mt-10 border bg-black text-white p-5 rounded-xl text-5xl">{displayTimer.hours}h : {displayTimer.minutes}m : {displayTimer.seconds}s</h1> */}

            <div className="flex justify-center items-center">
                <div className="text-center">
                    <h1 className="mt-10 border bg-black text-white p-5 rounded-xl text-5xl text-center w-[120px]">{displayTimer.hours < 0 ? `0${displayTimer.hours}` : displayTimer.hours}</h1>
                    <p className="font-light">hours</p>
                </div>
                <p className="text-5xl px-1">:</p>
                <div className="text-center">
                    <h1 className="mt-10 border bg-black text-white p-5 rounded-xl text-5xl text-center w-[130px]">{displayTimer.minutes < 0 ? `0${displayTimer.minutes}` : displayTimer.minutes}</h1>
                    <p className="font-light">minutes</p>
                </div>
                <p className="text-5xl px-1">:</p>
                <div className="text-center">
                    <h1 className="mt-10 border bg-black text-white p-5 rounded-xl text-5xl text-center w-[120px]">{displayTimer.seconds < 0 ? `0${displayTimer.seconds}` : displayTimer.seconds}</h1>
                    <p className="font-light">seconds</p>
                </div>
            </div>

            <div className="mt-10 mb-5">
                {
                    time > 0 ?
                        <div className="flex justify-center items-center">
                            <FaRegStopCircle className="text-4xl mr-3 hover:cursor-pointer" onClick={stopTimer} />
                            {/* temp disabling the pause button */}
                            {/* <div onClick={() => setPause(!pause)}>
                                {pause ? <MdOutlineNotStarted className="text-4xl hover:cursor-pointer" /> : <FaRegPauseCircle className="text-4xl hover:cursor-pointer" />}
                            </div> */}
                        </div>
                        :
                        <div>
                            <p className="text-sm text-muted-foreground"> Enter time in minutes.</p>
                            <div className="flex items-center">
                                {/* value={minutes ? minutes : ""} */}
                                {/* {
                                    !initialDataFetched ?
                                    <Input className="col-span-2 h-10 mr-2" type="text" value="loading" readOnly/> :
                                    <Input className="col-span-2 h-10 mr-2" type="number" value={minutes} onChange={(e) => minutesInputOnChange(e)} />    
                                } */}
                                {/* <Input className="col-span-2 h-10 mr-2" type={initialDataFetched ? "number" : "text"} value={initialDataFetched == false ? "fetching minutes..." : minutes} onChange={(e) => minutesInputOnChange(e)} /> */}
                                {
                                    !initialDataFetched ?
                                        <p className="w-[185px] h-10 border p-2 rounded-md mr-2 my-1">fetching minutes...</p>
                                        :
                                        <Input className="w-[185px] h-10 mr-2 my-1" autoFocus type="number" value={minutes ? minutes : ""} onChange={(e) => minutesInputOnChange(e)} />
                                }
                                <Button variant="outline" className="bg-green-600 text-white" onClick={setHoursAndMinutes}>Start Timer</Button>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}
