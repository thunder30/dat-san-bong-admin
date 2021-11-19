import React, { useContext } from 'react'
import { Layout, Spin } from 'antd'
import styled from 'styled-components'

import AppRouter from './AppRouter'
import AuthRouter from './AuthRouter'
import Navigation from '../layout/Navigation'
import { AuthContext } from '../contexts/AuthProvider'

function Router() {
    const {
        authState: { isAuthenticated, isLoading },
    } = useContext(AuthContext)

    const LayoutStyled = styled(Layout)`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `
    const WrapperStyled = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `
    console.log('Router render')

    if (isLoading)
        return (
            <WrapperStyled>
                {' '}
                <Spin size="large" tip="Loading..." />{' '}
            </WrapperStyled>
        )

    if (!isAuthenticated) {
        return (
            <LayoutStyled>
                <AuthRouter />
            </LayoutStyled>
        )
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navigation />
            <AppRouter />
        </Layout>
    )
}

export default Router
