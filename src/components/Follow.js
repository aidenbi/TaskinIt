import React from 'react'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

const Follow = ({ follow, tarUsername, userTasksToggle }) => {



    return (
        <div>
            <Button color="primary" onClick={() => userTasksToggle(follow.Following)} >{follow.Following}</Button>
            <Button color="primary" onClick={() => tarUsername(follow.Following)}>
                x
            </Button>
        </div>
    )
}

export default Follow
