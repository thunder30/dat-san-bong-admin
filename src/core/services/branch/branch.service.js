import axios from 'axios'
import { API_BASE_URL } from '../../../config/serverApiConfig'
import setHeaderToken from '../../../helpers/setHeaderToken'
import { token } from './../auth'
import successHandler from '../../../request/successHandler'
import errorHandler from '../../../request/errorHandler'

const findBranch = async () => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.get(API_BASE_URL + '/pitchBranch')
        console.log(res)
        return successHandler(res)
    } catch (error) {
        token.remove()
        setHeaderToken(null)
        return errorHandler(error)
    }
}

export { findBranch }
