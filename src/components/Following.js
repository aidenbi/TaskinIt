import React from 'react'
import Follow from './Follow'

const Following = ({ following }) => {
    return (
        <div>
            <a>Following</a>
            {following.map((follow, index) => (
                <Follow key={index} follow={follow} />
            ))}
        </div>
    )
}

export default Following
