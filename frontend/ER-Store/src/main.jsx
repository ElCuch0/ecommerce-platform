import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import { HeroSection } from './components/hero-section/HeroSection.jsx'
import { HeaderNav } from './components/HeaderNav.jsx'
import { CategoryGrid } from './components/grids/CategoryGrid.jsx'
import { SellestProducts } from './components/products-sections/SellestProducts.jsx'
import { CollectionsGrid } from './components/grids/CollectionsGrid.jsx'
import { ErFooter } from './components/ErFooter.jsx'
import { products } from './data.jsx'
import { FeaturedProducts } from './components/products-sections/FeaturedProducts.jsx'

function App() {
    return(
        <>
            <HeaderNav />
            <HeroSection />
            <CategoryGrid />
            <SellestProducts products={products}/>
            <CollectionsGrid />
            <FeaturedProducts products={products}/>
            <ErFooter />
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
)
