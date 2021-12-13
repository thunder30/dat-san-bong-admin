import { notification } from 'antd'
import codeMessage from './codeMessage'

const successHandler = (response) => {
    const { data } = response
    if (!data.success) {
        const message = data && data.message
        const { status } = response
        const errorText = message || codeMessage[status]
        //console.log(`success handler: `, response)

        if (status !== 401 && status !== 403) {
            notification.config({
                duration: 5,
            })
            notification.error({
                //message: `Request error ${status}`,
                description: errorText,
            })
        }
    }
    return data
}

export default successHandler
