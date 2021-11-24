import * as types from './constants'

export const setBranch = (payload) => {
    return {
        type: types.SET_BRANCHES,
        payload,
    }
}
