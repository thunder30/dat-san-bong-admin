import React from 'react'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

function DateTimePicker({ rangeDate: { startDate, endDate }, onChange }) {
    return (
        <RangePicker
            value={[startDate, endDate]}
            format="DD/MM/YYYY"
            onChange={onChange}
        />
    )
}

export default DateTimePicker
