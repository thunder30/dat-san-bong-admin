import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Typography, Divider, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { AuthContext } from '../../contexts/AuthProvider'

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
`
const TextStyled = styled(Text)`
    font-size: 1.75rem;
`
const ParagraphStyled = styled(Paragraph)`
    color: #b3b3b3;
    font-size: 1rem;
    margin-bottom: 1.3rem;
`
function Login() {
    // Contexts
    const { login } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const [remember, setRemember] = useState(false)
    const [alert, setAlert] = useState(null)

    const handleUser = (e) => {
        e.preventDefault()
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleRemember = ({ target: { checked } }) => {
        setRemember(checked)
    }

    const [form] = Form.useForm()

    // submit form
    const handleOnFinish = async () => {
        //console.log('Received value of form: ', values)
        // call api login
        try {
            const data = await login(loginForm)
            if (!data.success) {
                // hien thi thong bao
                console.log(data.message)
                setAlert(data.message)
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <WrapperStyled>
            {alert && (
                <Alert
                    message={alert}
                    type="error"
                    showIcon
                    closable
                    afterClose={() => setAlert(null)}
                />
            )}
            <div>
                <TextStyled>
                    Đăng nhập cùng <Text strong>Pate Team</Text>{' '}
                </TextStyled>
                <ParagraphStyled>
                    Quản lý sân bóng của bạn một cách hiệu quả.
                </ParagraphStyled>
            </div>

            <Form name="normal_login" form={form} onFinish={handleOnFinish}>
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
                        name="email"
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        size="large"
                        value={loginForm.email}
                        onChange={handleUser}
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
                        name="password"
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Mật khẩu"
                        size="large"
                        value={loginForm.password}
                        onChange={handleUser}
                    />
                </Item>

                <Item>
                    <Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox
                            name="remember"
                            value={remember}
                            onChange={handleRemember}
                        >
                            Nhớ mật khẩu
                        </Checkbox>
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
