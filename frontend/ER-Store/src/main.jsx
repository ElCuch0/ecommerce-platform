import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import { AppRoutes } from './routes/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
    <AppRoutes />
)
