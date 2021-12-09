import React, { useContext } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import DataTable from '../components/DataTable'
import { BookingContext } from '../contexts/BookingProvider'
import toCommas from '../helpers/toCommas'
import { AuthContext } from '../contexts/AuthProvider'
import convertStringToDate from '../helpers/convertStringToDate'

const columns = [
    {
        title: 'Sân',
        dataIndex: 'pitchName',
        align: 'center',
    },
    {
        title: 'Loại sân',
        dataIndex: 'pitchTypeName',
        align: 'center',
    },
    {
        title: 'Giờ bắt đầu',
        dataIndex: 'startTime',
        align: 'center',
    },
    {
        title: 'Giờ kết thúc',
        dataIndex: 'endTime',
        align: 'center',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        align: 'center',
        render: (price) => {
            return <b>{toCommas(price)}</b>
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
    },
]

const handleStatus = (endTime, description) => {
    const _endTime = convertStringToDate(endTime)
    // Thời gian đá bé hơn hiện tại -> hợp lệ
    return _endTime < Date.now() ? 'Không checkin' : description
}

function BookingDetail() {
    const params = useParams()
    const {
        authState: { user },
    } = useContext(AuthContext)
    const {
        bookingState: { bookings, isLoading },
    } = useContext(BookingContext)

    if (bookings.length === 0) {
        let url = '/booking'
        if (user?.isAdmin) url = '/admin/booking'

        return <Navigate to={url} />
    }

    const booking = bookings.find(({ _id }) => _id === params.id) || []
    // console.log(booking)
    const bookingDetails = booking.bookingDetails.map(
        ({
            _id,
            pitch: {
                displayName: pitchName,
                pitchType: { displayName: pitchTypeName },
            },
            status: { status, description },
            startTime,
            endTime,
            price,
        }) => ({
            key: _id,
            pitchName,
            pitchTypeName,
            status:
                status === 'ST1'
                    ? handleStatus(endTime, description)
                    : description,
            startTime,
            endTime,
            price,
        })
    )

    return (
        <>
            <h1>{`Số phiếu:  ${params.id}`}</h1>
            <DataTable
                columns={columns}
                dataSource={bookingDetails}
                isLoading={isLoading}
            />
        </>
    )
}

export default BookingDetail
