import React from 'react'
import { Row, Col, Layout } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'

const { Content, Header } = Layout

const body = (
    <DashboardLayout>
        <Row gutter={[16, 16]}>
            <Col span={12}>col-1</Col>
            <Col span={12}>col-2</Col>
        </Row>
    </DashboardLayout>
)

function Dashboard() {
    return body
}

export default Dashboard
