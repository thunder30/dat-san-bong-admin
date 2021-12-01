import React, { createContext, useEffect, useReducer } from 'react'

import reducer, { initialState } from '../reducers/userReducer/reducer'
import * as types from '../reducers/userReducer/constants'
import * as services from '../core/services/user'

export const UserContext = createContext()

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    const findUser = async () => {
        const data = await services.findUser()
        if (data.success) {
            // dispatch reducer
            dispatch({
                type: types.USER_LOAD_SUCCESS,
                payload: data.users,
            })
        } else {
            dispatch({
                type: types.USER_LOAD_FAILED,
            })
        }
    }

    useEffect(() => {
        findUser()
    }, [])

    const value = {
        state,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
