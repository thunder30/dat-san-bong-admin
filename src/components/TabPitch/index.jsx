import React, { useState } from 'react'
import { Row, Col, Card, Modal, Tabs, Switch, notification } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

import * as apiPitch from '../../core/services/pitch'
import ModalForm from '../ModalForm'
import PitchForm from '../Form/PitchForm'
import PitchTypeForm from '../Form/PitchTypeForm'
import CrudPrice from '../../modules/CrudPrice'

const { TabPane } = Tabs

// console.log(`Add new tab`)
// const newTab = {
//     displayName: 'Sân 11 người',
//     id: `pitchType-${panes.length + 1}`,
//     pitches: [
//         {
//             displayName: 'Sân 11-1',
//             description: 'Sân bóng 11 người',
//         },
//         {
//             displayName: 'Sân 11-2',
//             description: 'Sân bóng 11 người',
//         },
//     ],
//     prices: [
//         {
//             time: {
//                 startTime: '06:00',
//                 endTime: '16:00',
//             },
//             price: 500000,
//         },
//         {
//             time: {
//                 startTime: '16:00',
//                 endTime: '20:00',
//             },
//             price: 1000000,
//         },
//         {
//             time: {
//                 startTime: '20:00',
//                 endTime: '23:00',
//             },
//             price: 700000,
//         },
//     ],
// }

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

const handleModalDeletePitch = (visible, onOk, onCancel) => (
    <Modal
        title="Xoá sân bóng"
        okText="Đồng ý"
        cancelText="Huỷ bỏ"
        visible={visible}
        onOk={() => onOk()}
        onCancel={() => onCancel()}
    >
        {'Hành động này sẽ không thể khôi phục'}
    </Modal>
)

const handleModalDeletePitchType = (visible, onOk, onCancel) => (
    <Modal
        title="Xoá loại sân"
        okText="Đồng ý"
        cancelText="Huỷ bỏ"
        visible={visible}
        onOk={() => onOk()}
        onCancel={() => onCancel()}
    >
        {'Hành động này sẽ không thể khôi phục'}
    </Modal>
)

const handleModalEditPrice = (visible, onOk, onCancel) => (
    <Modal
        title="Sửa bảng giá"
        okText="Lưu"
        cancelText="Huỷ bỏ"
        visible={visible}
        onOk={() => onOk}
        onCancel={() => onCancel}
    >
        {'Thông tin bảng giá hiển thị ở đây'}
    </Modal>
)

