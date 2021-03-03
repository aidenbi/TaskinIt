import React from 'react';
import { useState } from 'react';

const Following = ({ onFollow }) => {
    const [following, setFollowing] = useState('')

    const onSubmit = (e) => {

        e.preventDefault()

        if (!following) {
            alert('Please enter a valid username!')
            return
        }

        onFollow({ following })

        setFollowing('')

    }


    return (
        <div>
            <div className="followcontainer">
                <form className='add-form' onSubmit={onSubmit} >
                    <div className='form-control'>
                        <label>Follow User</label>
                        <input type='text' placeholder='Username' value={following} onChange={(e) => setFollowing(e.target.value)} />
                    </div>
                    <input type='submit' value="Follow" className="btn btn-block" />
                </form>
            </div>
        </div>
    )
}

export default Following
