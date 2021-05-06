import Task from './Task';
import AddTask from './AddTask'
import { useState } from 'react'

const Tasks = ({ onPrivate, tasks, onDelete, onToggle, onUp, onDown, onComplete, onAdd }) => {

    console.log(tasks)
    return (
        <div className="bodyplaninner">
            {tasks.length > 0 &&
                <div className="addbtn">
                    <AddTask onAdd={onAdd} tasks={tasks} />
                </div>}
            {tasks.length > 0 ?
                <>
                    {tasks.filter((task) => task.Completion === false).map((task, index) => (
                        <Task key={index} task={task} onPrivate={onPrivate} onDelete={onDelete} onToggle={onToggle} onUp={onUp} onDown={onDown} onComplete={onComplete} />))
                    }
                </>
                : ('No Tasks To Show')
            }
        </div>
    )
}

export default Tasks


