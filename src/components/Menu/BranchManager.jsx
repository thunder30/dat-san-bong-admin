import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    DashboardOutlined,
    UserOutlined,
    CustomerServiceOutlined,
    TeamOutlined,
    BranchesOutlined,
    BarChartOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

export default function Manager() {
    const selected =
        window.location.pathname.slice(1, window.location.pathname.length) ||
        '/'
    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={[selected]}
            mode="inline"
            onClick={(e) => console.log(e)}
        >
            <Menu.Item key="/" icon={<DashboardOutlined />}>
                <Link to="/" />
                Dashboard
            </Menu.Item>
            <Menu.Item key="pitch" icon={<BarChartOutlined />}>
                <Link to="/pitch" />
                Quản lý sân bóng
            </Menu.Item>
        </Menu>
    )
}
