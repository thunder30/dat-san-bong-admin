import React, { useContext } from 'react'
import { Table } from 'antd'

import { BranchContext } from '../../contexts/BranchProvider'

function DataTable({ columns }) {
    const {
        branchState: { isLoading, branches },
    } = useContext(BranchContext)

    const dataSource = branches.map(
        ({
            displayName,
            owner,
            phoneNumber,
            address,
            ward,
            district,
            province,
            isActived,
        }) => {
            return {
                owner: owner._id,
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

    const pagination = {
        defaultCurrent: 1,
        defaultPageSize: 2,
        total: dataSource.length,
        showSizeChanger: true,
        pageSizeOptions: ['1', '2', '3'],
        showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
    }

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            size="small"
            loading={isLoading}
            pagination={pagination}
        ></Table>
    )
}

export default DataTable
