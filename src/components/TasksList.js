import Tasks from './Tasks'

const TasksList = ({ tasksList, onDelete, onToggle, onUp, onDown, onComplete, onAdd }) => {
    console.log(3, tasksList)
    console.log(4, Object.values(tasksList))
    console.log(5, tasksList.propertyIsEnumerable('pinecone111'));
    return (
        <div className="bodyplan">
            {Object.values(tasksList).map((tasks, index) => (
                <Tasks key={index} tasks={tasks} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} onAdd={onAdd} />
            ))}
        </div>
    )
}

export default TasksList
