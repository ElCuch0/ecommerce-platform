import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import { products } from './data.jsx'
import { AppClient } from './pages/home/HomePage.jsx'

createRoot(document.getElementById('root')).render(
    <AppClient products={products} />
)
