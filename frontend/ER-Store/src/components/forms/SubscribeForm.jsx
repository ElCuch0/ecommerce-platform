import React from "react";
import './subscribe-form.css'

export function SubscribeForm() {
    return(
        <section className="container-subscribe-form" >
            <header className="subscribe-header">
                <h2 className="subscribe-title">Suscríbete</h2>
                <p className="subscribe-subtitle">Recibe ofertas y novedades. Sin spam.</p>
            </header>
            <form className="subscribe-form">
                <label className="subscribe-label">Correo electrónico</label>
                <div className="subscribe-form-row">
                    <input className="form-input" type="email" placeholder="tu@email.com" required />
                    <button className="btn-subscribe" type="submit">Suscribirme</button>
                </div>
            </form>
        </section>
    )
}