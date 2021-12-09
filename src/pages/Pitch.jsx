import React, { useContext } from 'react'
import { Row, Col, Empty } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import DashboardLayout from '../layout/DashboardLayout'
import { OwnerContext } from '../contexts/OwnerProvider'
import TabPitch from '../components/TabPitch'
import Loading from '../components/Loading'

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

const pitchTypesDemo = [
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

function Pitch() {
    const {
        state: {
            isLoading,
            current: { pitchTypes, branch },
        },
    } = useContext(OwnerContext)

    console.log(pitchTypes, branch)

    const Body = () => {
        return !pitchTypes || pitchTypes.length === 0 ? (
            <Row>
                <Col span={6} style={{ textAlign: 'center' }}>
                    <PlusCircleOutlined
                        style={{ fontSize: 50, color: '#818181' }}
                        onClick={() => {
                            //setPitchType(pitchTypeId)
                            //setVisibleModalAddPitch(true)
                        }}
                    />
                    <h3>Tạo sân</h3>
                </Col>
                <Col span={18}>
                    <Empty />
                </Col>
            </Row>
        ) : (
            <TabPitch pitchTypes={pitchTypes || []} branch={branch} />
        )
    }

    return (
        <DashboardLayout>
            <Loading isLoading={isLoading}>
                <Row gutter={[8]}>
                    <Col className="gutter-row" span={24}>
                        <Body />
                    </Col>
                </Row>
            </Loading>
        </DashboardLayout>
    )
}

export default Pitch
