import React from 'react'
import { Row, Col, Tabs } from 'antd'
import DashboardLayout from '../layout/DashboardLayout'

const { TabPane } = Tabs

function Price() {
    return (
        <DashboardLayout>
            <Row gutter={[16]}>
                <Col span={24}>
                    Price
                    {/* <Tabs
                        size="large"
                        type="editable-card"
                        style={{ marginBottom: 16 }}
                        onChange={handleOnChange}
                        onEdit={handleOnEdit}
                    >
                        {panes.map(({ displayName, id, pitchs }) => (
                            <TabPane
                                tab={displayName}
                                key={id}
                                closable={false}
                            >
                                {renderCard(pitchs)}
                            </TabPane>
                        ))}
                    </Tabs> */}
                </Col>
            </Row>
        </DashboardLayout>
    )
}

export default Price
