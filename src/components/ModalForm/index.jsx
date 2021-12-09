import React from 'react'
import { Modal, Form } from 'antd'

function ModalForm({ children, handleSubmit, onCancel, ...props }) {
    const [form] = Form.useForm()
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
        },
    }
    return (
        <Modal
            {...props}
            onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields()
                    handleSubmit(values)
                })
            }}
            onCancel={() => {
                form.resetFields()
                onCancel()
            }}
        >
            <Form {...layout} form={form} name="form_in_modal">
                {children}
            </Form>
        </Modal>
    )
}

export default ModalForm
