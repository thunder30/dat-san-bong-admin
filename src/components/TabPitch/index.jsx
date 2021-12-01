import React, { useState } from 'react'
import { Row, Col, Card, Modal, Tabs } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

import ModalForm from '../ModalForm'
import PitchForm from '../Form/PitchForm'
import toCommas from '../../helpers/toCommas'

const { TabPane } = Tabs

const CardStyled = styled(Card)`
    text-align: center;
    border-radius: 12px;

    .ant-card-actions {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }
    .ant-card-body {
        padding: 16px;
    }
`

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
                {toCommas(price)}
            </span>{' '}
        </p>
    ))

function TabPitch({ pitchTypes }) {
    const [panes, setPanes] = useState(pitchTypes)
    const [pitchTypeId, setPitchTypeId] = useState(null)
    const [visibleModalDelete, setVisibleModalDelete] = useState(false)
    const [visibleModalEdit, setVisibleModalEdit] = useState(false)
    const [visibleModalAddPitch, setVisibleModalAddPitch] = useState(false)
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

    /**
     *
     * @param {*} pitchTypeId
     * @description Thêm sân theo loại sân: OpenModal -> Input -> Submit -> CloseModal -> re-render state
     */
    const handleAddPitch = ({ displayName, description }) => {
        // info pitch
        const pitch = {
            displayName,
            description,
        }

        const pitchType = panes.find(
            (pitchType) => pitchType.id === pitchTypeId
        )
        //console.log(pitchType)

        if (pitchType) {
            pitchType.pitchs.push({
                ...pitch,
                _id: pitchType.pitchs.length + 1,
            })
            setPanes([...panes])
        }
        setVisibleModalAddPitch(false)
    }

    const renderCard = (pitchTypeId, pitchs) => (
        <Row gutter={[10]}>
            {pitchs.map(({ displayName, description }, index) => (
                <Col
                    className="gutter-row"
                    span={8}
                    key={index}
                    style={{ margin: '6px 0' }}
                >
                    <CardStyled
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
            {/* Icon thêm sân */}
            <Col
                span={8}
                key="plus-pitch"
                style={{
                    minHeight: 180,
                }}
            >
                <Row justify="center" align="middle" style={{ height: '100%' }}>
                    <Col>
                        <PlusCircleOutlined
                            style={{ fontSize: 50, color: '#818181' }}
                            onClick={() => {
                                setPitchTypeId(pitchTypeId)
                                setVisibleModalAddPitch(true)
                            }}
                        />
                    </Col>
                </Row>
            </Col>
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
                id: `pitchType-${panes.length + 1}`,
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

    const handleEditPrice = () => {
        setVisibleModalEditPrice(true)
    }

    const handleOnChange = (key) => {
        console.log(key)
    }

    const handleOnEdit = (targetKey, action) => {
        //console.log(targetKey, action) // Action is remove or add
        actions[action](targetKey) // call function
        console.log(action, targetKey)
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
                {panes.map(
                    ({ displayName, id: pitchTypeId, pitchs, prices }) => (
                        <TabPane
                            tab={displayName}
                            key={pitchTypeId}
                            closable={true}
                        >
                            <Row gutter={[10]}>
                                <Col className="gutter-row" span={18}>
                                    {renderCard(pitchTypeId, pitchs)}
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <CardStyled
                                        title="Bảng giá"
                                        style={{
                                            minHeight: 200,
                                            backgroundColor: '#92e1a082', // #d5d5d5
                                            marginTop: 6,
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
                                    </CardStyled>
                                </Col>
                            </Row>
                        </TabPane>
                    )
                )}
            </Tabs>
            {handleModalEdit()}
            {handleModalDelete()}
            {handleModalEditPrice()}
            <ModalForm
                title="Thêm sân bóng"
                visible={visibleModalAddPitch}
                handleSubmit={handleAddPitch}
                onCancel={() => setVisibleModalAddPitch(false)}
                formElements={PitchForm}
            />
        </>
    )
}

export default TabPitch
