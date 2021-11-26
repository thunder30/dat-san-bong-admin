import React, { useContext } from 'react'
import { Row, Col, Empty } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'
import { OwnerContext } from '../contexts/OwnerProvider'
import SpinStyled from '../components/Spin'
import TabPitch from '../components/TabPitch'

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
            current: { pitchTypes },
        },
    } = useContext(OwnerContext)

    if (isLoading) {
        return <SpinStyled />
    }

    return (
        <DashboardLayout>
            <Row gutter={[16]}>
                <Col span={24}>
                    {!pitchTypes || pitchTypes.length === 0 ? (
                        <Empty />
                    ) : (
                        <TabPitch pitchTypes={pitchTypes || []} />
                    )}
                </Col>
            </Row>
        </DashboardLayout>
    )
}

export default Pitch
