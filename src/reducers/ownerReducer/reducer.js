import * as types from './constants'

export const initialState = {
    current: {
        branch: {}, // chi nhánh đang chọn
        pitchTypes: null, // // danh sách loại sân của chi nhánh đang chọn
    },
    branches: [], // danh sách chi nhánh của chủ sân
    isLoading: true,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.BRANCH_LOAD_SUCCESS:
            const { _id, displayName, startTime, endTime } = payload[0] || []
            return {
                ...state,
                branches: payload,
                current: {
                    ...state.current,
                    branch: {
                        _id: _id || null,
                        displayName: displayName || null,
                        startTime,
                        endTime,
                    },
                },
                isLoading: false,
            }
        case types.BRANCH_LOAD_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        case types.CURRENT_ACTION:
            return {
                ...state,
                current: {
                    ...state.current,
                    ...payload,
                },
                isLoading: false,
            }
        case types.SET_CURRENT_BRANCH:
            return {
                ...state,
                current: {
                    ...state.current,
                    branch: { ...payload },
                },
                isLoading: false,
            }
        case types.SET_CURRENT_PITCH_TYPES:
            return {
                ...state,
                current: {
                    ...state.current,
                    pitchTypes: [...payload],
                },
                isLoading: false,
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
