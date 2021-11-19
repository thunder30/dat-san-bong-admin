import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import * as authService from '../core/services/auth'

function PrivateRoute() {
    let location = useLocation()
    return authService.token.get() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default PrivateRoute
