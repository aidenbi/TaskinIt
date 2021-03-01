import { FaTimes } from 'react-icons/fa';
import { GoDash } from 'react-icons/go';
import { FiPlus } from "react-icons/fi";
import Button from '@material-ui/core/Button';
import React from 'react';




const Task = ({ task, onDelete, onToggle, onUp, onDown, onComplete }) => {
    return (
        <div className={`grid-container ${task.reminder ?
            'reminder' : ''}`}
            onDoubleClick={() => onToggle(task.id)}>
            <div className="taskDifficulty">{task.Difficulty}</div>
            <div className="taskName">
                {task.text}
            </div>
            <div className="x"><FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} onToggle={onToggle} /></div>
            <div className={`up ${task.Difficulty === 9 ? 'max' : ''}`}><FiPlus onClick={() => onUp(task.id)} /></div>
            <div className={`down ${task.Difficulty === 1 ? 'max' : ''}`}><GoDash onClick={() => onDown(task.id)} /></div>
            <div className="taskDay">{task.day}</div>
            <div className="compButton"><Button variant="outlined" onClick={() => onComplete(task.id)}>COMPLETE</Button></div>
        </div>
    )
}

export default Task
