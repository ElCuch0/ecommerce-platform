import { ProductsGrid } from '../grids/ProductsGrid.jsx' 
import './featured-products.css'

export function FeaturedProducts({products, loading, error, onAddToCart}) {
    return(
        <section>
            <h2 className="featured-products-title">Productos Destacados</h2>
            <p className="featured-products-description">Productos que creemos te pueden gustar.</p>
            <ProductsGrid products={products} loading={loading} error={error} onAddToCart={onAddToCart} />
        </section>
    )
}
