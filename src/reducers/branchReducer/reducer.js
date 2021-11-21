import { SET_BRANCHES } from './constants'

export const INIT_STATE = {
    branch: null,
    branches: [],
    isLoading: true,
}

export default function reducer(state = INIT_STATE, action) {
    const { type, payload } = action
    switch (type) {
        case SET_BRANCHES:
            return {
                ...state,
                branches: payload,
                isLoading: false,
            }
        default:
            return state
    }
}
