import Tasks from './Tasks'

const TasksList = ({ tasksList, onDelete, onToggle, onUp, onDown, onComplete, onAdd }) => {
    return (
        <div className="bodyplan">
            {tasksList.map((tasks, index) => (
                <Tasks key={index} tasks={tasks} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} onAdd={onAdd} />
            ))}
        </div>
    )
}

export default TasksList
