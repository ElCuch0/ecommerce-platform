import React from "react";
import './products-grid.css'
import { ProductCard } from "../cards/ProductCard.jsx";

export function ProductsGrid({products, onAddToCart}) {
    return(
        <section className="container-products">
            <div className="featured-products">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </section>
    )
}
