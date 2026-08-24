import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
)
