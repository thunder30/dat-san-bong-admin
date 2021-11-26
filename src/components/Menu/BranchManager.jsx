import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    DashboardOutlined,
    BookOutlined,
    LineChartOutlined,
    SisternodeOutlined,
    DollarCircleOutlined,
    SettingOutlined,
} from '@ant-design/icons'

export default function Manager() {
    const selected =
        window.location.pathname.slice(1, window.location.pathname.length) ||
        '/'
    return (
        <Menu theme="dark" defaultSelectedKeys={[selected]} mode="inline">
            <Menu.Item key="/" icon={<DashboardOutlined />}>
                <Link to="/" />
                Dashboard
            </Menu.Item>
            <Menu.Item key="pitch" icon={<SisternodeOutlined />}>
                <Link to="/pitch" />
                Quản lý sân bóng
            </Menu.Item>
            <Menu.Item key="booking" icon={<BookOutlined />}>
                <Link to="/booking" />
                Quản lý phiếu đặt
            </Menu.Item>
            <Menu.Item key="analytics" icon={<LineChartOutlined />}>
                <Link to="/analytics" />
                Thống kê
            </Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />}>
                <Link to="/setting" />
                Cài đặt
            </Menu.Item>
        </Menu>
    )
}
