import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json'
import axios from 'axios';

export default function HomeScreen(props) {
    const [products, setProduct] = useState([]);
    useEffect(() => {
            axios.get('http://localhost:5000/products')
            .then((response) => {
                const {data} = response;
                setProduct(data);
        })
        return () => {
            //
        }
    }, [])
    
    return (
        <ul className="products">
            {products.map(product =>
                <li key={product._id}>
                    <div className="product">
                        <Link to={'/product/' + product._id}>
                            <img className="product-image" src={product.image} alt="product" />
                        </Link>
                        <div className="product-name">
                            <Link to={'/product/' + product._id}>{product.name}</Link>
                        </div>
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-price">${product.price}</div>
                        <div className="product-rating">{product.rating} Stars ({product.numReviews} reviews)</div>
                    </div>
                </li>
            )}
        </ul>
    )
}
