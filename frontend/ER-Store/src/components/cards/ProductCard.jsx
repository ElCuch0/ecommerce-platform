import { Link } from "react-router-dom";
import './product-card.css'

export function ProductCard ({product, onAddToCart}) {

    const stock = product.inventory?.stock ?? 0;

    return(
        <li className = "product-card">
            <img alt={product.name} className="card-product-image"/>
            <div className="card-content">
                <h3 className="card-title">
                    <Link className="card-title-link" to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="card-description">{product.description}</p>
                <div>
                    <p className="card-price"> ${product.price.toLocaleString("es-CO")}</p>
                    {stock > 0
                        ? <span className="badge-success">En stock</span>
                        : <span className="badge-warning">Agotado</span>}
                </div>
                <button
                    className="card-btn"
                    onClick={onAddToCart}
                >
                    {stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </button>
            </div>
        </li>
    )
}
