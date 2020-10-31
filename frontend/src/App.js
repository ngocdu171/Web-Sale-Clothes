import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import Signin from './components/Signin';
import Register from './components/Register';
import CartScreen from './components/CartScreen';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            SignedIn: false,
            userInfo: null
        }
        this.Signin = this.Signin.bind(this);
        this.SigninFail = this.SigninFail.bind(this);
        this.Cart = this.Cart.bind(this);
    }
    
    openMenu() {
        document.querySelector(".sidebar").classList.add("open");
    }
    closeMenu() {
        document.querySelector(".sidebar").classList.remove("open");
    }
    Cart(item) {
        console.log(item);
        let {items} = this.state;
        items.push({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            countInStock: item.countInStock,
            qty: item.qty
        });
        this.setState({
            items: items
        })
    }

    Signin(result) {
        this.setState({
            SignedIn: true,
            userInfo: result
        })
    }
    SigninFail() {
        this.setState({SignedIn: false});
        alert("Signin Fail");
    }
    render() {
        let items = this.state.items
        console.log(items);
        console.log(items.length);
        return (
            <BrowserRouter>
                <div className="grid-container">
                    <header className="header">
                        <div className="brand">
                            <button onClick= {this.openMenu}>
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
                        <button className="sidebar-close-button" onClick={this.closeMenu}>x</button>
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
                            <Route path="/signin" render={ routeProps => <Signin 
                                                                            SignedIn = {this.state.SignedIn}
                                                                            SigninSuccess = {this.Signin}
                                                                            SigninFail = {this.SigninFail}
                                                                            redirecttoHome="/" {...routeProps} />} />
                            <Route path="/register" render={ routeProps => <Register redirecttoLogin="/signin" {...routeProps} />}/>
                            <Route path="/product/:id" render={ routeProps => <ProductScreen onclickCart={this.Cart} {...routeProps} />}/>
                            <Route path="/cart/:id?" render={ routeProps => <CartScreen redirecttoXXX="/" {...routeProps} />}/>
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
}

export default App;