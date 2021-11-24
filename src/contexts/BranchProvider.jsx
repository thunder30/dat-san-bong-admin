import React, { createContext, useEffect, useReducer } from 'react'
import reducer, { INIT_STATE } from '../reducers/branchReducer/reducer'
import * as types from '../reducers/branchReducer/constants'
import * as services from '../core/services/branch'

export const BranchContext = createContext()

function BranchProvider({ children }) {
    const [branchState, dispatch] = useReducer(reducer, INIT_STATE)

    const findBranch = async () => {
        const data = await services.findBranch()
        console.log(data)
        if (data.success) {
            dispatch({ type: types.LOAD_SUCCESS, payload: data.pitchBranch })
        } else {
            dispatch({
                type: types.LOAD_FAILED,
            })
        }
    }

    useEffect(() => {
        // get all
        findBranch()
        console.log(`mount branch provider`)

        return () => {
            console.log(`unmount branch provider`)
        }
    }, [])

    const value = { branchState }

    return (
        <BranchContext.Provider value={value}>
            {children}
        </BranchContext.Provider>
    )
}

export default BranchProvider
