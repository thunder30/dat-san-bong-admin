import * as types from './constants'

export const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
}

function reducer(state = initialState, { type, payload }) {
    console.log(`reduce - payload: `, payload)
    switch (type) {
        case types.AUTH_SUCCESS:
            return {
                ...state,
                user: payload,
                isLoading: false,
                isAuthenticated: true,
            }
        case types.AUTH_FAILED:
            return {
                ...initialState,
                isLoading: false,
            }
        case types.AUTH_RESET:
            return {
                ...initialState,
                isLoading: false,
            }
        case types.AUTH_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state
    }
}

export default reducer
