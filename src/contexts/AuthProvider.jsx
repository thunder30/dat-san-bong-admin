import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { API_BASE_URL, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import setHeaderToken from '../helpers/setHeaderToken'
import reducer, { initialState } from '../reducers/authReducers/reducer'
import { setAuth } from '../reducers/authReducers/actions'

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [authState, dispatch] = useReducer(reducer, initialState)
    console.log(`Auth provider`)
    // call api loadUser
    const loadUser = async () => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
        setHeaderToken(token)

        try {
            const res = await axios.get(`${API_BASE_URL}/auth`)
            if (res.data.success) {
                dispatch(
                    setAuth({
                        user: res.data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                )
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setHeaderToken(null)
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
        loadUser()
    }, [])

    const login = async ({ email, password }) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            })
            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.accessToken
                )
                // get user
            }
            loadUser()
            return res.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else
                return {
                    success: false,
                    message: error.message,
                }
        }
    }

    const value = { login, authState }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
