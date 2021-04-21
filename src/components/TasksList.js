import Tasks from './Tasks'

const TasksList = ({ onPrivate, tasksList, onDelete, onToggle, onUp, onDown, onComplete, onAdd }) => {
    return (
        <div className="bodyplan">
            {Object.values(tasksList).map((tasks, index) => (
                <Tasks key={index} tasks={tasks} onPrivate={onPrivate} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} onAdd={onAdd} />
            ))}
        </div>
    )
}

export default TasksList
