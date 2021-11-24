import React, { createContext, useEffect, useReducer } from 'react'
import reducer, { initialState } from '../reducers/authReducer/reducer'
import * as authService from '../core/services/auth'
import * as types from '../reducers/authReducer/constants'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [authState, dispatch] = useReducer(reducer, initialState)
    let navigate = useNavigate()

    console.log(`Auth provider`)
    console.log(`Authenticated: `, authState.isAuthenticated)

    // call api loadUser
    const getAuth = async () => {
        const data = await authService.loadUser()
        if (data.success) {
            dispatch({
                type: types.AUTH_SUCCESS,
                payload: data.user,
            })
        } else {
            dispatch({
                type: types.AUTH_FAILED,
            })
        }
    }

    useEffect(() => {
        console.log(`run useEffect`)
        getAuth()
    }, [])

    const loginUser = async (loginForm) => {
        dispatch({
            type: types.AUTH_LOADING,
        })
        const data = await authService.login(loginForm)
        if (data.success) getAuth()
        else {
            dispatch({ type: types.AUTH_FAILED })
        }
        navigate('/', { replace: true })
    }

    const logoutUser = async () => {
        dispatch({
            type: types.AUTH_LOADING,
        })
        await authService.logout()
        dispatch({
            type: types.AUTH_RESET,
        })
    }

    const value = { authState, loginUser, logoutUser }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
