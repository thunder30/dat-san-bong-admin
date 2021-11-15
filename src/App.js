import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Auth from './pages/Auth'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Auth authRoute="Login" />} />
                <Route
                    path="register"
                    element={<Auth authRoute="Register" />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
