import React from "react";
import logoEr from "../assets/images/Logo_ER.png"
import "./er-footer.css"

export function ErFooter({ onOpenLogin }) {
    return(
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3> <img src={logoEr} alt="Logo empresa ER" /> ER store</h3>
                    <p>
                        Tu tienda de moda online con las mejores tendencias y precios.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Enlaces Rápidos</h3>
                    <ul className="footer-links">
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="cart.html">Carrito</a></li>
                        <li><button type="button" className="footer-login-button" onClick={onOpenLogin}>Mi Cuenta</button></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Atención al Cliente</h3>
                    <ul className="footer-links">
                        <li><a href="#">Preguntas Frecuentes</a></li>
                        <li><a href="#">Envíos y Devoluciones</a></li>
                        <li><a href="#">Términos y Condiciones</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contáctanos</h3>
                    <ul className="footer-links">
                        <li> contacto@ERstore.com</li>
                        <li> +57 300 123 4567</li>
                        <li> Cucuta, Norte de Santander, CO</li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright">
                <p className="copyright-text">&copy; 2026 ER store. Todos los derechos reservados.</p>
            </div>
    </footer>
    )
}