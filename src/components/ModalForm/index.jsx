import React from 'react'
import { Modal, Form } from 'antd'

function ModalForm({ title, visible, onCancel, formElements, handleSubmit }) {
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
            title={title}
            visible={visible}
            okText="Thêm mới"
            cancelText="Huỷ bỏ"
            onCancel={onCancel}
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
