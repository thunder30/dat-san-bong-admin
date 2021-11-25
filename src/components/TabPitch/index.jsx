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
`

function TabPitch({ pitchTypes }) {
    const [panes, setPanes] = useState(pitchTypes)
    const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false)
    const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false)

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

    const renderCard = (pitchs) => (
        <Row gutter={[10]}>
            {pitchs.map(({ displayName, description }, index) => (
                <Col span={8} style={{ margin: '6px 0' }} key={index}>
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
                        <h3>{displayName}</h3>

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
        <>
            <Tabs
                defaultActiveKey="0"
                size="large"
                type="editable-card"
                style={{ marginBottom: 16 }}
                onChange={handleOnChange}
                onEdit={handleOnEdit}
            >
                {panes.map(({ displayName, id, pitchs }) => (
                    <TabPane tab={displayName} key={id} closable={false}>
                        {renderCard(pitchs)}
                    </TabPane>
                ))}
            </Tabs>
            {handleModalEdit()}
            {handleModalDelete()}
        </>
    )
}

export default TabPitch
