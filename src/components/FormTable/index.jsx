import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, InputNumber, Popconfirm, Select, Table, Typography } from 'antd'

const FormStyled = styled(Form)`
    .editable-row .ant-form-item-explain {
        position: absolute;
        top: 100%;
        font-size: 12px;
    }
`

const SelectComponent = ({ data }) => {
    return (
        <Select>
            {data.map((time, index) => {
                return <Select.Option key={index}>{time}</Select.Option>
            })}
        </Select>
    )
}

const timeData = ['06:00', '06:30', '07:00', '07:30']

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode =
        inputType === 'select' ? (
            <SelectComponent data={timeData} />
        ) : (
            <InputNumber />
        )
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

const renderDataSource = (prices) => {
    return prices.map(({ time: { startTime, endTime }, price }, index) => ({
        key: index,
        startTime,
        endTime,
        price,
    }))
}

function FormTable({ columns, prices }) {
    const [form] = Form.useForm()
    const [data, setData] = useState(renderDataSource(prices))
    const [editingKey, setEditingKey] = useState('')

    const isEditing = (record) => record.key === editingKey

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        })
        console.log(record)
        setEditingKey(record.key)
    }

    const cancel = () => {
        setEditingKey('')
    }

    const save = async (key) => {
        try {
            const row = await form.validateFields()
            const newData = [...data]
            const index = newData.findIndex((item) => key === item.key)

            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, { ...item, ...row })
                setData(newData)
                setEditingKey('')
            } else {
                newData.push(row)
                setData(newData)
                setEditingKey('')
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    }

    columns = [
        ...columns.map((col) => ({ ...col, editable: true })),
        {
            title: '',
            dataIndex: 'key',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record)
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Lưu
                        </Typography.Link>
                        <Popconfirm title="Huỷ thao tác?" onConfirm={cancel()}>
                            <a>Huỷ bỏ</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ''}
                        onClick={() => edit(record)}
                    >
                        Sửa
                    </Typography.Link>
                )
            },
        },
    ]
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType:
                    col.dataIndex === 'startTime' || col.dataIndex === 'endTime'
                        ? 'select'
                        : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    return (
        <FormStyled form={form} component={false}>
            <Table
                size="small"
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </FormStyled>
    )
}

export default FormTable
