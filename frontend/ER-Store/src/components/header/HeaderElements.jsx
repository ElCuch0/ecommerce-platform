import React from "react";
import "./header-elements.css"
import { IconEr, IconSearch, IconAccount, IconCart } from '../assets/Icons.jsx'
import { useAuth } from "../../context/AuthContext.jsx";

export function HeaderElements ({ onOpenSearch, onOpenLogin, onOpenCart }) {

    const { user, logout } = useAuth()

    return(
        <nav className = "header-nav-container">
            <a href="/" className = "logo-header" aria-label="Ir al inicio">
                <IconEr />
            </a>

            <div className = "nav-modals">
                <button type="button" className="nav-link" onClick={onOpenSearch} aria-label="Abrir búsqueda">
                    <IconSearch />
                </button>
                {user ? (
                    <button type="button" className="nav-link" onClick={logout} aria-label="Abrir inicio de sesión">
                        <IconAccount />
                    </button>
                ) : (
                    <button type="button" className="nav-link" onClick={onOpenLogin} aria-label="Abrir inicio de sesión">
                        Iniciar sesión
                    </button>
                )}
                <button type="button" className="nav-link" onClick={onOpenCart} aria-label="Abrir carrito">
                    <IconCart />
                    <span className="cart-badge">0</span>
                </button>
            </div>
        </nav>
    )
}
