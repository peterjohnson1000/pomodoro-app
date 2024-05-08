import { useState } from "react";

//filer
//clearInterval
//custom hook in nextts

const Alltask = () => {

    const [tasks, setTasks] = useState<string[]>([]);

    const addTask = (e: any) => {
        e.preventDefault();

        if (e.target.taskUserInput.value) {
            setTasks([...tasks, e.target.taskUserInput.value]);
            e.target.taskUserInput.value = "";
        }
    }

    const removeTask = (indexToRemove: number) => {
        setTasks(tasks.filter((_, index) => index !== indexToRemove));
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
                                <h1 className="w-[250px] border-2 p-2 mr-2">{task}</h1>
                                <button onClick={() => removeTask(index)} className="bg-red-600 text-white p-2 px-4 rounded-sm hover:bg-red-700">-</button>
                            </div>
                    )
                }
            </div>
        </div>
    )
};

export default Alltask;