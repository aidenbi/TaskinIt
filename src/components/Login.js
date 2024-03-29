import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin, webtitle, onClick }) => {

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
            <header className='header'>
                <h2>{webtitle}</h2>
            </header>
            <form className='add-form' onSubmit={onSubmit} >
                <div className='form-control'>
                    <label>Username</label>
                    <input type='text' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type='text' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type='submit' value="Login" className="btn btn-block" />
            </form>
            <Link to='/register'>
                <button onClick={onClick}> Sign Up!</button>
            </Link>
        </div>

    )
}

Login.defaultProps = {
    webtitle: 'Login',
}

export default Login
