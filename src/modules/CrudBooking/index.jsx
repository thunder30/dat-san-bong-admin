import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import DataTable from '../../components/DataTable'
import { BookingContext } from '../../contexts/BookingProvider'
import { AuthContext } from '../../contexts/AuthProvider'
import toCommas from '../../helpers/toCommas'

const columnBookings = [
    {
        title: 'Mã phiếu',
        dataIndex: 'bookingId',
        align: 'center',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'email',
        align: 'center',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
        align: 'center',
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endDate',
        align: 'center',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'total',
        align: 'center',
        render: (total) => {
            return <b>{toCommas(total)}</b>
        },
    },
    {
        title: 'Trạng thái thanh toán',
        dataIndex: 'isPaid',
        align: 'center',
        key: 'isPaid',
        render: (isPaid) => {
            const status = isPaid
                ? { color: 'green', text: 'Đã thanh toán' }
                : { color: 'volcano', text: 'Chưa thanh toán' }
            return <Tag color={status.color}>{status.text}</Tag>
        },
    },
    {
        title: ' ',
        dataIndex: 'bookingId',
        key: 'actions',
        align: 'center',
        width: 70,
        render: (bookingId) => {
            const url = '' + bookingId
            return (
                <Link to={url}>
                    <EyeOutlined title="Chi tiết phiếu" />
                </Link>
            )
        },
    },
]

const columnForAdmin = {
    title: 'Chi nhánh',
    dataIndex: 'pitchBranchName',
    align: 'center',
    width: 200,
}

function CrudBranch() {
    const {
        bookingState: { bookings, isLoading },
    } = useContext(BookingContext)
    const {
        authState: { user },
    } = useContext(AuthContext)

    const dataSource = bookings.map(
        ({
            _id,
            startDate,
            endDate,
            total,
            isPaid,
            customer: { email },
            pitchBranch: { displayName: pitchBranchName },
        }) => ({
            key: _id,
            bookingId: _id,
            pitchBranchName,
            email,
            startDate,
            endDate,
            total,
            isPaid,
        })
    )
    //const dataSource = []
    useEffect(() => {
        if (user.isAdmin) {
            columnBookings.unshift(columnForAdmin)
        }

        return () => {
            if (user.isAdmin) columnBookings.shift()
        }
    }, [user.isAdmin])

    return (
        <>
            <h1>{'Danh sách phiếu đặt sân'}</h1>
            <DataTable
                columns={columnBookings}
                dataSource={dataSource}
                isLoading={isLoading}
            />
        </>
    )
}

export default CrudBranch
