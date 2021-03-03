import Task from './Task';
import AddTask from './AddTask'

const Tasks = ({ tasks, onDelete, onToggle, onUp, onDown, onComplete, onAdd, username }) => {
    return (
        <div>
            <div className="addbtn">
                <AddTask onAdd={onAdd} />
            </div>
            {tasks.length > 0 ?
                <>
                    {tasks.map((task, index) => (
                        <Task key={index} task={task} username={username} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} />))
                    }
                </>
                : ('No Tasks To Show')
            }
        </div>
    )
}

export default Tasks


