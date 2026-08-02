import React from "react";
import { ProductsGrid } from '../grids/ProductsGrid.jsx' 
import './featured-products.css'

export function FeaturedProducts({products, onAddToCart}) {
    return(
        <section>
            <h2 className="featured-products-title">Productos Mas Vendidos</h2>
            <p className="featured-products-description">Que es lo que mas compran los usuarios.</p>
            <ProductsGrid products={products} onAddToCart={onAddToCart} />
        </section>
    )
}
