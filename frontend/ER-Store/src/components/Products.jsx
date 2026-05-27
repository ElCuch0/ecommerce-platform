import React from "react";
import './products.css'
import { ProductCard } from "./cards/ProductCard.jsx";

export function Products({products}) {
    return(
        <section className="featured-products">
            {products.map(product => (
                    <ProductCard key={product.id} product={product} />
            ))}
        </section>
    )
}
