import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Item } = Form
const { Text, Paragraph } = Typography

const WrapperStyled = styled.div`
    .register-form-button {
        width: 100%;
        margin: 12px 0;
    }
    .title {
        font-size: 1.75rem;
    }
    .desc {
        color: #b3b3b3;
        font-size: 1rem;
        margin-bottom: 1.3rem;
    }
`

const rulesEmail = [
    {
        required: true,
        message: 'Vui lòng nhập email!',
    },
    {
        type: 'email',
        message: 'Vui lòng nhập đúng email!',
    },
]

const rulesPassword = [
    {
        required: true,
        message: 'Vui lòng nhập mật khẩu!',
    },
    {
        pattern: /^(?=.*?[A-Z])/,
        message: 'Ít nhất 1 ký tự [A-Z]',
    },
    {
        pattern: /(?=.*?[a-z])/,
        message: 'Ít nhất 1 ký tự [a-z]',
    },
    {
        pattern: /(?=.*?[0-9])/,
        message: 'Ít nhất 1 ký tự số [0-9]',
    },
    {
        pattern: /(?=.*?[#?!@$ %^&*-])/,
        message: 'Ít nhất 1 ký tự đặc biệt [#?!@$ %^&*-]',
    },
    {
        pattern: /.{8,}$/,
        message: 'Mật khẩu tối thiểu 8 ký tự',
    },
]

const validateConfirm = ({ getFieldValue }) => ({
    validator(_, value) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
        }

        return Promise.reject(new Error('Xác nhận mật khẩu không đúng!'))
    },
})

function Register() {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log(values)
        form.resetFields()
    }

    return (
        <WrapperStyled>
            <div>
                <Text className="title">Đăng ký chủ sân</Text>
                <Paragraph className="desc">
                    Quản lý sân bóng của bạn một cách hiệu quả.
                </Paragraph>
            </div>

            <Form form={form} onFinish={onFinish}>
                <Item name="email" rules={rulesEmail}>
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        size="large"
                    />
                </Item>
                <Item name="password" rules={rulesPassword}>
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Mật khẩu"
                        size="large"
                    />
                </Item>
                <Item
                    name="confirm"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu!',
                        },
                        validateConfirm,
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Xác nhận mật khẩu"
                        size="large"
                    />
                </Item>

                <Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="register-form-button"
                        size="large"
                    >
                        Đăng ký
                    </Button>
                </Item>
            </Form>
            <Divider plain>
                Bạn đã có tài khoản?{' '}
                <Link to="/login" replace>
                    Đăng nhập
                </Link>
            </Divider>
        </WrapperStyled>
    )
}

export default Register
