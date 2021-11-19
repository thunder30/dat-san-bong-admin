import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
    UserOutlined,
    BarChartOutlined,
    CustomerServiceOutlined,
    TeamOutlined,
    FileTextOutlined,
    DashboardOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

const { Sider } = Layout
const { SubMenu } = Menu

const LogoStyled = styled.div`
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
`

function Navigation() {
    const [collapse, setCollapse] = useState(false)

    const handleOnCollapse = (collapse) => {
        setCollapse(collapse)
    }
    return (
        <>
            <Sider
                collapsible
                collapsed={collapse}
                onCollapse={handleOnCollapse}
                style={{ zIndex: 1000 }}
            >
                <LogoStyled />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link to="/dashboard" />
                        Dashboard
                    </Menu.Item>
                    <SubMenu
                        key="subAccount"
                        title="Quản lý tài khoản"
                        icon={<UserOutlined />}
                    >
                        <Menu.Item key="2" icon={<CustomerServiceOutlined />}>
                            <Link to="/customer" />
                            Tài khoản khách hàng
                        </Menu.Item>
                        <Menu.Item key="3" icon={<TeamOutlined />}>
                            <Link to="/owner" />
                            Tài khoản chủ sân
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<FileTextOutlined />}>
                        <Link to="/branch" />
                        Chi nhánh sân bóng
                    </Menu.Item>
                    <Menu.Item key="5" icon={<BarChartOutlined />}>
                        <Link to="/analytics" />
                        Thống kê
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
}

export default Navigation
