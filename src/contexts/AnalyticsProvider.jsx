import React, { createContext, useReducer } from 'react'
import reducer, { initialState } from '../reducers/analyticsReducer/reducer'
import * as types from '../reducers/analyticsReducer/constants'
import * as services from '../core/services/analytics'

export const AnalyticsContext = createContext()

function AnalyticsProvider({ children }) {
    const [analyticsState, dispatch] = useReducer(reducer, initialState)

    console.log(`analytics: `, analyticsState)

    const getAnalyticsAsBranch = async (startDate, endDate, pitchBranchId) => {
        dispatch({
            type: types.SET_LOADING,
            payload: true,
        })
        const data = await services.getAnalyticsAsBranch(
            startDate,
            endDate,
            pitchBranchId || ''
        )
        console.log(`get analytics as branch`)
        if (data.success) {
            console.log(data.static)
            dispatch({
                type: types.LOAD_SUCCESS,
                payload: {
                    branch: { ...data.static },
                },
            })
        } else {
            dispatch({
                type: types.LOAD_FAILED,
            })
        }
    }

    const getAnalyticsAllBranch = async (startDate, endDate) => {
        dispatch({
            type: types.SET_LOADING,
            payload: true,
        })
        const data = await services.getAnalyticsAllBranch(startDate, endDate)
        if (data.success) {
            dispatch({
                type: types.LOAD_SUCCESS,
                payload: {
                    branches: data.static,
                },
            })
        } else {
            dispatch({
                type: types.LOAD_FAILED,
            })
        }
    }

    const value = {
        analyticsState,
        getAnalyticsAsBranch,
        getAnalyticsAllBranch,
    }
    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    )
}

export default AnalyticsProvider
