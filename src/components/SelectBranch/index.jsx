import { Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { OwnerContext } from '../../contexts/OwnerProvider'
import SpinStyled from '../Spin'

const { Option } = Select

function SelectBranch() {
    const {
        state: {
            branches,
            current: { branch },
            isLoading,
        },
        setCurrentBranch,
    } = useContext(OwnerContext)

    const [valueSelected, setValueSelected] = useState('')

    const handleOnChange = (value, { key }) => {
        setCurrentBranch({
            id: key,
            displayName: value,
        })
        setValueSelected(value)
    }

    useEffect(() => {
        setValueSelected(branch.displayName ?? 'Không có chi nhánh sân')
    }, [branch])

    return (
        <Select
            value={valueSelected}
            style={{ width: 'auto', marginBottom: 15, marginLeft: 30 }}
            onChange={handleOnChange}
            size="large"
            bordered={false}
        >
            {branches.map(({ _id, displayName }) => (
                <Option value={displayName} key={_id}>
                    {displayName}
                </Option>
            ))}
        </Select>
    )
}

export default SelectBranch
