'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaRegStopCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";

export default function CountdownTimer() {

    // const minutesFromLocalStorage = localStorage.getItem("minutes");
    // const [minutes, setMinutes] = useState(minutesFromLocalStorage ? parseInt(minutesFromLocalStorage) : 25);

    const hours: number = 0;
    const [minutes, setMinutes] = useState<number>(25);
    const [time, setTime] = useState<number>(0);
    const [pause, setPause] = useState<boolean>(false);
    const [dialogBoxOpen, setDialogBoxOpen] = useState<boolean>(false);
    const [initialDataFetched, setInitialDataFetched] = useState<boolean>(false);

    const totalTimeCalculator = (hours: number, minutes: number) => {
        return ((hours * 60 * 60 * 1000) + (minutes * 60 * 1000))
    }

    useEffect(() => {
        if (time > 0) {
            document.title = formattedTime(time);;
        }

        if (time == 0) {
            document.title = "0h : 0m : 0s"
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

    useEffect(() => {
        const minutesFromLocalStorage = localStorage.getItem("minutes");
        if (!initialDataFetched && minutesFromLocalStorage) {
            setMinutes(parseInt(minutesFromLocalStorage))
            setInitialDataFetched(true);
        }
    }, [])

    const formattedTime = (time: any) => {
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return `${hours}h : ${minutes}m : ${seconds}s`;
    }

    const setHoursAndMinutes = (e: any) => {
        e.preventDefault();

        setDialogBoxOpen(!dialogBoxOpen)
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
            <h1 className={`mt-10 ${time > 0 ? "text-7xl" : "text-5xl"}`}>{formattedTime(time)}</h1>
            {/* <Progress value={progress} className="w-[60%]" /> */}

            <div className="my-5">
                {
                    time > 0 ?
                        <div className="flex justify-center items-center">
                            <FaRegStopCircle className="text-4xl mr-3 hover:cursor-pointer" onClick={() => { setTime(0); setPause(false); }} />
                            <div onClick={() => setPause(!pause)}>
                                {pause ? <MdOutlineNotStarted className="text-4xl hover:cursor-pointer" /> : <FaRegPauseCircle className="text-4xl hover:cursor-pointer" />}
                            </div>
                        </div>
                        :
                        <Popover open={dialogBoxOpen}>
                            <PopoverTrigger asChild>
                                <Button onClick={() => setDialogBoxOpen(!dialogBoxOpen)} variant="outline">Set Time</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex justify-end"><IoCloseCircleSharp className="hover:cu" onClick={() => setDialogBoxOpen(!dialogBoxOpen)} /></div>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Set Time</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Enter time in minutes.
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="width">Minutes</Label>
                                            <Input className="col-span-2 h-8" type="number" value={minutes ? minutes : ""} onChange={(e) => minutesInputOnChange(e)} />
                                        </div>
                                    </div>
                                    <Button variant="outline" className="bg-green-600 text-white" onClick={setHoursAndMinutes}>Start Timer</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                }
            </div>
        </div>
    );
}
