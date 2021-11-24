import React, { useState } from 'react'
import { Row, Col, Tabs, Card, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import DashboardLayout from '../layout/DashboardLayout'

const { TabPane } = Tabs

const pitches = {
    san5: [
        {
            name: 'Sân bóng số 5-1',
            description: 'Đang hoạt động',
        },
        {
            name: 'Sân bóng số 5-2',
            description: 'Đang hoạt động',
        },
        {
            name: 'Sân bóng số 5-3',
            description: 'Đang hoạt động',
        },
        {
            name: 'Sân bóng số 5-4',
            description: 'Đang hoạt động',
        },
        {
            name: 'Sân bóng số 5-5',
            description: 'Đang hoạt động',
        },
        {
            name: 'Sân bóng số 5-6',
            description: 'Đang hoạt động',
        },
        {
            name: 'Sân bóng số 5-7',
            description: 'Đang hoạt động',
        },
    ],
    san7: [
        {
            name: 'Sân bóng số 7-1',
            description: 'Đang hoạt động',
        },
        {
            name: 'Sân bóng số 7-2',
            description: 'Đang hoạt động',
        },
    ],
}

const pitchTypes = [
    {
        key: 'san5',
        title: 'Sân 5 người',
        closeable: false,
    },
    {
        key: 'san7',
        title: 'Sân 7 người',
        closeable: false,
    },
]

const CardStyled = styled(Card)`
    .ant-card-actions {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }
`

function Pitch() {
    const [panes, setPanes] = useState(pitchTypes)
    const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false)
    const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false)

    // console.log(panes)

    const handleModalDelete = () => (
        <Modal
            title="Xoá sân bóng"
            okText="Đồng ý"
            cancelText="Huỷ bỏ"
            visible={isVisibleModalDelete}
            onOk={() => setIsVisibleModalDelete(false)}
            onCancel={() => setIsVisibleModalDelete(false)}
        >
            {'Hành động này sẽ không thể khôi phục'}
        </Modal>
    )

    const handleModalEdit = () => (
        <Modal
            title="Sửa thông tin sân bóng"
            okText="Lưu"
            cancelText="Huỷ bỏ"
            visible={isVisibleModalEdit}
            onOk={() => setIsVisibleModalEdit(false)}
            onCancel={() => setIsVisibleModalEdit(false)}
        >
            {'Thông tin sân bóng hiển thị ở đây'}
        </Modal>
    )

    const renderCard = (key) => (
        <Row gutter={[10]}>
            {pitches[key].map(({ name, description }) => (
                <Col span={6} style={{ margin: '6px 0' }}>
                    <CardStyled
                        style={{
                            textAlign: 'center',
                            borderRadius: 12,
                            minHeight: 150,
                        }}
                        hoverable
                        actions={[
                            <EditOutlined
                                key="edit"
                                title="Sửa thông tin sân"
                                onClick={() => setIsVisibleModalEdit(true)}
                            />,
                            <DeleteOutlined
                                key="delete"
                                title="Xoá sân này"
                                onClick={() => setIsVisibleModalDelete(true)}
                            />,
                        ]}
                    >
                        <h3>{name}</h3>

                        <p>{description}</p>
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
                title: 'Sân 11 người',
                key: 'san5',
            }
            panes.push(newTab)
            setPanes([...panes])
        },
    }

    const handleOnChange = (key) => {
        // console.log(key)
    }

    const handleOnEdit = (targetKey, action) => {
        //console.log(targetKey, action) // Action is remove or add
        actions[action](targetKey) // call function
    }

    return (
        <DashboardLayout>
            <Row gutter={[16]}>
                <Col span={24}>
                    <Tabs
                        defaultActiveKey="0"
                        size="large"
                        type="editable-card"
                        style={{ marginBottom: 16 }}
                        onChange={handleOnChange}
                        onEdit={handleOnEdit}
                    >
                        {panes.map(({ title, closeable, key }, index) => (
                            <TabPane
                                tab={title}
                                key={index}
                                closable={closeable}
                            >
                                {renderCard(key)}
                            </TabPane>
                        ))}
                    </Tabs>
                    {handleModalEdit()}
                    {handleModalDelete()}
                </Col>
            </Row>
        </DashboardLayout>
    )
}

export default Pitch
