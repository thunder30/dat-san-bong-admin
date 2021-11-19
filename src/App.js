import React from 'react'
import AuthProvider from './contexts/AuthProvider'
import Router from './router'
import './style/app.less'

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App
