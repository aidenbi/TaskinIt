import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle, onUp, onDown, onComplete }) => {
    return (
        <>
            {tasks.map((task, index) => (
                <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} />
            ))}
        </>
    )
}

export default Tasks


