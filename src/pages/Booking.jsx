import React from 'react'
import { Col, Row } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'

function Booking() {
    return (
        <DashboardLayout>
            <Row gutter={16}>
                <Col span={24}>Booking</Col>
            </Row>
        </DashboardLayout>
    )
}

export default Booking
