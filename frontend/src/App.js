import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import Signin from './components/Signin';
import Register from './components/Register';

function App() {
    const openMenu = () =>{
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () =>{
        document.querySelector(".sidebar").classList.remove("open");
    }
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick= {openMenu}>
                            ☰
                        </button>
                        <Link to="/" >Amazona</Link>
                    </div>
                    <div className="header-link">
                        <a href="cart.html">Cart</a>
                        <Link to="/signin">Sign In</Link>
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                    <ul>
                        <li>
                            <a href="index.html">Pants</a>
                        </li>
                        <li>
                            <a href="index.html">Shirts</a>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Route path="/signin" component={Signin} />
                        <Route path="/register" render={ routeProps => <Register redirecttoLogin="/login" {...routeProps} />}/>
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route path="/" exact={true} component={HomeScreen} />
                    </div>
                </main>
                    <footer className="footer">
                        All right reserved.
                    </footer>
                </div>
            </BrowserRouter>
        );
    }

export default App;