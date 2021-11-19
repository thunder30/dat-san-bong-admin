import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import PublicRoute from './PublicRoute'

function AuthRouter() {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute />} />
            <Route path="login" element={<Login />} />
            <Route path="notfound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
    )
}

export default AuthRouter
