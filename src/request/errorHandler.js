import { notification } from 'antd'
import codeMessage from './codeMessage'

const errorHandler = (error) => {
    const { response } = error

    notification.config({
        duration: 5,
    })

    if (!response) {
        notification.error({
            message: 'Request Error',
            description:
                'Cannot connect to the server. Maybe server error or check your internet network',
        })
        return {
            success: false,
            message:
                'Cannot connect to the server, Check your internet network',
        }
    } else if (response && response.status) {
        const status = response.status
        const message = response.data && response.data.message
        const errorText = message || codeMessage[status]
        if (status !== 401 && status !== 403)
            notification.error({
                //message: `Request error ${status}`,
                description: errorText,
            })
        return response.data
    } else {
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
