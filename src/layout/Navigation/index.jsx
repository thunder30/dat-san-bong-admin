import React, { useState, useContext } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

import { MenuManager, MenuBranchManager } from '../../components/Menu'
import { AuthContext } from '../../contexts/AuthProvider'

const { Sider } = Layout

const LogoStyled = styled.div`
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
`

function Navigation() {
    const {
        authState: { user },
    } = useContext(AuthContext)

    const [collapsed, setCollapsed] = useState(false)

    const handleOnCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={handleOnCollapsed}
                style={{ zIndex: 1000 }}
            >
                <LogoStyled />
                {user.isAdmin ? <MenuManager /> : <MenuBranchManager />}
            </Sider>
        </>
    )
}

export default Navigation
