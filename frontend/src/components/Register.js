import Axios from 'axios';
import React from 'react'
import { Link, Redirect } from 'react-router-dom';

export default function Register(props) {
    function register(event) {
        event.preventDefault();
        var username = event.target['username'].value;
        var email = event.target['email'].value;
        var password = event.target['password'].value;
            Axios.post('http://localhost:5000/register', {
            username,email,password})
            .then((response) => {
                if(response.data.message === "Create Success!")
                {
                    alert("Create Success");
                    props.history.push(props.redirecttoLogin);
                }
                else {
                    alert("both must be string, username and password must be more than 6 characters long");
                }
            })
    }
    return (
        <div className="form">
            <form onSubmit={register}>
                <ul className="form-container">
                    <li className="title">Create Account</li>
                    <li>
                        <label>Your Name</label>
                        <input type="text" id="username" name="username" placeholder="Your Name"></input>
                    </li>
                    <li>
                        <label>Email</label>
                        <input type="email" id="email" name="email" placeholder="Email"></input>
                    </li>
                    <li>
                        <label>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password"></input>
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
