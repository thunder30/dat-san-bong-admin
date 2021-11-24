import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

function AdminRoute() {
    const {
        authState: { user },
    } = useContext(AuthContext)

    return user.isAdmin ? <Outlet /> : <Navigate to="/notfound" />
}

export default AdminRoute
