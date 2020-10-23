import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("username: " + username+ " " + "password: " + password );
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <ul className="form-container">
                    <li className="title">Sign-In</li>
                    <li>
                        <label>Username</label>
                        <input type="text" id="username" name="username" 
                                onChange={(e) => setUsername(e.target.value)}></input>
                    </li>
                    <li>
                        <label>Password</label>
                        <input type="password" id="password" name="password" 
                                onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button type="submit" className="btn-Signin">Sign In</button>
                    </li>
                    <li>New to Amazona?</li>
                    <li>
                        <Link to="/register" className="btn-Register">Create Account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
