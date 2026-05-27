import React from "react";
import './product-card.css'

export function ProductCard ({product}) {
    return(
        <li className = "product-card">
            <img src={product.image} alt={product.name} className="card-product-image"/>
            <div className="card-content">
                <h3 className="card-title">
                    <a className="card-title-link" href={product.id}> {product.name} </a>
                </h3>
                <p className="card-description">{product.description}</p>
                <div>
                    <p className="card-price"> {product.price} </p>
                    {product.stock > 0
                        ? <span className="badge-success">En stock</span>
                        : <span className="badge-warning">Agotado</span>}
                </div>
                <button
                    className="card-btn"
                >
                    {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </button>
            </div>
        </li>
    )
}
