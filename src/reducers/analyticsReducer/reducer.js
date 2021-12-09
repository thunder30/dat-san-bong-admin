import * as types from './constants'

export const initialState = {
    branch: {},
    branches: [],
    isLoading: true,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.LOAD_SUCCESS:
            return {
                ...state,
                ...payload,
                isLoading: false,
            }
        case types.LOAD_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return { ...state }
    }
}
