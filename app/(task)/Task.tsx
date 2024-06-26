'use client'
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import useKeyPress from "../(hook)/useKeyPress";

//filter
//clearInterval
//custom hook in nextts

const Alltask = () => {

    const [tasks, setTasks] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState<Boolean[]>([]);
    const [initialDataFetched, setInitialDataFetched] = useState<boolean>(false); //fix for localStorage ref error
    const [loaderState, setLoaderState] = useState<boolean>(false);
    const taskInputFocus = useRef<any>();

    useEffect(() => {
        if (initialDataFetched) {
            localStorage.setItem("allTasks", JSON.stringify(tasks));
            localStorage.setItem("completedTasks", JSON.stringify(isCompleted));
        }
    }, [tasks, isCompleted])

    useEffect(() => {
        const allTasksFromLocalStoage = localStorage.getItem("allTasks");
        const allCompletedTasksFromLocalStoage = localStorage.getItem("completedTasks");

        if (!initialDataFetched && allTasksFromLocalStoage && allCompletedTasksFromLocalStoage) {
            setTasks(JSON.parse(allTasksFromLocalStoage));
            setIsCompleted(JSON.parse(allCompletedTasksFromLocalStoage));
        }

        setInitialDataFetched(true);
        setLoaderState(true);
    }, [])

    const handleKeyPress = (event: any) => {
        // console.log(`Key pressed task: ${event.key}`);
        event.preventDefault();
        if (event.ctrlKey && event.key == "n") {
            taskInputFocus.current.focus();
        }
    }

    useKeyPress(handleKeyPress, 'n', 0, 'ctrlKey');

    const addTask = (e: any) => {
        e.preventDefault();

        if (e.target.taskUserInput.value) {
            setTasks([...tasks, e.target.taskUserInput.value]);
            setIsCompleted([...isCompleted, false]);

            e.target.taskUserInput.value = "";
        }
    }

    const removeTask = (indexToRemove: number) => {
        setTasks(tasks.filter((_, index) => index !== indexToRemove));
        setIsCompleted(isCompleted.filter((_, index) => index !== indexToRemove));
    }

    const strikeCompletedTaks = (indexToStrike: number) => {
        setIsCompleted(prevState =>
            prevState.map((value, index) =>
                index === indexToStrike ? !value : value
            )
        )
    }

    return (
        <div className="flex flex-col justify-center items-center mt-5">
            <form className="flex" onSubmit={addTask}>
                <Input className="w-[250px] border-2 p-2 mr-2" ref={taskInputFocus} placeholder="eat the frog first!" id="taskUserInput" autoComplete="off" />
                <button type="submit" className="bg-red-600 text-white p-2 px-4 rounded-sm hover:bg-red-700">+</button>
            </form>

            {
                loaderState ?
                    <div className="mt-5">
                        {
                            tasks.map(
                                (task, index) =>
                                    <div key={task + index} className="flex mb-2">
                                        <input className="mr-2" id="isCheckboxChecked" type="checkbox" defaultChecked={Boolean(isCompleted[index])} onClick={() => strikeCompletedTaks(index)} />
                                        <h1 className={`w-[235px] border-2 p-2 mr-2 ${isCompleted[index] ? "line-through" : "no-underline"} rounded-md`}>{task}</h1>
                                        <button onClick={() => removeTask(index)} className="bg-red-600 text-white p-2 px-4 rounded-sm hover:bg-red-700">-</button>
                                    </div>
                            )
                        }
                    </div>
                    :
                    <div role="status" className="pt-10">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only text-black">Loading...</span>
                    </div>
            }
        </div>
    )
};

export default Alltask;