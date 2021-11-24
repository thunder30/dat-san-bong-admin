import React from 'react'

function AdminRoute({ children }) {
    const isAdmin = true
    return isAdmin ? { children } : <div>Adminroute failed</div>
}

export default AdminRoute
