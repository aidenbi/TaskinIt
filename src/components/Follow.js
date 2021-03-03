import React from 'react'
import Button from '@material-ui/core/Button'

const Follow = ({ follow }) => {
    return (
        <div>
            <Button color="primary">
                {follow.following}
            </Button>
        </div>
    )
}

export default Follow
