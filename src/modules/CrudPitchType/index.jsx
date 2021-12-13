import React, { useState } from 'react'
import { notification } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import PitchTypeForm from '../../components/Form/PitchTypeForm'
import ModalForm from '../../components/ModalForm'

import * as apiPitch from '../../core/services/pitch'

function CrudPitchType({ branch }) {
    // tạo loại sân
    // refresh lại app
    const [visible, setVisible] = useState(false)
    const [pitchType, setPitchType] = useState({
        displayName: '',
        description: '',
    })

    //console.log(pitchType)

    const handleOnChange = (e) => {
        e.preventDefault()
        setPitchType({
            ...pitchType,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async () => {
        // call api create pitch type
        const data = await apiPitch.createPitchType({
            displayName: pitchType.displayName,
            description: pitchType.description,
            pitchBranch: branch._id,
        })

        if (data.success) {
            notification.success({
                duration: 5,
                message: data.message,
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
        setVisible(false)
    }
    return (
        <div>
            <PlusCircleOutlined
                style={{ fontSize: 60, color: '#818181' }}
                onClick={() => {
                    setVisible(true)
                }}
            />
            <ModalForm
                title="Thêm loại sân"
                okText="Thêm mới"
                cancelText="Huỷ bỏ"
                visible={visible}
                handleSubmit={handleSubmit}
                onCancel={() => setVisible(false)}
            >
                <PitchTypeForm
                    key={'pitch-type-form'}
                    value={pitchType}
                    onChange={handleOnChange}
                />
            </ModalForm>
        </div>
    )
}

export default CrudPitchType
