import React from 'react'
import { Row, Col } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'

const body = (
    <DashboardLayout>
        <Row gutter={16}>
            <Col span={12}>col-1</Col>
            <Col span={12}>col-2</Col>
        </Row>
    </DashboardLayout>
)

function Dashboard() {
    return body
}

export default Dashboard
