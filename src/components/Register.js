import React from 'react';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Register = ({ onRegister, webtitle, onSubmitz, onClick }) => {

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()

    const onSubmit = (e) => {

        e.preventDefault()

        if (!name || !password) {
            alert('Please enter your username or password!')
            return
        }

        if (password !== password2) {
            alert('Password does not match')
            setPassword('')
            setPassword2('')
            return
        } else {
            onRegister({ name, password })
            onSubmitz()
        }


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
                <div className='form-control'>
                    <label>Confirm Password</label>
                    <input type='text' placeholder='Confirm Password' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <input type='submit' value="Login" className="btn btn-block" />
            </form>
            <Link to='/'>
                <button onClick={onClick} >Login Now!</button>
            </Link>
        </div>
    )
}
Register.defaultProps = {
    webtitle: 'Register',
}

export default Register
