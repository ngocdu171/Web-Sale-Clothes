import React from 'react';
import Auth from './Auth';
import { Link, Redirect } from 'react-router-dom';

export default function Signin(props) {
    function signin(event) {
        event.preventDefault();
        var email = event.target['email'].value;
        var password = event.target['password'].value;
        Auth.authenticate(email,password)
        .then(result => {
            props.SigninSuccess(result);
            props.history.push(props.redirecttoHome);
        })
        .catch(() => {
            props.SigninFail();
        })
    }
    return (
        <div className="form">
            <form onSubmit={signin}>
                <ul className="form-container">
                    <li className="title">Sign-In</li>
                    <li>
                        <label>Email</label>
                        <input type="email" id="email" name="email" placeholder="Email..." />
                    </li>
                    <li>
                        <label>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password..." />
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
