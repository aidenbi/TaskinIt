import Tasks from './Tasks'

const TasksList = ({ tasksList, onDelete, onToggle, onUp, onDown, onComplete, onAdd }) => {
    console.log(tasksList)
    return (
        <div className="bodyplan">
            {tasksList.map((index) => (
                <Tasks key={index} tasks={tasksList.filter((task) => task.Completion === false)} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} onAdd={onAdd} />
            ))}
        </div>
    )
}

export default TasksList
