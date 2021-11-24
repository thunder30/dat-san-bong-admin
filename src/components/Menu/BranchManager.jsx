import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    DashboardOutlined,
    BookOutlined,
    LineChartOutlined,
    SisternodeOutlined,
    DollarCircleOutlined,
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
            <Menu.Item key="pitch" icon={<SisternodeOutlined />}>
                <Link to="/pitch" />
                Quản lý sân bóng
            </Menu.Item>
            <Menu.Item key="price" icon={<DollarCircleOutlined />}>
                <Link to="/price" />
                Quản lý khung giá
            </Menu.Item>
            <Menu.Item key="booking" icon={<BookOutlined />}>
                <Link to="/booking" />
                Quản lý phiếu đặt
            </Menu.Item>
            <Menu.Item key="analytics" icon={<LineChartOutlined />}>
                <Link to="/analytics" />
                Thống kê
            </Menu.Item>
        </Menu>
    )
}
