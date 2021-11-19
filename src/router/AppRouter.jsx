import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Logout from '../pages/Logout'
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import Customer from '../pages/Customer'
import Owner from '../pages/Owner'
import Branch from '../pages/Branch'
import Analytics from '../pages/Analytics'

function AppRouter() {
    return (
        <Routes>
            {/* Private Route */}
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="customer" element={<Customer />} />
                <Route path="owner" element={<Owner />} />
                <Route path="branch" element={<Branch />} />
                <Route path="analytics" element={<Analytics />} />

                <Route path="logout" element={<Logout />} />

                <Route path="notfound" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/notfound" replace />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
