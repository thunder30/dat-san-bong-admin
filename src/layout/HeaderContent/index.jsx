import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Divider, Dropdown, Layout, Menu } from 'antd'
import { UserOutlined, LogoutOutlined, InfoOutlined } from '@ant-design/icons'
import avatarMrsThree from '../../assets/icons/avatarMrsThree.svg'
import { AuthContext } from '../../contexts/AuthProvider'
import SelectBranch from '../../components/SelectBranch'

const { Header } = Layout
const { Item } = Menu

const DropdownMenu = (isAdmin) => (
    <Menu>
        <Item key="profile" icon={<InfoOutlined />}>
            <Link to={isAdmin ? '/admin/profile' : '/profile'} />
            Thông tin cá nhân
        </Item>
        <Item key="logout" icon={<LogoutOutlined />}>
            <Link to="/logout" />
            Đăng xuất
        </Item>
    </Menu>
)

function HeaderContent() {
    const {
        authState: {
            user: { isAdmin, avatar },
        },
    } = useContext(AuthContext)

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                background: 'none',
            }}
        >
            {!isAdmin && <SelectBranch />}
            <Dropdown
                overlay={() => DropdownMenu(isAdmin)}
                placement="bottomRight"
                arrow
            >
                <Avatar
                    icon={<UserOutlined />}
                    src={avatar}
                    size="large"
                    style={{ marginBottom: 15 }}
                />
            </Dropdown>
            <Divider style={{ margin: 0 }} />
        </Header>
    )
}

export default HeaderContent
