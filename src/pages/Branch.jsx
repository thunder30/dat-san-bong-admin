import React, { useContext } from 'react'
import { Table, Pagination, Space } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import DashboardLayout from '../layout/DashboardLayout'
import BranchProvider, { BranchContext } from '../contexts/BranchProvider'
import DataTable from '../components/DataTable'

const columns = [
    {
        title: 'Hoạt động',
        dataIndex: 'isActived',
        key: 'isActived',
        render: (isActived) => {
            return isActived ? 'Có' : 'Không'
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

const dataSource = [
    {
        key: '1',
        displayName: 'Sân ông Sáu',
        owner: 'Nguyễn Văn Sáu',
        phoneNumber: '0987868787',
        address: '02 Lê Quang Định',
        ward: 'Phường 12',
        district: 'Bình Thạnh',
        province: 'TP HCM',
        isActived: true,
    },
    {
        key: '2',
        displayName: 'Sân bóng hoàng gia bà Ba',
        owner: 'Nguyễn Thị Ba',
        phoneNumber: '0912435687',
        address: '123 Nguyễn Công Trứ',
        ward: 'Nguyễn Thái Bình',
        district: 'Quận 1',
        province: 'TP HCM',
        isActived: false,
    },
    {
        key: '3',
        displayName: 'Sân cỏ nhân tạo ông Năm',
        owner: 'Võ Văn Năm',
        phoneNumber: '0987654321',
        address: 'Đường số 5',
        ward: 'Tây hoà',
        district: 'Trảng Bom',
        province: 'Đồng Nai',
        isActived: true,
    },
    {
        key: '4',
        displayName: 'Sân cỏ ông Tám',
        owner: 'Nguyễn Văn Tám',
        phoneNumber: '0987654320',
        address: 'Đường số 6',
        ward: 'Tây hoà',
        district: 'Trảng Bom',
        province: 'Đồng Nai',
        isActived: true,
    },
    {
        key: '5',
        displayName: 'Sân cỏ nhân tạo bà Hai',
        owner: 'Võ Thị Hai',
        phoneNumber: '0945455454',
        address: 'Đường số 45',
        ward: 'Phường 14',
        district: 'Quận Gò Vấp',
        province: 'TP HCM',
    },
]

function Branch() {
    return (
        <DashboardLayout>
            <BranchProvider>
                <DataTable columns={columns} />
            </BranchProvider>
        </DashboardLayout>
    )
}

export default Branch
