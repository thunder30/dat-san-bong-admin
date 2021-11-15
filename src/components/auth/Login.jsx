import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Item } = Form
const { Text, Paragraph } = Typography

const WrapperStyled = styled.div`
    .login-form-forgot {
        float: right;
        color: #b3b3b3;
        &:hover {
            text-decoration: underline;
        }
    }
    .login-form-button {
        width: 100%;
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

function Login() {
    const onFinish = (values) => {
        console.log('Received value of form: ', values)
    }

    return (
        <WrapperStyled>
            <div>
                <Text className="title">
                    Đăng nhập cùng <Text strong>Pate Team</Text>{' '}
                </Text>
                <Paragraph className="desc">
                    Quản lý sân bóng của bạn một cách hiệu quả.
                </Paragraph>
            </div>

            <Form
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                        {
                            type: 'email',
                            message: 'Vui lòng nhập đúng email!',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        size="large"
                    />
                </Item>
                <Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Mật khẩu"
                        size="large"
                    />
                </Item>

                <Item>
                    <Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Nhớ mật khẩu</Checkbox>
                    </Item>
                    <Link to="/forgot" className="login-form-forgot">
                        Quên mật khẩu?
                    </Link>
                </Item>

                <Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        size="large"
                    >
                        Đăng nhập
                    </Button>
                </Item>
            </Form>
            <Divider plain>
                Bạn chưa có tài khoản?{' '}
                <Link to="/register" replace>
                    Đăng ký
                </Link>
            </Divider>
        </WrapperStyled>
    )
}

export default Login
