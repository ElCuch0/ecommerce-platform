import { ProductsGrid } from '../grids/ProductsGrid.jsx' 
import './sellest-products.css'

export function SellestProducts({products, loading, error, onAddToCart}) {
    return(
        <section>
            <h2 className="sellest-products-title">Productos Mas Vendidos</h2>
            <p className="sellest-products-description">Que es lo que mas compran los usuarios.</p>
            <ProductsGrid products={products} loading={loading} error={error} onAddToCart={onAddToCart} />
        </section>

    )
}
