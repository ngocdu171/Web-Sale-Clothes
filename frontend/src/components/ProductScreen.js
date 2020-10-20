import React from 'react'
import { Link } from 'react-router-dom';
import data from '../data';

export default function ProductsScreen(props) {
    console.log(props.match.params.id);//lay id cua product khi click vo product
    const product = data.products.find(x => x._id === props.match.params.id)
    return (
        <div>
            <div className="back-to-homepage">
                <Link to="/">Back to Homepage</Link>
            </div>
            <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product" />
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Stars ({product.numReviews} Customer reviews)
                        </li>
                        <li>
                            Price: $ <b>{product.price}</b>
                        </li>
                        <li>
                            Description: {product.description}
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.status}
                        </li>
                        <li>
                            Qty: <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </li>
                        <li>
                            <button className="btn-Add-to-cart">Add to Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}
