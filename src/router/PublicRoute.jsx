import React from 'react'
import { Navigate } from 'react-router-dom'
import * as authService from '../core/services/auth'

function PublicRoute() {
    // kiểm tra có accesstoken không
    return authService.token.get() ? (
        <Navigate to="/" replace />
    ) : (
        <Navigate to="/login" replace />
    )
}

export default PublicRoute
