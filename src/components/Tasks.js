import Task from './Task';
import AddTask from './AddTask'

const Tasks = ({ tasks, onDelete, onToggle, onUp, onDown, onComplete, onAdd }) => {
    return (
        <div>
            <div className="addbtn">
                <AddTask onAdd={onAdd} />
            </div>
            {tasks.map((task, index) => (
                <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} />
            ))}
        </div>
    )
}

export default Tasks


