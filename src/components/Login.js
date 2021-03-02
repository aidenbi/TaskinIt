import React from 'react';
import { useState } from 'react';

const Login = ({ onUser }) => {

    const [username, setUsername] = useState('')

    const onSubmit = (e) => {

        e.preventDefault()

        if (!username) {
            alert('Please enter your username!')
            return
        }

        onUser(username)

        setUsername('')

    }




    return (
        <form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Username</label>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <input type='submit' value='Login' className='btn btn-block' />
        </form>
    )
}

export default Login
