import { notification } from 'antd'
import codeMessage from './codeMessage'

const successHandler = (response) => {
    const { data } = response
    if (!data.success) {
        const message = data && data.message
        const errorText = message || codeMessage[response.status]
        const { status } = response

        notification.config({
            duration: 20,
        })
        notification.error({
            message: `Request error ${status}`,
            description: errorText,
        })
    }
    return data
}

export default successHandler
