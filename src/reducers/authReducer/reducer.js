import { SET_AUTH } from './constants'

export const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
}

function reducer(state = initialState, { type, payload }) {
    console.log(`reduce - payload: `, payload)
    switch (type) {
        case SET_AUTH:
            return { ...state, ...payload }
        default:
            return state
    }
}

export default reducer
