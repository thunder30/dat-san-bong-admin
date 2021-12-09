import React from 'react'
import { Form, Input } from 'antd'

const { Item } = Form

function PitchForm({ value = { displayName: '', description: '' }, onChange }) {
    return (
        <>
            <Item
                label="Tên sân:"
                name="displayName"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập thông tin này',
                    },
                ]}
            >
                <Input
                    name="displayName"
                    value={value.displayName}
                    onChange={onChange}
                />
            </Item>
            <Item label="Mô tả:" name="description">
                <Input
                    name="description"
                    value={value.description}
                    onChange={onChange}
                />
            </Item>
        </>
    )
}

export default PitchForm
