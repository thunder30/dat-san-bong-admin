import { Badge } from 'antd'
import React, { useContext } from 'react'
import DataTable from '../../components/DataTable'
import { UserContext } from '../../contexts/UserProvider'

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
]

function CrudUser({ role }) {
    const {
        state: { customers, owners, isLoading },
    } = useContext(UserContext)
    const user = { customers, owners }
    const dataSource = user[role].map(
        ({
            _id,
            firstName,
            lastName,
            email,
            phone,
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
            address,
            ward,
            district,
            province,
            isActived,
        })
    )

    return (
        <DataTable
            columns={columns}
            dataSource={dataSource}
            isLoading={isLoading}
        />
    )
}

export default CrudUser
