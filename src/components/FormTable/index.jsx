import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import {
    Form,
    InputNumber,
    Popconfirm,
    Select,
    Table,
    Typography,
    Space,
    Button,
} from 'antd'
import { timestrToSec } from '../../helpers/convert'

const FormStyled = styled(Form)`
    .editable-row .ant-form-item-explain {
        position: absolute;
        top: 100%;
        font-size: 12px;
    }
    .ant-form-item-explain {
        font-size: 12px !important;
    }
`

const SelectComponent = ({ data, current, onChange }) => {
    return (
        <Select defaultValue={''} onChange={onChange}>
            {data.map((time, index) => {
                return (
                    <Select.Option key={index} value={time}>
                        {time}
                    </Select.Option>
                )
            })}
        </Select>
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

const validate = ({ getFieldValue }, records) => ({
    validator(_, value) {
        // console.log(prevRecord)
        //console.log(value)
        if (!value.toString().trim()) return Promise.reject()
        console.log(records)
        switch (_.field) {
            case 'startTime':
                {
                    const startTime = timestrToSec(value)
                    const endTime = timestrToSec(getFieldValue('endTime'))

                    if (records.length > 0) {
                        const valid = records.every((item) => {
                            const start = timestrToSec(item.startTime)
                            const end = timestrToSec(item.endTime)
                            if (!endTime)
                                return !(startTime >= start && startTime < end)
                            return (
                                (startTime < start && endTime <= start) ||
                                (startTime >= end && endTime > end)
                            )
                        })
                        console.log(valid)
                        if (!valid) break
                    }
                    if (!endTime) return Promise.resolve()
                    if (startTime < endTime) return Promise.resolve()

                    // GOOD
                    // -----
                    // prev ->       [     ]
                    // current ->  [ ]
                    // -----
                    // prev ->       [     ]
                    // current ->          [   ]
                    // ----------------
                    // BAD
                    // -----
                    // prev ->       [     ]
                    // current ->  [   ]
                    // -----
                    // prev ->       [     ]
                    // current ->  [         ]
                    // -----
                }
                break
            case 'endTime':
                {
                    const endTime = timestrToSec(value)
                    const startTime = timestrToSec(getFieldValue('startTime'))

                    if (records.length > 0) {
                        const valid = records.every((item) => {
                            const start = timestrToSec(item.startTime)
                            const end = timestrToSec(item.endTime)
                            if (!startTime)
                                return !(endTime <= end && endTime > start)
                            return (
                                (startTime < start && endTime <= start) ||
                                (startTime >= end && endTime > end)
                            )
                        })
                        console.log(valid)
                        if (!valid) break
                    }
                    if (!startTime) return Promise.resolve()
                    if (endTime > startTime) return Promise.resolve()
                }
                break
            case 'price':
                return Promise.resolve()

            default:
                return Promise.resolve()
        }

        return Promise.reject(new Error('Thời gian không đúng!'))
    },
})

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    prevRecord = null,
    records,
    record,
    index,
    rangeTime,
    onChange,
    children,
    ...restProps
}) => {
    const inputNode =
        inputType === 'select' ? (
            <SelectComponent
                data={rangeTime}
                current={record[dataIndex]}
                onChange={onChange}
            />
        ) : (
            <InputNumber
                min={100000}
                max={10000000}
                step={10000}
                formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
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
                            message: `Vui lòng nhập ${title}`,
                        },
                        ({ getFieldValue }) => {
                            return validate({ getFieldValue }, records)
                        },
                        // dataIndex === 'price' && { type: 'number' },
                        // dataIndex === 'endTime' && validateTime,
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

const getOriginalData = (prices) => {
    return renderDataSource(prices).sort((a, b) => {
        // sort ascending
        return timestrToSec(a.startTime) - timestrToSec(b.startTime)
    })
}

function FormTable({ columns, prices, rangeTime, isSubmit, onSubmit }) {
    const [form] = Form.useForm()
    const [data, setData] = useState(getOriginalData(prices))
    const [editingKey, setEditingKey] = useState('')

    //console.log(editingKey)
    //console.log(branch)
    //console.log(rangeTime)

    //console.log(data)

    const isEditing = (record) => record.key === editingKey

    const add = () => {
        // Kiểm tra có còn thêm được khung giờ nào không
        const key = data.length
        const newData = {
            key,
            startTime: '',
            endTime: '',
            price: 100000,
        }
        setData([...data, newData])
        setEditingKey(key)
    }

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        })
        console.log(record)
        setEditingKey(record.key)
    }

    const handleDelete = (key) => {
        const newData = data.filter((item) => key !== item.key)
        setData([...newData])
    }
    const cancel = () => {
        form.resetFields()
        setEditingKey('')
        setData(() => {
            return data
                .sort((a, b) => {
                    // sort ascending
                    return timestrToSec(a.startTime) - timestrToSec(b.startTime)
                })
                .map((item, index) => {
                    return { ...item, key: index } // override key after sort
                })
                .filter((item) => item.startTime !== '' && item.endTime !== '')
        })
    }

    const save = async (key) => {
        try {
            const row = await form.validateFields()
            form.resetFields()
            //console.log(row)

            const newData = [...data]
            const index = newData.findIndex((item) => key === item.key)

            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, { ...item, ...row })
            } else {
                newData.push(row)
            }
            // sort

            setData(() => {
                return newData
                    .sort((a, b) => {
                        // sort ascending
                        return (
                            timestrToSec(a.startTime) -
                            timestrToSec(b.startTime)
                        )
                    })
                    .map((item, index) => {
                        return { ...item, key: index } // override key after sort
                    })
            })
            setEditingKey('')
            //setRangeTime(getRangeTime(branch.startTime, branch.endTime))
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    }

    const newColumns = [
        ...columns.map((col) => ({ ...col, editable: true, width: '25%' })),
        {
            title: '',
            dataIndex: 'actions',
            align: 'center',
            width: '25%',
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
                        <Popconfirm title="Huỷ thao tác?" onConfirm={cancel}>
                            <a>Huỷ bỏ</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space>
                        <Typography.Link
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            Sửa
                        </Typography.Link>
                        <Popconfirm
                            title="Xoá giá?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Typography.Link disabled={editingKey !== ''}>
                                Xoá
                            </Typography.Link>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]
    const mergedColumns = newColumns.map((col) => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: (record) => ({
                records: [
                    ...data.filter(
                        (item) => item.startTime !== '' && item.endTime !== ''
                    ),
                ],
                record,
                inputType:
                    col.dataIndex === 'startTime' || col.dataIndex === 'endTime'
                        ? 'select'
                        : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                rangeTime,
            }),
        }
    })

    useLayoutEffect(() => {
        if (isSubmit) {
            onSubmit(data)
        }
    }, [isSubmit])

    return (
        <FormStyled
            form={form}
            component={false}
            initialValues={{
                startTime: '',
                endTime: '',
                price: 100000,
            }}
        >
            <Button
                onClick={add}
                type="primary"
                disabled={editingKey !== ''}
                style={{
                    marginBottom: 16,
                }}
            >
                Thêm giá
            </Button>
            <Table
                style={{
                    marginTop: 20,
                }}
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
                pagination={false}
            />
        </FormStyled>
    )
}

export default FormTable
