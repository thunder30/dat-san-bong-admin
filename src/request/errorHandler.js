import { notification } from 'antd'
import codeMessage from './codeMessage'

const errorHandler = (error) => {
    const { response } = error
    if (!response) {
        return {
            success: false,
            message:
                'Cannot connect to the server, Check your internet network',
        }
    } else if (response && response.status) {
        const { status } = response.status
        const message = response.data && response.data.message
        const errorText = message || codeMessage[status]

        notification.config({
            duration: 20,
        })
        notification.error({
            message: `Request error ${status}`,
            description: errorText,
        })
        return response.data
    } else {
        notification.config({
            duration: 20,
        })
        notification.error({
            message: 'Unknown Error',
            description:
                'An unknown error occurred in the app, please try again. ',
        })
        return {
            success: false,
            message: 'An unknown error occurred in the app, please try again. ',
        }
    }
}

export default errorHandler
