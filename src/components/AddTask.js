import { useState } from 'react';
import Button from './Button'
import { useLocation } from 'react-router-dom'

const AddTask = ({ onAdd }) => {
    const [showAddTask, setShowAddTask] = useState(false)
    const location = useLocation()
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const [encrypt, setEncrypt] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a task')
            return
        }

        onAdd({ text, day, reminder, encrypt })

        setText('')
        setDay('')
        setReminder(false)
        setEncrypt(false)
    }




    return (
        <>
            <div>
                {location.pathname === '/' && <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={() => { setShowAddTask(!showAddTask) }} />}
            </div>
            {showAddTask &&
                <form className='add-form' onSubmit={onSubmit} >
                    <div className='form-control'>
                        <label>Task</label>
                        <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Day & Time</label>
                        <input type='text' placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)} />
                    </div>
                    <div className='form-control form-control-check'>
                        <label>Set Reminder</label>
                        <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
                    </div>
                    <div className='form-control form-control-check'>
                        <label>Set Encryption</label>
                        <input type='checkbox' checked={encrypt} value={encrypt} onChange={(e) => setEncrypt(e.currentTarget.checked)} />
                    </div>

                    <input type='submit' value='Save Task' className='btn btn-block' />
                </form>
            }
        </>
    )
}

export default AddTask
