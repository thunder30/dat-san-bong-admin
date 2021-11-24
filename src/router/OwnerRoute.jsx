import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'

import { AuthContext } from '../contexts/AuthProvider'
import OwnerProvider from '../contexts/OwnerProvider'

function OwnerRoute() {
    const {
        authState: { user },
    } = useContext(AuthContext)

    return user.isAdmin ? (
        <Navigate to="/admin" replace />
    ) : (
        <OwnerProvider>
            <Outlet />
        </OwnerProvider>
    )
}

export default OwnerRoute
