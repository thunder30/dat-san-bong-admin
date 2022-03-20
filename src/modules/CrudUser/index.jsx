import React, { useContext } from 'react'
import { Badge, Menu, Dropdown, Table } from 'antd'
import {
    EllipsisOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import DataTable from '../../components/DataTable'
import { UserContext } from '../../contexts/UserProvider'

const { Item } = Menu

const menu = (key) => {
    return (
        <Menu>
            <Item
                key="0"
                icon={<EditOutlined />}
                onClick={() => console.log('Sửa - ', key)}
            >
                Sửa
            </Item>
            <Item
                key="1"
                icon={<DeleteOutlined />}
                onClick={() => console.log('Xoá - ', key)}
            >
                Xoá
            </Item>
        </Menu>
    )
}

const columns = [
    {
        title: 'Hoạt động',
        dataIndex: 'isActived',
        key: 'isActived',
        align: 'center',
        render: (isActived) => {
            const props = isActived
                ? { status: 'processing', color: 'green' }
                : { color: 'red' }
            return <Badge {...props} />
        },
    },
    {
        title: 'Họ tên',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email - b.email,
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'birthday',
        key: 'birthday',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Địa chỉ',
        children: [
            {
                title: 'Đường',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Xã, phường',
                dataIndex: 'ward',
                key: 'ward',
            },
            {
                title: 'Quận, huyện',
                dataIndex: 'district',
                key: 'district',
            },
            {
                title: 'Tỉnh, thành phố',
                dataIndex: 'province',
                key: 'province',
            },
        ],
    },
    {
        title: ' ',
        dataIndex: 'key',
        key: 'actions',
        align: 'center',
        width: 70,
        render: (key) => (
            <Dropdown overlay={() => menu(key)} arrow>
                <EllipsisOutlined />
            </Dropdown>
        ),
    },
]

function CrudUser({ role }) {
    const {
        state: { customers, owners, isLoading },
    } = useContext(UserContext)
    const user = { customers, owners }
    const title = {
        customers: 'Danh sách khách hàng',
        owners: 'Danh sách chủ sân',
    }
    const dataSource = user[role].map(
        ({
            _id,
            firstName,
            lastName,
            email,
            phone,
            birthday,
            address,
            ward,
            district,
            province,
            isActived,
        }) => ({
            key: _id,
            fullName: `${firstName} ${lastName}`,
            email,
            phone,
            birthday,
            address,
            ward,
            district,
            province,
            isActived,
        })
    )

    return (
        <>
            <h1>{title[role]}</h1>
            <Table
                columns={columns}
                dataSource={dataSource}
                isLoading={isLoading}
                size="small"
            />
        </>
    )
}

export default CrudUser
