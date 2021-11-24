import * as types from './constants'

export const INIT_STATE = {
    branch: null,
    branches: [],
    isLoading: true,
}

export default function reducer(state = INIT_STATE, action) {
    const { type, payload } = action
    switch (type) {
        case types.LOAD_SUCCESS:
            return {
                ...state,
                branches: [...payload],
                isLoading: false,
            }
        case types.LOAD_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}
