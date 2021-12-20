import React, { useContext, useState } from 'react'
import { Col, Card, Modal, notification } from 'antd'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import toCommas from '../../helpers/toCommas'
import FormTable from '../../components/FormTable'
import { OwnerContext } from '../../contexts/OwnerProvider'
import { getRangeTime } from '../../helpers/convert'
import * as services from '../../core/services/price'

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

const ModalStyled = styled(Modal)`
    overflow-y: initial !important;
    .ant-modal-body {
        max-height: calc(100vh - 200px);
        overflow-y: auto;
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

const columns = [
    {
        title: 'Từ',
        dataIndex: 'startTime',
        align: 'center',
    },
    {
        title: 'Đến',
        dataIndex: 'endTime',
        align: 'center',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        align: 'center',
        render: (price) => {
            return <b>{toCommas(price)}</b>
        },
    },
    // render: (key) => (
    //     <Space split={<Divider type="vertical" />}>
    //         <EditOutlined
    //             key="edit-price"
    //             title="Sửa"
    //             style={{
    //                 color: '#ababab',
    //             }}
    //             onClick={() => handleEditPrice(key)}
    //         />
    //         <DeleteOutlined
    //             key="delete-price"
    //             title="Xoá"
    //             style={{
    //                 color: '#ababab',
    //             }}
    //             onClick={() => handleDeletePrice(key)}
    //         />
    //     </Space>
    // ),
]

const checkRangeTime = (rangeTime, data) => {
    const operations = []
    rangeTime.forEach(() => {
        operations.push(false)
    })
    data.forEach(({ startTime, endTime }) => {
        const range = getRangeTime(startTime, endTime)

        //console.log(range)
        range.forEach((time) => {
            const index = rangeTime.indexOf(time)
            if (index !== -1) operations[index] = true
        })
    })
    console.log(operations)
    console.log(rangeTime, data)
    return operations.every((item) => {
        return item
    })
}

function CrudPrice({ prices = [], pitchTypeId = null }) {
    const [visible, setVisible] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const {
        state: {
            current: { branch },
        },
    } = useContext(OwnerContext)
    const [rangeTime, setRangeTime] = useState(() => {
        // kiem tra
        const start = (branch && branch.startTime) || '00:00'
        const end = (branch && branch.endTime) || '23:00'
        return getRangeTime(start, end)
    })
    const handleSubmitPrice = async (data) => {
        // kiem tra
        const rs = checkRangeTime(rangeTime, data)

        if (rs) {
            setConfirmLoading(true)
            // call api
            console.log(`call api`)
            const prices = data.map(({ startTime, endTime, price }) => ({
                startTime,
                endTime,
                price: price.toString(),
            }))
            const _data = await services.updatePrice(pitchTypeId, prices)
            console.log(_data)
            if (_data.success) {
                notification.success({
                    duration: 10,
                    description: _data.message,
                })
                window.location.reload()
            } else {
                notification.error({
                    duration: 10,
                    description: _data.message,
                })
            }
            setVisible(false)
        } else {
            notification.error({
                duration: 10,
                description: 'Vui lòng cập nhật tất cả thời gian còn lại!',
            })
        }
        setIsSubmit(false)
        setConfirmLoading(false)
    }
    return (
        <>
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
                            onClick={() => {
                                setVisible(true)
                            }}
                        />
                    }
                >
                    {renderPrice(prices)}
                </CardStyled>
            </Col>
            <ModalStyled
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={() => setIsSubmit(true)}
                onCancel={() => {
                    setVisible(false)
                    setIsSubmit(false)
                }}
            >
                <FormTable
                    columns={columns}
                    prices={prices}
                    rangeTime={rangeTime}
                    isSubmit={isSubmit}
                    onSubmit={handleSubmitPrice}
                />
            </ModalStyled>
        </>
    )
}

export default CrudPrice
