import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductsScreen(props) {
    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        var tam = props.match.params.id;
            axios.get('http://localhost:4000/products/' + tam)
            .then((response) => {
                const {data} = response;
                setProduct(data);
        })
        return () => {
            //
        }
    }, []);

    const AddtoCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
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
                            Status: {product.countInStock > 0 ?"In stock": "Out of Stock"}
                        </li>
                        <li>
                            Qty: <select 
                                    value={qty}
                                    onChange={(event) => {setQty(event.target.value);}}>
                                    {[...Array(product.countInStock).keys()].map(x =>
                                        <option key={x+1} value={x + 1}>{x + 1}</option>
                                    )}
                            </select>
                        </li>
                        <li>
                            {product.countInStock > 0 && <button 
                                onClick={AddtoCart}
                                className="btn-Add-to-cart">Add to Cart</button>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}