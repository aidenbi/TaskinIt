import { FaRegWindowClose } from 'react-icons/fa';
import { GoDash } from 'react-icons/go';
import { FiPlus } from "react-icons/fi";
import React from 'react';
import { useState, useEffect } from 'react'





const Task = ({ task, onDelete, onToggle, onUp, onDown, onComplete, onPrivate }) => {
    const [ptask, setPTask] = useState(task.Private)

    useEffect(() => {
        privateToggle(task._id)
    }, [ptask])

    const privateToggle = (id) => {
        if (task.hasOwnProperty('ownTask')) {
            onPrivate({ id, ptask })
        }
    }

    return (
        <div className={`grid-container1 ${task.reminder ?
            'reminder' : ''}`}
            onDoubleClick={() => onToggle(task._id)}>
            <div className="taskDifficulty">{task.Difficulty}</div>
            <div className="taskName">
                {task.text}
            </div>
            <div className="taskDay">{task.day}</div>
            {task.hasOwnProperty('ownTask') &&
                <>
                    <div className="privateTask">
                        {ptask && <div className="plock">Private</div>}
                        <label className="switch">
                            <input type="checkbox" checked={ptask} value={ptask} onChange={(e) => setPTask(e.currentTarget.checked)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="x"><p className="xstyle" onClick={() => onDelete(task._id)}>X</p></div>
                    <div className={`up ${task.Difficulty === 9 ? 'max' : ''}`}><FiPlus onClick={() => onUp(task._id)} /></div>
                    <div className={`down ${task.Difficulty === 1 ? 'max' : ''}`}><GoDash onClick={() => onDown(task._id)} /></div>
                    <div className="compButton"><button className="btn btn-block" onClick={() => onComplete(task._id)}>COMPLETE</button></div>

                </>
            }
        </div>

    )
}

export default Task
