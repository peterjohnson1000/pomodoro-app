'use client'
import { useEffect, useState } from "react";
import Alltask from "../task/Task";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function CountdownTimer() {

    const minutesFromLocalStorage = localStorage.getItem("minutes");

    const hours = 0;
    const [minutes, setMinutes] = useState(minutesFromLocalStorage ? parseInt(minutesFromLocalStorage) : 25);
    const [time, setTime] = useState(0);
    const [pause, setPause] = useState(false);
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

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

    const formattedTime = (time: any) => {
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return `${hours}h : ${minutes}m : ${seconds}s`;
    }

    const setHoursAndMinutes = (e: any) => {
        e.preventDefault();

        setDialogBoxOpen(true);
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

            {/* set time */}
            <div className="my-5">
                <input placeholder="minutes" className="border-2 p-2" type="number" value={minutes ? minutes : ""}
                    onChange={(e) => minutesInputOnChange(e)} />

                {/* <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Set Time</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
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
                </Popover> */}
            </div>
            {/* set time */}

            <div>
                {
                    time > 0 ?
                        <div>
                            <Button className="mr-5 bg-red-600 text-white hover:bg-red-700" onClick={() => { setTime(0); setPause(false); }}>Stop Timer</Button>
                            <Button onClick={() => setPause(!pause)} className={`text-white ${pause ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"}`}>
                                {pause ? "Resume" : "Pause"}
                            </Button>
                        </div>
                        :
                        <div>
                            <Button className="bg-green-600 text-white hover:bg-green-700" onClick={setHoursAndMinutes}>Start Time</Button>
                        </div>
                }
            </div>

            <Alltask />

        </div>
    );
}
