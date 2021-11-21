import { SET_BRANCHES } from './constants'

export const setBranch = (payload) => {
    return {
        type: SET_BRANCHES,
        payload,
    }
}
