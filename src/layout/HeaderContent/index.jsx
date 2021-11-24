import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Divider, Dropdown, Layout, Menu, Select } from 'antd'
import { UserOutlined, LogoutOutlined, InfoOutlined } from '@ant-design/icons'
import avatarMrsThree from '../../assets/icons/avatarMrsThree.svg'
import { AuthContext } from '../../contexts/AuthProvider'

const { Header } = Layout
const { Item } = Menu
const { Option } = Select

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

const handleOnChange = (value) => {
    console.log(value)
}

const SelectBranch = ({ branches }) => (
    <Select
        defaultValue="1"
        style={{ width: 200, marginBottom: 15, marginLeft: 30 }}
        onChange={handleOnChange}
        size="large"
        bordered={false}
    >
        <Option value="1">Chi nhánh 1</Option>
        <Option value="2">Chi nhánh 2</Option>
    </Select>
)

function HeaderContent() {
    const {
        authState: { user },
    } = useContext(AuthContext)

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                background: 'none',
            }}
        >
            <SelectBranch />
            <Dropdown
                overlay={() => DropdownMenu(user.isAdmin)}
                placement="bottomRight"
                arrow
            >
                <Avatar
                    icon={<UserOutlined />}
                    src={avatarMrsThree}
                    size="large"
                    style={{ marginBottom: 15 }}
                />
            </Dropdown>
            <Divider style={{ margin: 0 }} />
        </Header>
    )
}

export default HeaderContent
