import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, Row, Col, Form, Input, Button, notification } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import DataTable from '../../components/DataTable'
import { BookingContext } from '../../contexts/BookingProvider'
import { AuthContext } from '../../contexts/AuthProvider'
import toCommas from '../../helpers/toCommas'
import * as apiBooking from '../../core/services/booking'

const { Item } = Form

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
    const [form] = Form.useForm()
    const {
        bookingState: { bookings, isLoading },
    } = useContext(BookingContext)
    const {
        authState: { user },
    } = useContext(AuthContext)

    const [code, setCode] = useState('')
    console.log(`code checkin: `, code)
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

    const handleOnChange = (e) => {
        e.preventDefault()
        setCode(e.target.value)
    }

    const handleOnFinish = async ({ code }) => {
        console.log(code)
        form.resetFields()
        const data = await apiBooking.checkinBooking(code.trim())
        if (data.success) {
            notification.success({
                duration: 5,
                messsage: 'Checkin thành công!',
            })
        }
        setCode('')
    }

    return (
        <Row gutter={[16, 24]}>
            <Col span={24}>
                <Form
                    form={form}
                    initialValues={{
                        checkin: '',
                    }}
                    onFinish={handleOnFinish}
                >
                    <Row gutter={[8, 0]}>
                        <Col span={4}>
                            <Item
                                name={'code'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập trường này',
                                    },
                                ]}
                            >
                                <Input
                                    name="code"
                                    size="middle"
                                    value={code}
                                    onChange={handleOnChange}
                                    placeholder="Nhập code checkin"
                                />
                            </Item>
                        </Col>
                        <Col span={4}>
                            <Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="middle"
                                >
                                    Check in
                                </Button>
                            </Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={24}>
                <h1>{'Danh sách phiếu đặt sân'}</h1>
                <DataTable
                    columns={columnBookings}
                    dataSource={dataSource}
                    isLoading={isLoading}
                />
            </Col>
        </Row>
    )
}

export default CrudBranch
