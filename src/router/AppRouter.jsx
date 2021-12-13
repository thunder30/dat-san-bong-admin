import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import OwnerRoute from './OwnerRoute'
import AdminRoute from './AdminRoute'
import DashboardOwner from '../pages/DashboardOwner'
import Logout from '../pages/Logout'
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import Customer from '../pages/Customer'
import Owner from '../pages/Owner'
import Branch from '../pages/Branch'
import Analytics from '../pages/Analytics'
import Pitch from '../pages/Pitch'
import Booking from '../pages/Booking'
import BookingDetail from '../pages/BookingDetail'
import Profile from '../pages/Profile'
import Setting from '../pages/Setting'

import CrudBooking from '../modules/CrudBooking'

function AppRouter() {
    return (
        <Routes>
            {/* Private Route */}
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<OwnerRoute />}>
                    <Route index element={<DashboardOwner />} />
                    <Route path="pitch" element={<Pitch />} />
                    <Route path="booking" element={<Booking />}>
                        <Route index element={<CrudBooking />} />
                        <Route path=":id" element={<BookingDetail />} />
                    </Route>
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="setting" element={<Setting />} />
                </Route>

                <Route path="admin" element={<AdminRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="customer" element={<Customer />} />
                    <Route path="owner" element={<Owner />} />
                    <Route path="branch" element={<Branch />} />
                    <Route path="booking" element={<Booking />}>
                        <Route index element={<CrudBooking />} />
                        <Route path=":id" element={<BookingDetail />} />
                    </Route>
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

                <Route path="logout" element={<Logout />} />

                <Route path="notfound" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/notfound" replace />} />
            </Route>
            {/* <Route path="admin" element={<Dashboard />} /> */}
        </Routes>
    )
}

export default AppRouter
