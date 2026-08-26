import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <CartProvider>
            <AppRoutes />
        </CartProvider>
    </AuthProvider>
)