function TabPitch({ pitchTypes, branch }) {
    const [panes, setPanes] = useState(pitchTypes)
    const [currentPitchType, setCurrentPitchType] = useState(pitchTypes[0])
    const [pitchType, setPitchType] = useState({
        _id: pitchTypes[0]._id,
        displayName: pitchTypes[0].displayName,
        description: pitchTypes[0].description,
    })
    const [pitch, setPitch] = useState({
        _id: '',
        displayName: '',
        description: '',
    })
    const [visibleModalDeletePitch, setVisibleModalDeletePitch] =
        useState(false)
    const [visibleModalEditPitch, setVisibleModalEditPitch] = useState(false)
    const [visibleModalAddPitch, setVisibleModalAddPitch] = useState(false)

    const [visibleModalDeletePitchType, setVisibleModalDeletePitchType] =
        useState(false)
    const [visibleModalEditPitchType, setVisibleModalEditPitchType] =
        useState(false)
    const [visibleModalAddPitchType, setVisibleModalAddPitchType] =
        useState(false)

    const [visibleModalEditPrice, setVisibleModalEditPrice] = useState(false)

    // console.log(currentPitchType)
    //console.log(pitchType)
    //console.log(pitch)

    const handleActivePitch = async (pitchTypeId, pitchId, checked) => {
        // call api update pitch
        console.log(`change active pitch ${pitchId} - ${checked}`)
        const pitch = {
            _id: pitchId,
            isActive: checked,
        }
        const data = await apiPitch.updatePitch(pitch)
        if (data.success) {
            const pitchType = panes.find(({ _id }) => _id === pitchTypeId)
            const pitchIndex = pitchType.pitches.findIndex(
                ({ _id }) => _id === pitchId
            )
            pitchType.pitches[pitchIndex] = {
                ...pitchType.pitches[pitchIndex],
                isActive: checked,
            }
            setPitch({ ...pitch })
        }
        //console.log(data)
    }

    const renderCard = (pitchTypeId, pitches) => (
        <Row gutter={[10]}>
            {pitches.map(
                ({ _id, displayName, description, isActive }, index) => (
                    <Col
                        className="gutter-row"
                        span={8}
                        key={_id}
                        style={{ margin: '6px 0' }}
                    >
                        <CardStyled
                            hoverable
                            style={
                                !isActive
                                    ? {
                                          backgroundColor: '#c3c3c3',
                                          filter: 'opacity(0.5)',
                                      }
                                    : {}
                            }
                            actions={[
                                <EditOutlined
                                    key="edit"
                                    title="Sửa thông tin sân"
                                    onClick={() => {
                                        setVisibleModalEditPitch(true)
                                        setPitch({
                                            _id,
                                            displayName,
                                            description,
                                        })
                                    }}
                                />,
                                <DeleteOutlined
                                    key="delete"
                                    title="Xoá sân này"
                                    onClick={() => {
                                        setVisibleModalDeletePitch(true)
                                        setPitch({
                                            _id,
                                            displayName,
                                            description,
                                        })
                                    }}
                                />,
                            ]}
                            extra={
                                <Switch
                                    defaultChecked={isActive}
                                    onChange={(checked) => {
                                        handleActivePitch(
                                            pitchTypeId,
                                            _id,
                                            checked
                                        )
                                    }}
                                />
                            }
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
                )
            )}
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
                                //setPitchType(pitchTypeId)
                                setVisibleModalAddPitch(true)
                            }}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )

    const handleEditPrice = () => {
        setVisibleModalEditPrice(true)
    }

    // ============================================ CUD PITCH ============================================
    /**
     * @desciption Xoá sân
     */
    const handleDeletePitch = async () => {
        console.log(`Xoá ${pitch._id} của loại sân ${pitchType._id}`)
        const data = await apiPitch.deletePitch(pitch._id)
        if (data.success) {
            notification.success({
                duration: 5,
                message: data.message,
            })

            const _pitchType = panes.find(({ _id }) => _id === pitchType._id)

            if (_pitchType) {
                const pitches = _pitchType.pitches
                const index = pitches.findIndex(({ _id }) => _id === pitch._id)
                if (index !== -1) pitches.splice(index, 1)
                //setPanes([...panes])
                setPitch(null)
            }
        }
        setVisibleModalDeletePitch(false)
    }

    /**
     *
     * @param {*} pitchTypeId
     * @description Thêm sân theo loại sân: OpenModal -> Input -> Submit -> CloseModal -> re-render state
     */
    const handleSubmitAddPitch = async () => {
        // call api
        const data = await apiPitch.createPitch({
            displayName: pitch.displayName,
            description: pitch.description,
            pitchType: pitchType._id,
        })
        console.log(`create pitch: `, data)
        if (data.success) {
            notification.success({
                duration: 5,
                message: data.message,
            })
            const _pitchType = panes.find(({ _id }) => _id === pitchType._id)
            if (_pitchType) {
                if (_pitchType.pitches) {
                    _pitchType.pitches.push(data.pitch)
                } else {
                    _pitchType.pitches = [data.pitch]
                }

                console.log(_pitchType)
                setPanes([...panes])
            }
        }
        setVisibleModalAddPitch(false)
    }

    /**
     *
     * @param {*} param0
     * @description two ways binding form và thay đổi dữ liệu
     */
    const handleSubmitEditPitch = async () => {
        // update pitch
        console.log(`dữ liệu cần cập nhật là: `, pitch)
        const data = await apiPitch.updatePitch({
            ...pitch,
            pitchType: pitchType._id,
        })

        if (data.success) {
            notification.success({
                duration: 5,
                message: data.message,
            })
            const _pitchType = panes.find(({ _id }) => _id === pitchType._id)
            if (_pitchType) {
                const pitches = _pitchType.pitches
                const index = pitches.findIndex(({ _id }) => _id === pitch._id)
                pitches[index] = {
                    ...pitches[index],
                    ...pitch,
                }
                setPanes([...panes])
            }
        }
        setVisibleModalEditPitch(false)
    }

    const handleOnChangePitchForm = (e) => {
        e.preventDefault()
        setPitch({
            ...pitch,
            [e.target.name]: e.target.value,
        })
    }

    // ============================================ CUD PITCH TYPE ============================================

    const handleDeletePitchType = async (
        pitchTypeId = currentPitchType._id
    ) => {
        console.log(`Loại sân ${pitchType._id}`)
        const data = await apiPitch.deletePitchType(pitchTypeId)
        if (data.success) {
            notification.success({
                duration: 5,
                message: data.message,
            })

            const index = panes.findIndex(({ _id }) => _id === pitchTypeId)
            if (index !== -1) panes.splice(index, 1)
            setPanes([...panes])
        }
        setVisibleModalDeletePitchType(false)
    }

    const handleSubmitAddPitchType = async () => {
        const data = await apiPitch.createPitchType({
            displayName: pitchType.displayName,
            description: pitchType.description,
            pitchBranch: branch._id,
        })
        console.log(`create pitch type: `, data)
        if (data.success) {
            notification.success({
                duration: 5,
                message: data.message,
            })
            const { _id, displayName, description } = data.pitchType
            setPitchType({ _id, displayName, description })
            setPanes([...panes, data.pitchType])
        }
        setVisibleModalAddPitchType(false)
    }

    const actions = {
        remove(key) {
            setVisibleModalDeletePitchType(true)
        },
        add() {
            // hien thi form
            setVisibleModalAddPitchType(true)
        },
    }

    // two ways binding
    const handleOnChangePitchTypeForm = (e) => {
        e.preventDefault()
        setPitchType({
            ...pitchType,
            [e.target.name]: e.target.value,
        })
    }

    /**
     *
     * @param {*} key
     * @description Thay đổi pitchTypeId khi chuyển tab
     */
    const handleOnChangeTab = (key) => {
        console.log(key)
        setCurrentPitchType(() => {
            return panes.find(({ _id }) => _id === key)
        })
    }

    const handleOnEditTab = (targetKey, action) => {
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
                onChange={handleOnChangeTab}
                onEdit={handleOnEditTab}
            >
                {panes.map(
                    ({ _id, displayName, pitches = [], prices = [] }) => (
                        <TabPane tab={displayName} key={_id} closable={true}>
                            <Row gutter={[10]}>
                                <Col className="gutter-row" span={18}>
                                    {renderCard(_id, pitches)}
                                </Col>
                                <CrudPrice prices={prices} />
                            </Row>
                        </TabPane>
                    )
                )}
            </Tabs>
            {handleModalEditPrice()}
            {handleModalDeletePitch(
                visibleModalDeletePitch,
                handleDeletePitch,
                () => setVisibleModalDeletePitch(false)
            )}
            <ModalForm
                title="Thêm sân bóng"
                okText="Thêm mới"
                cancelText="Huỷ bỏ"
                visible={visibleModalAddPitch}
                handleSubmit={handleSubmitAddPitch}
                onCancel={() => setVisibleModalAddPitch(false)}
            >
                <PitchForm
                    key={'pitch-form'}
                    value={pitch}
                    onChange={handleOnChangePitchForm}
                />
            </ModalForm>
            <ModalForm
                title="Sửa sân bóng"
                okText="Lưu"
                cancelText="Huỷ bỏ"
                visible={visibleModalEditPitch}
                handleSubmit={handleSubmitEditPitch}
                onCancel={() => setVisibleModalEditPitch(false)}
            >
                <PitchForm
                    key={'pitch-form'}
                    value={pitch}
                    onChange={handleOnChangePitchForm}
                />
            </ModalForm>

            {handleModalDeletePitchType(
                visibleModalDeletePitchType,
                handleDeletePitchType,
                () => setVisibleModalDeletePitchType(false)
            )}
            <ModalForm
                title="Thêm loại sân"
                okText="Thêm mới"
                cancelText="Huỷ bỏ"
                visible={visibleModalAddPitchType}
                handleSubmit={handleSubmitAddPitchType}
                onCancel={() => setVisibleModalAddPitchType(false)}
            >
                <PitchTypeForm
                    key={'pitch-type-form'}
                    value={pitchType}
                    onChange={handleOnChangePitchTypeForm}
                />
            </ModalForm>
        </>
    )
}

export default TabPitch
