import Axios from 'axios';
import React from 'react'
import { Link, Redirect } from 'react-router-dom';

export default function Register(props) {
    function register(event) {
        event.preventDefault();
        var username = event.target['username'].value;
        var password = event.target['password'].value;
        Axios.post('http://localhost:4000/register', {
            username,
            password,}).then((response) => {
                if(response.data.message === "Create Success")
                {
                    props.history.push(props.redirecttoLogin);
                }
                else {
                    alert(response.data.message);
                }
            })
    }
    return (
        <div className="form">
            <form onSubmit={register}>
                <ul className="form-container">
                    <li className="title">Create Account</li>
                    <li>
                        <label>Username</label>
                        <input type="text" id="username" name="username"></input>
                    </li>
                    <li>
                        <label>Password</label>
                        <input type="password" id="password" name="password"></input>
                    </li>
                    <li>
                        <button type="submit" className="btn-Signin">Register</button>
                    </li>
                    <li>
                        Already have an account <Link to="/signin"> Sign In</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
