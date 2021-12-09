import * as types from './constants'

export const initialState = {
    bookings: [],
    current: null,
    isLoading: true,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.LOAD_SUCCESS:
            return {
                ...state,
                bookings: payload,
                isLoading: false,
            }
        case types.LOAD_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        case types.SET_BOOKING:
            return {
                ...state,
                current: payload,
            }
        case types.SET_LOADING:
            return {
                ...state,
                isLoading: payload,
            }
        default:
            return state
    }
}
