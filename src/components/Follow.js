import React from 'react'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

const Follow = ({ follow, tarUsername }) => {
    const [taskstoggle, setTasksToggle] = useState(false)
    const togUserTasks = () => {
        setTasksToggle(!taskstoggle)
    }


    return (
        <div>
            <Button color="primary" onClick={togUserTasks} >{follow.Following}</Button>
            <Button color="primary" onClick={() => tarUsername(follow.Following)}>
                x
            </Button>
        </div>
    )
}

export default Follow
