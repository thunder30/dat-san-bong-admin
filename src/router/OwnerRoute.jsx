import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'

import { AuthContext } from '../contexts/AuthProvider'

function OwnerRoute() {
    const {
        authState: { user },
    } = useContext(AuthContext)
    return user.isAdmin ? <Navigate to="/admin" replace /> : <Outlet />
}

export default OwnerRoute
