import axios from 'axios'
import { API_BASE_URL } from '../../../config/serverApiConfig'
import setHeaderToken from '../../../helpers/setHeaderToken'
import { token } from './../auth'
import successHandler from '../../../request/successHandler'
import errorHandler from '../../../request/errorHandler'

const getAnalyticsAsBranch = async (startDate, endDate, pitchBranchId) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.get(
            API_BASE_URL +
                `/booking/static?startDate=${startDate}&endDate=${endDate}&pitchBranchId=${pitchBranchId}`
        )
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const getAnalyticsAllBranch = async (startDate, endDate) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.get(
            API_BASE_URL +
                `/booking/static?startDate=${startDate}&endDate=${endDate}`
        )
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

export { getAnalyticsAsBranch, getAnalyticsAllBranch }
