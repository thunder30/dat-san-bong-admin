import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    DashboardOutlined,
    UserOutlined,
    FileDoneOutlined,
    TeamOutlined,
    BranchesOutlined,
    BarChartOutlined,
} from '@ant-design/icons'

export default function Manager() {
    const selected = window.location.pathname.slice(
        1,
        window.location.pathname.length
    )
    return (
        <Menu theme="dark" defaultSelectedKeys={[selected]} mode="inline">
            <Menu.Item key="admin" icon={<DashboardOutlined />}>
                <Link to="/admin" />
                Dashboard
            </Menu.Item>
            <Menu.Item key="admin/customer" icon={<UserOutlined />}>
                <Link to="/admin/customer" />
                Tài khoản khách hàng
            </Menu.Item>
            <Menu.Item key="admin/owner" icon={<TeamOutlined />}>
                <Link to="/admin/owner" />
                Tài khoản chủ sân
            </Menu.Item>
            <Menu.Item key="admin/branch" icon={<BranchesOutlined />}>
                <Link to="/admin/branch" />
                Chi nhánh sân bóng
            </Menu.Item>
            <Menu.Item key="admin/booking" icon={<FileDoneOutlined />}>
                <Link to="/admin/booking" />
                Phiếu đặt sân
            </Menu.Item>
            <Menu.Item key="admin/analytics" icon={<BarChartOutlined />}>
                <Link to="/admin/analytics" />
                Thống kê
            </Menu.Item>
        </Menu>
    )
}
