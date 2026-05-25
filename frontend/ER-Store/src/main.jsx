import React from 'react'
import { createRoot } from 'react-dom/client'
import { HeaderNav } from './components/HeaderNav.jsx'
import { HeroSection } from './components/hero-section/HeroSection.jsx'
import './assets/styles/global.css'

function App() {
    return(
        <>
            <HeaderNav />
            <HeroSection />
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
)
