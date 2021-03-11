import React from 'react';
import { useState } from 'react';

const Login = ({ onLogin }) => {

    const [name, setName] = useState()
    const [password, setPassword] = useState()



    const onSubmit = (e) => {

        e.preventDefault()

        if (!name || !password) {
            alert('Please enter your username or password!')
            return
        }

        onLogin({ name, password })

    }




    return (
        <div className="logincontainer">
            <form className='add-form' onSubmit={onSubmit} >
                <div className='form-control'>
                    <label>Username</label>
                    <input type='text' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type='submit' value="Login" className="btn btn-block" />
            </form>
        </div>
    )
}

export default Login
