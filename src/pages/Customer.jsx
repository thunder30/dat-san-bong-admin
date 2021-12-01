import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import CrudUser from '../modules/CrudUser'
import UserProvider from '../contexts/UserProvider'

function Customer() {
    return (
        <UserProvider>
            <DashboardLayout>
                <CrudUser role="customers" />
            </DashboardLayout>
        </UserProvider>
    )
}

export default Customer
