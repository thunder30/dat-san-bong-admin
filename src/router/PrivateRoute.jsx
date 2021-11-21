import React, { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import * as authService from '../core/services/auth'

function PrivateRoute() {
    return authService.token.get() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    )
}

export default PrivateRoute
