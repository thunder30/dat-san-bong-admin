import React, { useState } from 'react'
import { Row, Col, Card, Modal, Tabs } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { TabPane } = Tabs

const CardStyled = styled(Card)`
    .ant-card-actions {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }
    .ant-card-body {
        padding: 16px;
    }
`

function TabPitch({ pitchTypes }) {
    const [panes, setPanes] = useState(pitchTypes)
    const [visibleModalDelete, setVisibleModalDelete] = useState(false)
    const [visibleModalEdit, setVisibleModalEdit] = useState(false)
    const [visibleModalEditPrice, setVisibleModalEditPrice] = useState(false)

    const handleModalDelete = () => (
        <Modal
            title="Xoá sân bóng"
            okText="Đồng ý"
            cancelText="Huỷ bỏ"
            visible={visibleModalDelete}
            onOk={() => setVisibleModalDelete(false)}
            onCancel={() => setVisibleModalDelete(false)}
        >
            {'Hành động này sẽ không thể khôi phục'}
        </Modal>
    )

    const handleModalEdit = () => (
        <Modal
            title="Sửa thông tin sân bóng"
            okText="Lưu"
            cancelText="Huỷ bỏ"
            visible={visibleModalEdit}
            onOk={() => setVisibleModalEdit(false)}
            onCancel={() => setVisibleModalEdit(false)}
        >
            {'Thông tin sân bóng hiển thị ở đây'}
        </Modal>
    )

    const handleModalEditPrice = () => (
        <Modal
            title="Sửa bảng giá"
            okText="Lưu"
            cancelText="Huỷ bỏ"
            visible={visibleModalEditPrice}
            onOk={() => setVisibleModalEditPrice(false)}
            onCancel={() => setVisibleModalEditPrice(false)}
        >
            {'Thông tin bảng giá hiển thị ở đây'}
        </Modal>
    )

    const renderCard = (pitchs) => (
        <Row gutter={[10]}>
            {pitchs.map(({ displayName, description }, index) => (
                <Col span={8} style={{ margin: '6px 0' }} key={index}>
                    <CardStyled
                        style={{
                            textAlign: 'center',
                            borderRadius: 12,
                        }}
                        hoverable
                        actions={[
                            <EditOutlined
                                key="edit"
                                title="Sửa thông tin sân"
                                onClick={() => setVisibleModalEdit(true)}
                            />,
                            <DeleteOutlined
                                key="delete"
                                title="Xoá sân này"
                                onClick={() => setVisibleModalDelete(true)}
                            />,
                        ]}
                    >
                        <h3>{displayName}</h3>

                        <p
                            style={{
                                minHeight: 50,
                            }}
                        >
                            {description}
                        </p>
                    </CardStyled>
                </Col>
            ))}
        </Row>
    )

    const actions = {
        remove(targetKey) {
            panes.splice(targetKey, 1)
            setPanes([...panes])
        },
        add() {
            // console.log(`Add new tab`)
            const newTab = {
                displayName: 'Sân 11 người',
                id: panes.length + 1,
                pitchs: [
                    {
                        displayName: 'Sân 11-1',
                        description: 'Sân bóng 11 người',
                    },
                    {
                        displayName: 'Sân 11-2',
                        description: 'Sân bóng 11 người',
                    },
                ],
                prices: [
                    {
                        time: {
                            startTime: '06:00',
                            endTime: '16:00',
                        },
                        price: 500000,
                    },
                    {
                        time: {
                            startTime: '16:00',
                            endTime: '20:00',
                        },
                        price: 1000000,
                    },
                    {
                        time: {
                            startTime: '20:00',
                            endTime: '23:00',
                        },
                        price: 700000,
                    },
                ],
            }
            panes.push(newTab)
            setPanes([...panes])
        },
    }

    const renderPrice = (prices) =>
        prices.map(({ time: { startTime, endTime }, price }, index) => (
            <p key={index}>
                {`${startTime} - ${endTime}`}
                {' || '}
                <span
                    style={{
                        fontWeight: 'bold',
                    }}
                >
                    {price}
                </span>{' '}
            </p>
        ))

    const handleEditPrice = () => {
        setVisibleModalEditPrice(true)
    }

    const handleOnChange = (key) => {
        // console.log(key)
    }

    const handleOnEdit = (targetKey, action) => {
        //console.log(targetKey, action) // Action is remove or add
        actions[action](targetKey) // call function
    }

    return (
        <>
            <Tabs
                defaultActiveKey="0"
                size="large"
                type="editable-card"
                style={{ marginBottom: 16 }}
                onChange={handleOnChange}
                onEdit={handleOnEdit}
            >
                {panes.map(({ displayName, id, pitchs, prices }) => (
                    <TabPane tab={displayName} key={id} closable={false}>
                        <Row gutter={[8]}>
                            <Col span={18}>{renderCard(pitchs)}</Col>
                            <Col span={6}>
                                <Card
                                    title="Bảng giá"
                                    style={{
                                        borderRadius: 12,
                                        minHeight: 200,
                                        backgroundColor: '#92e1a082', // #d5d5d5
                                    }}
                                    extra={
                                        <EditOutlined
                                            key="price"
                                            title="Sửa bảng giá"
                                            onClick={handleEditPrice}
                                        />
                                    }
                                >
                                    {renderPrice(prices)}
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                ))}
            </Tabs>
            {handleModalEdit()}
            {handleModalDelete()}
            {handleModalEditPrice()}
        </>
    )
}

export default TabPitch
