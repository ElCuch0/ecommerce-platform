import React from "react";
import "./header-elements.css"
import { IconEr, IconSearch, IconAccount, IconCart } from '../assets/Icons.jsx'

export function HeaderElements () {
    return(
        <nav className = "nav-container">
            <a href = "/" className = "logo-header">
                <IconEr />
            </a>

            <div className = "nav-modals">
                <a href="#" className="nav-link">
                    <IconSearch />
                </a>
                <a href="#" className="nav-link">
                    <IconAccount />
                </a>
                <a href="cart.html" className="nav-link" id="cartBtn">
                    <IconCart />
                    <span className="cart-badge">0</span>
                </a>
            </div>
        </nav>
    )
}
