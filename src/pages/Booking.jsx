import React from 'react'

import DashboardLayout from '../layout/DashboardLayout'
import BookingProvider from '../contexts/BookingProvider'
import { Outlet } from 'react-router'

function Booking() {
    return (
        <BookingProvider>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </BookingProvider>
    )
}

export default Booking
