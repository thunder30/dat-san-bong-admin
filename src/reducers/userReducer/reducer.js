import * as types from './constants'

export const initialState = {
    users: [],
    customers: [],
    owners: [],
    isLoading: true,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.USER_LOAD_SUCCESS:
            const users = payload
            let customers = [],
                owners = []
            users.forEach((user) => {
                user.roles.forEach((role) => {
                    switch (role.code) {
                        case 'KHACH_HANG':
                            customers.push(user)
                            break
                        case 'CHU_SAN':
                            owners.push(user)
                            break
                        default:
                            break
                    }
                })
            })
            return {
                ...state,
                users,
                customers,
                owners,
                isLoading: false,
            }
        case types.USER_LOAD_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}
