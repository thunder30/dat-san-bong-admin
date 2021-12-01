import React from 'react'
import { Table } from 'antd'

function DataTable({ columns, dataSource, isLoading }) {
    const pagination = {
        defaultCurrent: 1,
        defaultPageSize: 5,
        total: dataSource.length,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
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
