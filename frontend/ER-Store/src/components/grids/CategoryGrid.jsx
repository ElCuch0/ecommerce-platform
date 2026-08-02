import React from "react";
import "./category-grid.css"

export function CategoryGrid() {
    return(
        <section className="section-categories">

            <h2 className="categories-title">Categorías destacadas</h2>
            <p className="categories-description"> Explora lo más popular y encuentra tu estilo en segundos. </p>

            <div className="categories-grid">
                <a className="category-card" href="#products-section" data-category-jump="camisas">Camisas</a>
                <a className="category-card" href="#products-section" data-category-jump="pantalones">Pantalones</a>
                <a className="category-card" href="#products-section" data-category-jump="vestidos">Vestidos</a>
                <a className="category-card" href="#products-section" data-category-jump="zapatos">Zapatos</a>
                <a className="category-card" href="#products-section" data-category-jump="accesorios">Accesorios</a>
            </div>
        </section>
    )
}
