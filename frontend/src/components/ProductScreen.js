import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductsScreen(props) {
    var tam = props.match.params.id;
    const [qty, setQty] = useState("1");
    // console.log(qty);
    const [product, setProduct] = useState([]);
    useEffect(() => {
            axios.get('http://localhost:4000/products/' + tam)
            .then((response) => {
                const {data} = response;
                setProduct(data);
        })
        return () => {
            //
        }
    }, [])
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
                            Qty: <select onChange={(event) => {setQty(event.target.value);}}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                            </select>
                        </li>
                        <li>
                            <button className="btn-Add-to-cart"><Link to={"/cart/" + product._id}>Add to Cart</Link></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}