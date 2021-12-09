import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import AnalyticsModule from '../modules/AnalyticsModule'
import AnalyticsProvider from '../contexts/AnalyticsProvider'

/**
 * @description Thống kê admin, chủ sân
 *
 * @returns
 */

function Analytics() {
    return (
        <AnalyticsProvider>
            <DashboardLayout>
                <AnalyticsModule />
            </DashboardLayout>
        </AnalyticsProvider>
    )
}

export default Analytics
