import React, { createContext, useContext, useEffect, useReducer } from 'react'

import reducer, { initialState } from '../reducers/ownerReducer/reducer'
import * as types from '../reducers/ownerReducer/constants'
import * as services from '../core/services/owner'
import { AuthContext } from './AuthProvider'

export const OwnerContext = createContext()

function OwnerProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    const {
        authState: { user },
    } = useContext(AuthContext)

    const findBranch = async (ownerId) => {
        const data = await services.findBranch(ownerId)

        if (data.success) {
            dispatch({
                type: types.BRANCH_LOAD_SUCCESS,
                payload: data.pitchBranch,
            })
        } else {
            dispatch({
                type: types.BRANCH_LOAD_FAILED,
            })
        }

        return data
    }

    const findBranchById = async (id) => {
        dispatch({
            type: types.SET_LOADING,
            payload: true,
        })
        const data = await services.findBranchById(id)

        if (data.success) {
            dispatch({
                type: types.SET_CURRENT_PITCH_TYPES,
                payload: data.pitchTypes,
            })
        } else {
            dispatch({
                type: types.BRANCH_LOAD_FAILED,
            })
        }
    }

    const setCurrentBranch = async ({ id, displayName }) => {
        dispatch({
            type: types.SET_CURRENT_BRANCH,
            payload: {
                id,
                displayName,
            },
        })
        await findBranchById(id)
    }

    useEffect(() => {
        console.log(`run useEffect owner`)
        findBranch(user._id).then((data) => {
            const { pitchBranch } = data
            console.log(data)
            if (pitchBranch && pitchBranch.length !== 0) {
                findBranchById(pitchBranch[0]._id)
            }
        })
    }, [user])

    const value = { state, findBranchById, setCurrentBranch }

    return (
        <OwnerContext.Provider value={value}>{children}</OwnerContext.Provider>
    )
}

export default OwnerProvider
