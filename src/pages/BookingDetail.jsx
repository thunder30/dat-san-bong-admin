import React, { useContext } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Table, Tag } from 'antd'

import DataTable from '../components/DataTable'
import { BookingContext } from '../contexts/BookingProvider'
import toCommas from '../helpers/toCommas'
import { AuthContext } from '../contexts/AuthProvider'
import { convertStringToDate, convertBookingToTime } from '../helpers/convert'

const columns = [
    // {
    //     title: 'Chi tiết phiếu',
    //     dataIndex: 'bookingDetailId',
    //     align: 'center',
    //     key: 'bookingDetailId',
    // },
    {
        title: 'Sân',
        dataIndex: 'pitchName',
        align: 'center',
        key: 'pitchName',
    },
    {
        title: 'Loại sân',
        dataIndex: 'pitchTypeName',
        align: 'center',
        key: 'pitchTypeName',
    },
    {
        title: 'Thời gian đá',
        dataIndex: 'bookingTime',
        align: 'center',
        key: 'bookingTime',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        align: 'center',
        key: 'price',
        render: (price) => {
            return <b>{toCommas(price)}</b>
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        key: 'status',
        render: (_status) => {
            const { code, description } = _status
            let color
            switch (code) {
                case 'ST1':
                    color = 'geekblue'
                    break
                case 'ST2':
                    color = 'magenta'
                    break
                case 'ST3':
                    color = 'red'
                    break
                case 'ST4':
                    color = 'green'
                    break
                case 'ST5':
                    color = 'volcano'
                    break
                default:
                    break
            }
            return <Tag color={color}>{description}</Tag>
        },
    },
]

const handleStatus = (startTime, endTime, _status) => {
    const { status, description } = _status

    switch (status) {
        case 'ST1':
            // startTime: 12/21/2021 13:00
            // systems date: 12/21/2021 13:02
            // Thời gian bắt đầu đá lớn hơn tg hệ thống -> Không checkin (ST5)
            const _startTime = convertStringToDate(startTime)
            if (_startTime < Date.now()) {
                _status = {
                    code: 'ST5',
                    description: 'Không checkin',
                }
            }
            return _status

        case 'ST2':
            // Thời gian kết thúc bé hơn thời gian hệ thống -> Hoàn thành (ST4)
            const _endTime = convertStringToDate(endTime)
            if (_endTime < Date.now()) {
                _status = {
                    code: 'ST4',
                    description: 'Hoàn thành',
                }
            }

            return _status

        default:
            return _status
    }
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
            status,
            startTime,
            endTime,
            price,
        }) => ({
            key: _id,
            bookingDetailId: _id,
            pitchName,
            pitchTypeName,
            bookingTime: convertBookingToTime(startTime, endTime),
            status: handleStatus(startTime, endTime, status),
            price,
        })
    )

    return (
        <>
            {/* <h1>{`Số phiếu:  ${params.id}`}</h1> */}
            <DataTable
                dataSource={bookingDetails}
                columns={columns}
                isLoading={isLoading}
            />
        </>
    )
}

export default BookingDetail
