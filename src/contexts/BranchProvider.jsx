import React, { createContext, useEffect, useReducer } from 'react'
import reducer, { INIT_STATE } from '../reducers/branchReducer/reducer'
import * as actions from '../reducers/branchReducer/actions'
import * as services from '../core/services/branch'

export const BranchContext = createContext()

function BranchProvider({ children }) {
    const [branchState, dispatch] = useReducer(reducer, INIT_STATE)

    const findBranch = async () => {
        const data = await services.findBranch()
        if (data.success) {
            dispatch(actions.setBranch(data.pitchBranch))
        } else {
            dispatch({})
        }
    }

    useEffect(() => {
        // get all
        findBranch()
    }, [])

    const value = { branchState }

    return (
        <BranchContext.Provider value={value}>
            {children}
        </BranchContext.Provider>
    )
}

export default BranchProvider
