import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import * as authService from '../core/services/auth'

function PrivateRoute() {
    return authService.token.get() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    )
}

export default PrivateRoute
