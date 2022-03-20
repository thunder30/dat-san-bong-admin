import React from 'react'
import { Table } from 'antd'

function DataTable({ columns, dataSource, isLoading, ...rest }) {
    const pagination = {
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: dataSource.length,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total}`,
    }

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            size="small"
            loading={isLoading}
            pagination={pagination}
        />
    )
}

export default DataTable
