import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import { HeroSection } from './components/hero-section/HeroSection.jsx'
import { HeaderNav } from './components/HeaderNav.jsx'
import { Products } from './components/grids/ProductsGrid.jsx'
import { CategoryGrid } from './components/grids/CategoryGrid.jsx'
import { ErFooter } from './components/ErFooter.jsx'
import { products } from './data.jsx'

function App() {
    return(
        <>
            <HeaderNav />
            <HeroSection />
            <CategoryGrid />
            <ErFooter />
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
)
