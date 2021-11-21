import React from 'react'
import { Layout } from 'antd'

import HeaderLayout from '../HeaderContent'
import Navigation from '../Navigation'

const { Content } = Layout

function DashboardLayout({ children }) {
    return (
        <>
            <Navigation />
            <Layout className="site-layout">
                <HeaderLayout />
                <Content
                    style={{
                        padding: '10px',
                        margin: '10px auto',
                        width: '100%',
                        maxWidth: '1100px',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </>
    )
}

export default DashboardLayout
