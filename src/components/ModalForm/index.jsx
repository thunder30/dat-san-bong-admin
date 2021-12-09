import React from 'react'
import { Modal, Form } from 'antd'

function ModalForm({ formElements, handleSubmit, ...props }) {
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
        >
            <Form {...layout} form={form} name="form_in_modal">
                {formElements}
            </Form>
        </Modal>
    )
}

export default ModalForm
