import React from 'react'
import Button from '@material-ui/core/Button'

const Follow = ({ follow, tarUsername }) => {
    return (
        <div>
            <Button color="primary" onClick={() => tarUsername(follow.following)}>
                {follow.following}
            </Button>
        </div>
    )
}

export default Follow
