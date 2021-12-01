import React from 'react'
import { Row, Col } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'

const body = (
    <DashboardLayout>
        <Row gutter={16}>
            <Col span={24}>Dashboard</Col>
        </Row>
    </DashboardLayout>
)

function Dashboard() {
    return body
}

export default Dashboard
