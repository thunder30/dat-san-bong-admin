import React from 'react'
import { Table, Pagination, Space } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import DashboardLayout from '../layout/DashboardLayout'

const columns = [
    {
        title: 'Hoạt động',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive) => {
            return isActive ? 'Có' : 'Không'
        },
    },
    {
        title: 'Tên sân',
        dataIndex: 'branchName',
        key: 'branchName',
    },
    {
        title: 'Chủ sân',
        dataIndex: 'owner',
        key: 'owner',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
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
        branchName: 'Sân ông Sáu',
        owner: 'Nguyễn Văn Sáu',
        phone: '0987868787',
        address: '02 Lê Quang Định',
        ward: 'Phường 12',
        district: 'Bình Thạnh',
        province: 'TP HCM',
        isActive: true,
    },
    {
        key: '2',
        branchName: 'Sân bóng hoàng gia bà Ba',
        owner: 'Nguyễn Thị Ba',
        phone: '0912435687',
        address: '123 Nguyễn Công Trứ',
        ward: 'Nguyễn Thái Bình',
        district: 'Quận 1',
        province: 'TP HCM',
        isActive: false,
    },
    {
        key: '3',
        branchName: 'Sân cỏ nhân tạo ông Năm',
        owner: 'Võ Văn Năm',
        phone: '0987654321',
        address: 'Đường số 5',
        ward: 'Tây hoà',
        district: 'Trảng Bom',
        province: 'Đồng Nai',
        isActive: true,
    },
    {
        key: '4',
        branchName: 'Sân cỏ ông Tám',
        owner: 'Nguyễn Văn Tám',
        phone: '0987654320',
        address: 'Đường số 6',
        ward: 'Tây hoà',
        district: 'Trảng Bom',
        province: 'Đồng Nai',
        isActive: true,
    },
    {
        key: '5',
        branchName: 'Sân cỏ nhân tạo bà Hai',
        owner: 'Võ Thị Hai',
        phone: '0945455454',
        address: 'Đường số 45',
        ward: 'Phường 14',
        district: 'Quận Gò Vấp',
        province: 'TP HCM',
    },
]

function Branch() {
    return (
        <DashboardLayout>
            <Table
                dataSource={dataSource}
                columns={columns}
                size="small"
                pagination={{
                    defaultCurrent: 1,
                    defaultPageSize: 2,
                    total: dataSource.length,
                    showSizeChanger: true,
                    pageSizeOptions: ['1', '2', '3'],
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
            ></Table>
        </DashboardLayout>
    )
}

export default Branch
