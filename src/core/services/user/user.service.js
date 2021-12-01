import axios from 'axios'
import { API_BASE_URL } from '../../../config/serverApiConfig'
import setHeaderToken from '../../../helpers/setHeaderToken'
import { token } from './../auth'
import successHandler from '../../../request/successHandler'
import errorHandler from '../../../request/errorHandler'

const findUser = async () => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.get(API_BASE_URL + '/users')
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

export { findUser }
