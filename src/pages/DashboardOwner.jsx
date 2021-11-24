import React, { useContext } from 'react'
import SpinStyled from '../components/Spin'
import { OwnerContext } from '../contexts/OwnerProvider'

import DashboardLayout from '../layout/DashboardLayout'

function DashboardOwner() {
    const {
        state: { isLoading },
    } = useContext(OwnerContext)

    if (isLoading) return <SpinStyled />

    return <DashboardLayout>Dashboard owner</DashboardLayout>
}

export default DashboardOwner
