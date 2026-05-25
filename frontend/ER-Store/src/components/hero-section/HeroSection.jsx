import React from "react";
import './hero-section.css'
import heroImg from '../../assets/images/hero-section.jpg'

export function HeroSection () {
    return(
        <section className="hero">
                <img className = "hero-img" src={heroImg} alt="Imagen de varias personas estilando sus pantalones"/>
                <button className = "hero-info">
                        Ver más
                </button>
        </section>
    )
}
