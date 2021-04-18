import Task from './Task';
import AddTask from './AddTask'

const Tasks = ({ tasks, onDelete, onToggle, onUp, onDown, onComplete, onAdd, ownTasks }) => {
    return (
        <div className="bodyplaninner">
            <div className="addbtn">
                <AddTask onAdd={onAdd} />
            </div>
            {tasks.length > 0 ?
                <>
                    {tasks.filter((task) => task.Completion === false).map((task, index) => (
                        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} ownTasks={ownTasks} />))
                    }
                </>
                : ('No Tasks To Show')
            }
        </div>
    )
}

export default Tasks


