import React, { useState } from 'react'
import { Col, Card, Modal, Table, Space, Divider } from 'antd'
import styled from 'styled-components'
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import toCommas from '../../helpers/toCommas'
import ModalForm from '../../components/ModalForm'

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

const renderDataSource = (prices) => {
    return prices.map(({ time: { startTime, endTime }, price }, index) => ({
        key: index,
        startTime,
        endTime,
        price,
    }))
}

function CrudPrice({ prices }) {
    const [visible, setVisible] = useState(false)
    const handleEditPrice = () => {
        setVisible(true)
    }
    const handleSubmitPrice = () => {
        setVisible(false)
    }
    //console.log(prices)
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
                            onClick={handleEditPrice}
                        />
                    }
                >
                    {renderPrice(prices)}
                </CardStyled>
            </Col>
            <Modal
                visible={visible}
                onOk={handleSubmitPrice}
                onCancel={() => setVisible(false)}
            >
                <Table
                    size="small"
                    columns={[
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
                        {
                            title: '',
                            dataIndex: 'key',
                            align: 'center',
                            render: (key) => (
                                <Space split={<Divider type="vertical" />}>
                                    <EditOutlined
                                        key="edit-price"
                                        title="Sửa"
                                        style={{
                                            color: '#ababab',
                                        }}
                                        onClick={() =>
                                            console.log(`Sửa dòng ${key}`)
                                        }
                                    />
                                    <DeleteOutlined
                                        key="delete-price"
                                        title="Xoá"
                                        style={{
                                            color: '#ababab',
                                        }}
                                        onClick={() =>
                                            console.log(`Xoá dòng ${key}`)
                                        }
                                    />
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={
                        // !prices || prices.length === 0 ? (
                        //     <PlusCircleOutlined
                        //         style={{
                        //             size: 30,
                        //             color: '#818181',
                        //         }}
                        //         onClick={() => console.log(`Tạo mới giá`)}
                        //     />
                        // ) : (
                        //     renderDataSource(prices)
                        // )
                        renderDataSource(prices)
                    }
                    pagination={false}
                />
            </Modal>
        </>
    )
}

export default CrudPrice
