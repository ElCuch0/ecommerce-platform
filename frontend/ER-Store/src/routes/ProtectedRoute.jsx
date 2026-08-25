import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function ProtectedRoute({ requiredRole }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return null

    if (!user) {
        return <Navigate to="/" replace state={{ from: location.pathname }} />
    }

    const userRole = typeof user.role === 'string' ? user.role : user.role?.name

    if (requiredRole && userRole?.toUpperCase() !== requiredRole.toUpperCase()) {
        return <Navigate to="/account" replace />
    }

    return <Outlet />
}
