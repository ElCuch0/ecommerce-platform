import React from "react";
import "./header-elements.css"
import { IconEr, IconSearch, IconAccount, IconCart } from '../assets/Icons.jsx'

export function HeaderElements ({ onOpenSearch, onOpenLogin, onOpenCart }) {
    return(
        <nav className = "nav-container">
            <a href="/" className = "logo-header" aria-label="Ir al inicio">
                <IconEr />
            </a>

            <div className = "nav-modals">
                <button type="button" className="nav-link" onClick={onOpenSearch} aria-label="Abrir búsqueda">
                    <IconSearch />
                </button>
                <button type="button" className="nav-link" onClick={onOpenLogin} aria-label="Abrir inicio de sesión">
                    <IconAccount />
                </button>
                <button type="button" className="nav-link" onClick={onOpenCart} aria-label="Abrir carrito">
                    <IconCart />
                    <span className="cart-badge">0</span>
                </button>
            </div>
        </nav>
    )
}
