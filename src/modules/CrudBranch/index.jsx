import React, { useContext } from 'react'
import { Badge } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import DataTable from '../../components/DataTable'
import { BranchContext } from '../../contexts/BranchProvider'

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
        title: 'Tên sân',
        dataIndex: 'displayName',
        key: 'displayName',
    },
    {
        title: 'Chủ sân',
        dataIndex: 'owner',
        key: 'owner',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Địa chỉ sân bóng',
        children: [
            {
                title: 'Địa chỉ',
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
            <EyeOutlined title="Đến sân" onClick={() => console.log(key)} />
        ),
    },
]

function CrudBranch() {
    const {
        branchState: { branches, isLoading },
    } = useContext(BranchContext)

    const dataSource = branches.map(
        ({
            _id,
            displayName,
            owner: { firstName, lastName },
            phoneNumber,
            address,
            ward,
            district,
            province,
            isActived,
        }) => {
            return {
                key: _id,
                owner: `${firstName} ${lastName}`,
                displayName,
                phoneNumber,
                address,
                ward,
                district,
                province,
                isActived,
            }
        }
    )

    return (
        <DataTable
            columns={columns}
            dataSource={dataSource}
            isLoading={isLoading}
        />
    )
}

export default CrudBranch
