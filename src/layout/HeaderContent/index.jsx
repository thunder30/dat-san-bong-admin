import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Dropdown, Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Item } = Menu

const menu = (
    <Menu>
        <Item key="1">Thông tin cá nhân</Item>
        <Item key="2">
            <Link to="/logout" />
            Đăng xuất
        </Item>
    </Menu>
)

function HeaderContent() {
    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                background: 'none',
            }}
        >
            <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Avatar icon={<UserOutlined />} />
            </Dropdown>
        </Header>
    )
}

export default HeaderContent
