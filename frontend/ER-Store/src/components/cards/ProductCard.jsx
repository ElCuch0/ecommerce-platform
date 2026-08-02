import React from "react";
import { Link } from "react-router-dom";
import './product-card.css'
import { addToCart } from "../../services/cartService.js";

export function ProductCard ({product, onAddToCart}) {
    const handleAddToCart = () => {
        addToCart(product)
        onAddToCart?.(product)
    }

    return(
        <li className = "product-card">
            <img src={product.image} alt={product.name} className="card-product-image"/>
            <div className="card-content">
                <h3 className="card-title">
                    <Link className="card-title-link" to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="card-description">{product.alternative || product.description}</p>
                <div>
                    <p className="card-price"> ${product.price.toLocaleString()}</p>
                    {product.stock > 0
                        ? <span className="badge-success">En stock</span>
                        : <span className="badge-warning">Agotado</span>}
                </div>
                <button
                    className="card-btn"
                    onClick={handleAddToCart}
                >
                    {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </button>
            </div>
        </li>
    )
}
