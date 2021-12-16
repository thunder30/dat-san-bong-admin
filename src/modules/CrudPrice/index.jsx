import React, { useState } from 'react'
import { Col, Card, Modal } from 'antd'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import toCommas from '../../helpers/toCommas'
import FormTable from '../../components/FormTable'

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

function CrudPrice({ prices }) {
    const [visible, setVisible] = useState(false)
    const handleSubmitPrice = () => {
        setVisible(false)
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
                            onClick={() => setVisible(true)}
                        />
                    }
                >
                    {renderPrice(prices)}
                </CardStyled>
            </Col>
            <ModalStyled
                visible={visible}
                onOk={handleSubmitPrice}
                onCancel={() => setVisible(false)}
            >
                <FormTable columns={columns} prices={prices} />
            </ModalStyled>
        </>
    )
}

export default CrudPrice
