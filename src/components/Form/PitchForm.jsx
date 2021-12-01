import React from 'react'
import { Form, Input } from 'antd'

const { Item } = Form

function PitchForm() {
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
                <Input />
            </Item>
            <Item label="Mô tả:" name="description">
                <Input />
            </Item>
        </>
    )
}

export default PitchForm
