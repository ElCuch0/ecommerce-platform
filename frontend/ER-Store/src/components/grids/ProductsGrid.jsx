import './products-grid.css'
import { ProductCard } from "../cards/ProductCard.jsx";

export function ProductsGrid({
    products = [],
    loading = false,
    error = null,
    onAddToCart
}) {

    return(
    <>
    {loading && (
        <p>Cargando productos</p>
    )}

    {error && (
        <p>No se pudieron cargar los productos</p>
    )}

    {!loading && !error && products.length === 0 && (
        <p>No hay productos disponibles</p>
    )}

    {!loading && !error && products.length > 0 && (
        <section className="container-products">
        <div className="featured-products">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    </section>
    )}
    </>
    )
}
