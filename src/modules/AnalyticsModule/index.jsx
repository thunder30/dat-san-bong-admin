import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import DataTable from '../../components/DataTable'
import DateTimePicker from '../../components/DateTimePicker'
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
            return <b>{toCommas(total || 0) + ' VND'}</b>
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
        startDate: moment().subtract(1, 'month'),
        endDate: moment(),
    })

    // console.log(branch)

    const columns = user.isAdmin ? columnBranches : columnSingleBranch
    const dataSource = user.isAdmin
        ? branches.map((branch, index) => ({ ...branch, key: index }))
        : [branch]

    //console.log(dataSource)
    console.log(date)

    const handleOnChange = (date, dateString) => {
        console.log(date, dateString)
        if (date) {
            //const rangeDate = date.map((moment) => moment)
            //console.log(rangeDate)
            setDate({
                startDate: date[0],
                endDate: date[1],
            })
        }
    }

    useEffect(() => {
        console.log(`run useEffect analytics admin`)
        const { startDate, endDate } = date
        if (user.isAdmin) {
            getAnalyticsAllBranch(
                startDate.format('DD/MM/YYYY'),
                endDate.format('DD/MM/YYYY')
            )
        }
    }, [user, date])

    useEffect(() => {
        console.log(`run useEffect analytics owner`)

        if (!user.isAdmin) {
            const { startDate, endDate } = date
            const { state } = ownerState
            if (state) {
                const _id = state?.current?.branch?._id
                if (_id)
                    getAnalyticsAsBranch(
                        startDate.format('DD/MM/YYYY'),
                        endDate.format('DD/MM/YYYY'),
                        _id
                    )
            }
        }
    }, [ownerState, date])

    return (
        <>
            <h1>Thống kê doanh thu</h1>
            <div style={{ margin: '20px 0' }}>
                <DateTimePicker rangeDate={date} onChange={handleOnChange} />
            </div>
            <DataTable
                columns={columns}
                dataSource={dataSource}
                isLoading={isLoading}
            />
        </>
    )
}

export default AnalyticsModule
