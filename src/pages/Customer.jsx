import React from 'react'
import { Col, Row } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'

function Customer() {
    return (
        <DashboardLayout>
            <Row gutter={[16, 16]}>
                <Col span={12}>col-1 customer</Col>
                <Col span={12}>col-2 customer</Col>
            </Row>
        </DashboardLayout>
    )
}

export default Customer
