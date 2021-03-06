import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Typography,
    Row,
    Col,
    Image,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { AuthContext } from '../contexts/AuthProvider'
import landing from '../assets/auth/undraw_all_the_data_re_hh4w.svg'

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
    const { loginUser } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    const [remember, setRemember] = useState(false)
    const [form] = Form.useForm()

    // two ways binding
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

    // submit form
    const handleOnFinish = async () => {
        //console.log('Received value of form: ', values)
        // call api login
        await loginUser(loginForm)
    }

    return (
        <Row justify="center" align="middle">
            <Col xs={0} sm={0} md={{ span: 10, offset: 0 }}>
                <Image
                    preview={false}
                    width="100%"
                    src={landing}
                    alt="landing"
                />
            </Col>
            <Col xs={24} sm={{ span: 24 }} md={{ span: 8, offset: 2 }}>
                <WrapperStyled>
                    <div>
                        <TextStyled>
                            ????ng nh???p c??ng <Text strong>Pate Team</Text>{' '}
                        </TextStyled>
                        <ParagraphStyled>
                            Qu???n l?? s??n b??ng c???a b???n m???t c??ch hi???u qu???.
                        </ParagraphStyled>
                    </div>

                    <Form
                        name="normal_login"
                        form={form}
                        onFinish={handleOnFinish}
                    >
                        <Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Vui l??ng nh???p ????ng email!',
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
                                    message: 'Vui l??ng nh???p m???t kh???u!',
                                },
                            ]}
                        >
                            <Input.Password
                                name="password"
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                placeholder="M???t kh???u"
                                size="large"
                                value={loginForm.password}
                                onChange={handleUser}
                            />
                        </Item>

                        <Item>
                            <Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox
                                    name="remember"
                                    value={remember}
                                    onChange={handleRemember}
                                >
                                    Nh??? m???t kh???u
                                </Checkbox>
                            </Item>
                            <Link to="/forgot" className="login-form-forgot">
                                Qu??n m???t kh???u?
                            </Link>
                        </Item>

                        <Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                size="large"
                            >
                                ????ng nh???p
                            </Button>
                        </Item>
                    </Form>
                </WrapperStyled>{' '}
            </Col>
        </Row>
    )
}

export default Login
