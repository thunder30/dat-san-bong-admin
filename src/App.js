import React from 'react'

import './App.css'
import AuthProvider from './contexts/AuthProvider'
import Router from './router'

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App
