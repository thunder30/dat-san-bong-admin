import React, { useContext, useState } from 'react'
import { Col, Card, Modal, notification } from 'antd'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import toCommas from '../../helpers/toCommas'
import FormTable from '../../components/FormTable'
import { OwnerContext } from '../../contexts/OwnerProvider'
import { getRangeTime } from '../../helpers/convert'

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

function CrudPrice({ prices, pitchTypeId }) {
    const [visible, setVisible] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const {
        state: {
            current: { branch },
        },
    } = useContext(OwnerContext)
    const [rangeTime, setRangeTime] = useState(
        getRangeTime(branch.startTime, branch.endTime)
    )
    const handleSubmitPrice = (data) => {
        // kiem tra
        const rs = checkRangeTime(rangeTime, data)

        if (rs) {
            // call api
            console.log(`call api`)
            setVisible(false)
            setIsSubmit(false)
        } else {
            notification.error({
                duration: 10,
                description: 'Vui lòng cập nhật tất cả thời gian còn lại!',
            })
        }
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
