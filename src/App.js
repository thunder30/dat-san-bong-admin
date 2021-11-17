import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import AuthProvider from './contexts/AuthProvider'
import ProtectedRoute from './components/routing/ProtectedRoute'
import ViewUser from './components/user/ViewUser'
import CreateUser from './components/user/CreateUser'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Auth authRoute="Login" />} />
                    <Route
                        path="/register"
                        element={<Auth authRoute="Register" />}
                    />

                    {/* Protected Route */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="user" element={<ViewUser />}>
                            <Route path="create" element={<CreateUser />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
