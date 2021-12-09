import axios from 'axios'
import { API_BASE_URL } from '../../../config/serverApiConfig'
import setHeaderToken from '../../../helpers/setHeaderToken'
import { token } from './../auth'
import successHandler from '../../../request/successHandler'
import errorHandler from '../../../request/errorHandler'

const createPitch = async (pitch) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)
    console.log(pitch)
    try {
        const res = await axios.post(API_BASE_URL + '/pitch', pitch)
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const deletePitch = async (pitchId) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.delete(API_BASE_URL + '/pitch/' + pitchId)
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const updatePitch = async (pitch) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.put(API_BASE_URL + '/pitch/' + pitch._id, pitch)
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const createPitchType = async (pitchType) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.post(API_BASE_URL + '/pitchtype', pitchType)
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const deletePitchType = async (pitchTypeId) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.delete(
            API_BASE_URL + '/pitchtype/' + pitchTypeId
        )
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}

const updatePitchType = async (pitchType) => {
    const accessToken = token.get()
    setHeaderToken(accessToken)

    try {
        const res = await axios.put(
            API_BASE_URL + '/pitchtype/' + pitchType._id,
            pitchType
        )
        return successHandler(res)
    } catch (error) {
        return errorHandler(error)
    }
}
export {
    createPitch,
    deletePitch,
    updatePitch,
    createPitchType,
    deletePitchType,
    updatePitchType,
}
