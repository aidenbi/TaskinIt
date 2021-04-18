import Tasks from './Tasks'

const TasksList = ({ username, tasksList, onDelete, onToggle, onUp, onDown, onComplete, onAdd }) => {


    console.log(tasksList)
    console.log(Object.values(tasksList))
    return (
        <div className="bodyplan">
            {Object.values(tasksList).map((tasks, index) => (
                <Tasks key={index} tasks={tasks} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} onAdd={onAdd} ownTasks={username} />
            ))}
        </div>
    )
}

export default TasksList
