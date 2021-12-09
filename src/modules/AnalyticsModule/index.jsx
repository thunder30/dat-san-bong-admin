import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import Spin from '../../components/Spin'
import { AnalyticsContext } from '../../contexts/AnalyticsProvider'
import { AuthContext } from '../../contexts/AuthProvider'
import { OwnerContext } from '../../contexts/OwnerProvider'
import toCommas from '../../helpers/toCommas'

const columnSingleBranch = [
    {
        title: 'Số lượng phiếu',
        dataIndex: 'bookingAmount',
        align: 'center',
    },
    {
        title: 'Doanh thu',
        dataIndex: 'total',
        align: 'center',
        render: (total) => {
            return <b>{toCommas(total) + ' VND'}</b>
        },
    },
]

const columnBranches = [
    {
        title: 'Chi nhánh',
        dataIndex: 'branchName',
        align: 'center',
    },
    {
        title: 'Số lượng phiếu',
        dataIndex: 'bookingAmount',
        align: 'center',
    },
    {
        title: 'Doanh thu',
        dataIndex: 'total',
        align: 'center',
        render: (total) => {
            return <b>{toCommas(total) + ' VND'}</b>
        },
    },
]

function AnalyticsModule() {
    const {
        analyticsState: { branch, branches, isLoading },
        getAnalyticsAsBranch,
        getAnalyticsAllBranch,
    } = useContext(AnalyticsContext)
    const {
        authState: { user },
    } = useContext(AuthContext)
    const ownerState = useContext(OwnerContext)

    const [date, setDate] = useState({
        startDate: '12/11/2020',
        endDate: '12/11/2023',
    })

    // console.log(branch)

    const columns = user.isAdmin ? columnBranches : columnSingleBranch
    const dataSource = user.isAdmin
        ? branches.map((branch, index) => ({ ...branch, key: index }))
        : [branch]

    console.log(dataSource)

    useEffect(() => {
        console.log(`run useEffect analytics`)
        const { startDate, endDate } = date
        if (user.isAdmin) {
            getAnalyticsAllBranch(startDate, endDate)
        } else {
            if (ownerState) {
                const {
                    state: {
                        current: {
                            branch: { _id },
                        },
                    },
                } = ownerState
                console.log(_id)
                if (_id) getAnalyticsAsBranch(startDate, endDate, _id)
            }
        }
    }, [ownerState.state.current.branch._id])

    return (
        <>
            <h1>Thống kê doanh thu</h1>
            <DataTable
                columns={columns}
                dataSource={dataSource}
                isLoading={isLoading}
            />
        </>
    )
}

export default AnalyticsModule
