import React from 'react'

import DashboardLayout from '../layout/DashboardLayout'
import BranchProvider from '../contexts/BranchProvider'
import CrudBranch from '../modules/CrudBranch'

function Branch() {
    return (
        <BranchProvider>
            <DashboardLayout>
                <CrudBranch />
            </DashboardLayout>
        </BranchProvider>
    )
}

export default Branch
