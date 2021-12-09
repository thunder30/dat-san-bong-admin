import axios from 'axios'
import { API_BASE_URL } from '../../../config/serverApiConfig'
import setHeaderToken from '../../../helpers/setHeaderToken'
import { token } from './../auth'
import successHandler from '../../../request/successHandler'
import errorHandler from '../../../request/errorHandler'

const findBooking = async () => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.get(API_BASE_URL + '/booking')
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const findBookingByPitchBranchId = async (pitchBranchId) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.get(
            API_BASE_URL + '/booking?pitchBranchId=' + pitchBranchId
        )
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

export { findBooking, findBookingByPitchBranchId }
