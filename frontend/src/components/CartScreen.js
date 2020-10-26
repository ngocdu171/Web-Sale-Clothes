import React from 'react'

export default function CartScreen(props) {
    const productId = props.match.params.id;
    console.log("product.id is " + productId);
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;
    // console.log("quantity: " + qty);
    const removeItem = () => {
        alert("removeItem");
    }
    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    <li>
                        <div className="cart-image">
                            <img src="../images/image1.jpg"/>
                        </div>
                        <div className="cart-name">
                            <div>
                                name
                            </div>
                            <div>
                                Qty:
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button type="button" onClick={removeItem}>Delete</button>
                            </div>
                        </div>
                        <div className="cart-price">
                            price
                        </div>
                    </li>
                </ul>
            </div>
            <div className="cart-action">
                <button>Proceed to checkout</button>
            </div>
        </div>
    )
}
