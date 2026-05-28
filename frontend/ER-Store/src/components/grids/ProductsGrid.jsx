import React from "react";
import './products-grid.css'
import { ProductCard } from "../cards/ProductCard.jsx";

export function Products({products}) {
    return(
        <section className="container-products">
            
            <h2 className="featured-products-title">Productos destacados</h2>
            <p className="featured-products-description">Selección rápida de lo mejor de la tienda.</p>

            <div className="featured-products">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
