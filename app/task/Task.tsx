import { useState } from "react";

//filer
//clearInterval
//custom hook in nextts

const Alltask = () => {

    const [tasks, setTasks] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState<Boolean[]>([]);

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
    }

    const strikeCompletedTaks = (indexToStrike: number, isChecked: Boolean) => {
        const test: Boolean[] = []

        for (let index = 0; index < isCompleted.length; index++) {
            if (index == indexToStrike) {
                test.push(!isCompleted[index]);
            }
            else {
                test.push(isCompleted[index]);
            }
        }

        setIsCompleted(test)
    }

    return (
        <div className="mt-5">
            <form className="flex" onSubmit={addTask}>
                <input className="w-[250px] border-2 p-2 mr-2" placeholder="eat the frog first!" id="taskUserInput" autoComplete="off" />
                <button type="submit" className="bg-red-600 text-white p-2 px-4 rounded-sm hover:bg-red-700">+</button>
            </form>

            <div className="mt-5">
                {
                    tasks.map(
                        (task, index) =>
                            <div key={task} className="flex mb-2">
                                <input id="isCheckboxChecked" type="checkbox" onClick={() => strikeCompletedTaks(index, Boolean(!task[index]))} />
                                <h1 className={`w-[250px] border-2 p-2 mr-2 ${isCompleted[index] ? "line-through" : "no-underline"}`}>{task}</h1>
                                <button onClick={() => removeTask(index)} className="bg-red-600 text-white p-2 px-4 rounded-sm hover:bg-red-700">-</button>
                            </div>
                    )
                }
            </div>
        </div>
    )
};

export default Alltask;