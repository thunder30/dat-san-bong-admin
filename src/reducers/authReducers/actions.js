import { SET_AUTH } from './constants'

const setAuth = (payload) => {
    return {
        type: SET_AUTH,
        payload,
    }
}

export { setAuth }
