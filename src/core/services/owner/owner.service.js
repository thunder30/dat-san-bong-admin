import axios from 'axios'
import { API_BASE_URL } from '../../../config/serverApiConfig'
import setHeaderToken from '../../../helpers/setHeaderToken'
import { token } from './../auth'
import successHandler from '../../../request/successHandler'
import errorHandler from '../../../request/errorHandler'

const findBranch = async (ownerId) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.get(
            API_BASE_URL + '/pitchbranch/owner/' + ownerId
        )
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const findBranchById = async (id) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    //const urlOld = `/pitchbranch/getDetail/`

    try {
        const res = await axios.get(
            API_BASE_URL + '/pitchbranch/getDetailOwner/' + id
        )
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

export { findBranch, findBranchById }
