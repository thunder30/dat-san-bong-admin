import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import {
    Form,
    InputNumber,
    Popconfirm,
    Select,
    Table,
    Typography,
    Input,
    Button,
} from 'antd'
import { OwnerContext } from '../../contexts/OwnerProvider'
import { getRangeTime, timestrToSec } from '../../helpers/convert'

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
        <Select defaultValue={current} onChange={onChange}>
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

const timeData = ['06:00', '06:30', '07:00', '07:30']

const renderDataSource = (prices) => {
    return prices.map(({ time: { startTime, endTime }, price }, index) => ({
        key: index,
        startTime,
        endTime,
        price,
    }))
}
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
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
                            message: `Vui lòng nhập ${title}`,
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

function FormTable({ columns, prices }) {
    const {
        state: {
            current: { branch },
        },
    } = useContext(OwnerContext)
    const [form] = Form.useForm()
    const [data, setData] = useState(
        renderDataSource(prices).sort((a, b) => {
            // sort ascending
            return timestrToSec(a.startTime) - timestrToSec(b.startTime)
        })
    )
    const [editingKey, setEditingKey] = useState('')
    const [rangeTime, setRangeTime] = useState(
        getRangeTime(branch.startTime, branch.endTime)
    )

    //console.log(editingKey)
    console.log(branch)
    //console.log(rangeTime)

    const isEditing = (record) => record.key === editingKey

    console.log(data)
    const add = () => {
        // Kiểm tra có còn thêm được khung giờ nào không
        const key = data.length
        const newData = {
            key,
            startTime: rangeTime[0],
            endTime: rangeTime[rangeTime.length - 1],
            price: 0,
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

    const cancel = () => {
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
        })
    }

    const save = async (key) => {
        try {
            const row = await form.validateFields()
            console.log(row)
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
    const mergedColumns = newColumns.map((col) => {
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
                rangeTime,
            }),
        }
    })

    return (
        <FormStyled form={form} component={false}>
            <Button
                onClick={add}
                type="primary"
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
