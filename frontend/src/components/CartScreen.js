import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;
    // const [product, setProduct] = useState("");
    // const [product, setProduct] = useState([]);

    const [product, setProduct] = useState([]);
    setProduct(props.Cart);
    // console.log(product);
    var temDate = new Date();
    var date = temDate.getDate() + "-" + temDate.getMonth() + "-" + temDate.getFullYear();
    console.log("today is " + date);
    // console.log("quantity: " + qty);
    // console.log("productId " + productId);
    var array = [];

    // useEffect(() => {
    //     if(productId) {
    //         Axios('http://localhost:5000/products/' + productId)
    //         .then((response) => {
    //             const {data} = response;
    //             // setProduct(data, qty);
    //             // console.log(response);
    //             // console.log("--------------");
    //             setProduct({id: response.data._id,
    //                         name: response.data.name,
    //                         image: response.data.image,
    //                         price: response.data.price,
    //                         countInStock: response.data.countInStock,
    //                         qty
    //                         })
    //         })
    //     }
    //     return () => {
    //         //
    //     }
    // }, [])
    
    // console.log(product);
    // array.push({product});
    // console.log(array);
    // // setProduct(array);
    // console.log(array.product);
    const removeItem = (tam) => {
        alert("removeItem " + tam);
    }
    // console.log(props.Cart);
    // console.log(props.Cart.name);
    // let product = props.Cart;
    // console.log(product);
    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        productId === null? <div>Cart is Empty</div>
                        :
                        <li>
                            <div className="cart-image">
                                <img src={product.image} alt="product"/>
                            </div>
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/" + product._id}>
                                        {product.name}
                                    </Link>
                                </div>
                                <div>
                                    Qty:
                                    <select>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )}
                                    </select>
                                    <button type="button" onClick={() => removeItem(product._id)}>Delete</button>
                                </div>
                            </div>
                            <div className="cart-price">
                                {product.price}$
                            </div>
                        </li>
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>Subtotal({qty} items): {product.price * qty}</h3>
                <button className="btnProceed" disabled={product._id ===0}>
                    Proceed to checkout
                </button>
            </div>
        </div>
    )
}
