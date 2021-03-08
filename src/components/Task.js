import { FaTimes } from 'react-icons/fa';
import { GoDash } from 'react-icons/go';
import { FiPlus } from "react-icons/fi";
import React from 'react';




const Task = ({ task, onDelete, onToggle, onUp, onDown, onComplete, username }) => {
    return (
        <div className={`grid-container1 ${task.reminder ?
            'reminder' : ''}`}
            onDoubleClick={() => onToggle(task._id)}>
            <div className="taskDifficulty">{task.Difficulty}</div>
            <div className="taskName">
                {task.text}
            </div>
            { username === task.Username ?
                <>
                    <div className="x"><FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task._id)} /></div>
                    <div className={`up ${task.Difficulty === 9 ? 'max' : ''}`}><FiPlus onClick={() => onUp(task._id)} /></div>
                    <div className={`down ${task.Difficulty === 1 ? 'max' : ''}`}><GoDash onClick={() => onDown(task._id)} /></div>
                    <div className="taskDay">{task.day}</div>
                    <div className="compButton"><button className="btn btn-block" onClick={() => onComplete(task._id)}>COMPLETE</button></div>
                </>
                : ""}
        </div>
    )
}

export default Task
