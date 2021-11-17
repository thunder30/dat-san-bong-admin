import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider'
import { Spin } from 'antd'
import styled from 'styled-components'

function ProtectedRoute() {
    const {
        authState: { isAuthenticated, isLoading },
    } = useContext(AuthContext)

    const WrapperStyled = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `
    if (isLoading)
        return (
            <WrapperStyled>
                {' '}
                <Spin size="large" tip="Loading..." />{' '}
            </WrapperStyled>
        )

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
