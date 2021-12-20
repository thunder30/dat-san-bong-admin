import axios from 'axios'
import { API_BASE_URL } from '../../../config/serverApiConfig'
import setHeaderToken from '../../../helpers/setHeaderToken'
import { token } from './../auth'
import successHandler from '../../../request/successHandler'
import errorHandler from '../../../request/errorHandler'

const updatePrice = async (pitchType, prices) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)
    console.log({
        pitchType,
        prices,
    })
    try {
        const res = await axios.post(API_BASE_URL + '/price/arrtime', {
            pitchType,
            prices,
        })
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

export { updatePrice }
