import React, { useContext } from 'react'
import { Row, Col, Empty, Card, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import DashboardLayout from '../layout/DashboardLayout'
import { OwnerContext } from '../contexts/OwnerProvider'
import { convertDateTime } from '../helpers/convert'

const Content = ({
    phoneNumber,
    address,
    ward,
    district,
    province,
    description,
    startTime,
    endTime,
    isActived,
    createdAt,
}) => {
    return (
        <>
            <p>SĐT: {phoneNumber}</p>
            <p>Địa chỉ: {`${address}, ${ward}, ${district}, ${province}`}</p>
            <p>Mô tả: {description}</p>
            <p>Thời gian hoạt động: {`${startTime} - ${endTime}`}</p>
            <p>Trạng thái: {isActived ? 'Đang hoạt động' : 'Dừng hoạt động'}</p>
            <p>Tạo lúc: {convertDateTime(createdAt)}</p>
        </>
    )
}

function Setting() {
    const {
        state: { branches },
    } = useContext(OwnerContext)

    return (
        <DashboardLayout>
            <Row gutter={16}>
                {branches.length === 0 ? (
                    <Col span={24}>
                        <Empty />
                    </Col>
                ) : (
                    branches.map(({ _id, displayName, ...info }) => (
                        <Col span={8} key={_id}>
                            <Card
                                style={{ borderRadius: 12 }}
                                title={displayName}
                                extra={
                                    <Button
                                        type="link"
                                        onClick={() => console.log(`hi`)}
                                    >
                                        <EditOutlined
                                            key="edit"
                                            title="Sửa thông tin"
                                        />
                                    </Button>
                                }
                            >
                                <Content {...info} />
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </DashboardLayout>
    )
}

export default Setting
