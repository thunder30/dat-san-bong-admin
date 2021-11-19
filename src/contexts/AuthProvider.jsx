import React, { createContext, useEffect, useReducer } from 'react'
import reducer, { initialState } from '../reducers/authReducer/reducer'
import * as authService from '../core/services/auth'
import { setAuth } from '../reducers/authReducer/actions'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [authState, dispatch] = useReducer(reducer, initialState)
    let navigate = useNavigate()

    console.log(`Auth provider`)
    // call api loadUser
    const getAuth = async () => {
        const data = await authService.loadUser()
        if (data.success) {
            dispatch(
                setAuth({
                    user: data.user,
                    isAuthenticated: true,
                    isLoading: false,
                })
            )
        } else {
            dispatch(
                setAuth({
                    ...initialState,
                    isLoading: false,
                })
            )
        }
    }

    useEffect(() => {
        console.log(`run useEffect`)
        getAuth()
    }, [])

    const loginUser = async (loginForm) => {
        const data = await authService.login(loginForm)
        if (data.success) getAuth()

        navigate('/', { replace: true })
    }

    const logoutUser = async () => {
        await authService.logout()
        dispatch(
            setAuth({
                isAuthenticated: false,
                user: null,
            })
        )
    }

    const value = { authState, loginUser, logoutUser }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
