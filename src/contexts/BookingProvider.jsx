import React, { createContext, useContext, useEffect, useReducer } from 'react'

import * as types from '../reducers/bookingReducer/constants'
import reducer, { initialState } from '../reducers/bookingReducer/reducer'
import * as services from '../core/services/booking'
import { AuthContext } from './AuthProvider'
import { OwnerContext } from './OwnerProvider'

export const BookingContext = createContext()

function BookingProvider({ children }) {
    const {
        authState: { user },
    } = useContext(AuthContext)
    const ownerState = useContext(OwnerContext)
    const [bookingState, dispatch] = useReducer(reducer, initialState)

    console.log(bookingState)

    // console.log(user)

    const findBooking = async () => {
        const data = await services.findBooking()
        if (data.success) {
            dispatch({
                type: types.LOAD_SUCCESS,
                payload: data.bookings,
            })
        } else {
            dispatch({
                type: types.LOAD_FAILED,
            })
        }
    }

    const findBookingByPitchBranchId = async (pitchBranchId) => {
        const data = await services.findBookingByPitchBranchId(pitchBranchId)
        if (data.success) {
            dispatch({
                type: types.LOAD_SUCCESS,
                payload: data.bookings,
            })
        } else {
            dispatch({
                type: types.LOAD_FAILED,
            })
        }
    }

    useEffect(() => {
        console.log(`run useeffect booking provider`)
        dispatch({
            type: types.SET_LOADING,
            payload: true,
        })
        if (user.isAdmin) {
            findBooking()
        } else {
            if (ownerState) {
                const {
                    state: {
                        current: {
                            branch: { _id },
                        },
                    },
                } = ownerState
                if (_id) {
                    console.log(`get booking for branch id: `, _id)
                    findBookingByPitchBranchId(_id)
                }
            }
        }
    }, [user, ownerState])

    const value = { bookingState }
    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingProvider
