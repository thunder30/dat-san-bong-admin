import React, { useContext } from 'react'
import { Col, Row, Descriptions } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'
import { AuthContext } from '../contexts/AuthProvider'
import { convertDate } from '../helpers/convert'

const { Item } = Descriptions

function Profile() {
    const {
        authState: { user },
    } = useContext(AuthContext)

    return (
        <DashboardLayout>
            <Row gutter={16}>
                <Col span={24}>
                    <Descriptions title="Thông tin cá nhân">
                        <Item label="Id">{user._id}</Item>
                        <Item label="Email">{user.email}</Item>
                        <Item label="Họ tên">{`${user.firstName} ${user.lastName}`}</Item>
                        <Item label="Số điện thoại">
                            {user.phone || 'Chưa cập nhật'}
                        </Item>
                        <Item label="Ngày sinh">
                            {!user.birthday
                                ? 'Chưa cập nhật'
                                : convertDate(user.birthday)}
                        </Item>
                        <Item label="Giới tính">{user.sex}</Item>
                        <Item label="Địa chỉ">{`${user.address}, ${user.ward}, ${user.district}, ${user.province}`}</Item>
                    </Descriptions>
                </Col>
            </Row>
        </DashboardLayout>
    )
}

export default Profile
