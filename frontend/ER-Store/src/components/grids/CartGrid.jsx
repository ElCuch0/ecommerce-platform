

import './cart-grid.css'

export function CartGrid({ items = [] }) {
    return items.length > 0 ? (
        <div className="cart-grid">
            {items.map((item) => (
                <article className="cart-grid-item" key={item.id || item.name}>
                    {item.image ? (
                        <img
                            className="cart-grid-item-image"
                            src={item.image}
                            alt={item.name}
                        />
                    ) : null}

                    <div className="cart-grid-item-body">
                        <h3 className="cart-grid-item-title">{item.name}</h3>
                        {(item.alternative || item.description) ? (
                            <p className="cart-grid-item-description">{item.alternative || item.description}</p>
                        ) : null}

                        <div className="cart-grid-item-meta">
                            <span>Cantidad: {item.quantity || 1}</span>
                            <span>Precio: ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    ) : (
        <div className="cart-grid-empty">No hay productos en el carrito.</div>
    )
}
