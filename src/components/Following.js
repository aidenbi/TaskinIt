import React from 'react'
import Follow from './Follow'

const Following = ({ following, tarUsername, userTasksToggle }) => {
    return (
        <div>
            <a>Following</a>
            {Array.isArray(following) &&
                following.map((follow, index) => (
                    <Follow key={index} follow={follow} tarUsername={tarUsername} userTasksToggle={userTasksToggle} />
                ))}
        </div>
    )
}

export default Following
