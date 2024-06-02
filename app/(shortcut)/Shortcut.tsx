const Shortcut = () => {

    // when i press the "s" key i need the timer to start/stop
    // when i press t i want to focus the task input
    // when i press the cmd/ctrl + enter i want to add a task


    // in the case of focusing the input of task since the logic is in the countdown component
    // it is better to make that logic has a custom hook so the task component can also use it.

    return (
        <div>
            <table>
                <tbody>
                    <tr className="border-2 border-black text-center">
                        <th className="border-2 px-5 py-1 border-black">Command</th>
                        <th>Action</th>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black">Ctrl + Space</td>
                        <td className="px-5 py-1">Timer start/stop</td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black">Ctrl + n</td>
                        <td className="px-5 py-1">Create new task</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
};

export default Shortcut;