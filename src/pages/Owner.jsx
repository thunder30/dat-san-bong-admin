import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import CrudUser from '../modules/CrudUser'
import UserProvider from '../contexts/UserProvider'

function Owner() {
    return (
        <UserProvider>
            <DashboardLayout>
                <CrudUser role="owners" />
            </DashboardLayout>
        </UserProvider>
    )
}

export default Owner
