import React, { useContext, useLayoutEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

function Logout() {
    const { logoutUser } = useContext(AuthContext)
    useLayoutEffect(() => {
        async function logout() {
            await logoutUser()
        }
        logout()
    }, [logoutUser])
    return <Navigate to="/login" replace />
}

export default Logout
