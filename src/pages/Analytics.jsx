import React from 'react'
import { Row, Col } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'

function Analytics() {
    return (
        <DashboardLayout>
            <Row gutter={16}>
                <Col span={24}>Analytics</Col>
            </Row>
        </DashboardLayout>
    )
}

export default Analytics
