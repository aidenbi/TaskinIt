import React from 'react'
import Follow from './Follow'

const Following = ({ following, tarUsername }) => {
    return (
        <div>
            <a>Following</a>
            {following.map((follow, index) => (
                <Follow key={index} follow={follow} tarUsername={tarUsername} />
            ))}
        </div>
    )
}

export default Following
