import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Divider, Dropdown, Layout, Menu } from 'antd'
import { UserOutlined, LogoutOutlined, InfoOutlined } from '@ant-design/icons'
import avatar from '../../assets/auth/bg_1.jpg'

const { Header } = Layout
const { Item } = Menu

const menu = (
    <Menu>
        <Item key="1" icon={<InfoOutlined />}>
            Thông tin cá nhân
        </Item>
        <Item key="2" icon={<LogoutOutlined />}>
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
                <Avatar
                    icon={<UserOutlined />}
                    src={avatar}
                    size="large"
                    style={{ marginBottom: 15 }}
                />
            </Dropdown>
            <Divider style={{ minWidth: 0 }} />
        </Header>
    )
}

export default HeaderContent
