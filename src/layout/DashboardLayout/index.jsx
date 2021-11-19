import React from 'react'
import { Layout } from 'antd'
import HeaderLayout from '../HeaderContent'

const { Content } = Layout

function DashboardLayout({ children }) {
    return (
        <Layout className="site-layout">
            <HeaderLayout />
            <Content
                style={{
                    padding: '30px 40px',
                    margin: '20px auto',
                    width: '100%',
                    maxWidth: '1100px',
                }}
            >
                {children}
            </Content>
        </Layout>
    )
}

export default DashboardLayout
