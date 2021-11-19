import React from 'react'
import { Result, Button } from 'antd'

function NotFound() {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang này không tồn tại"
                extra={
                    <Button href="/" type="primary">
                        Dashboard
                    </Button>
                }
            />
        </>
    )
}

export default NotFound
