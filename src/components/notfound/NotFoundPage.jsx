import React from 'react'
import styles from './NotFoundPage.module.scss'

function NotFoundPage() {
    return (
        <div id={styles.notfound}>
            <div className={styles.notfound}>
                <div className={styles.notfound404}>
                    <h1>Oops!</h1>
                    <h2>404 - Không tìm thấy trang!</h2>
                </div>
                <a href="/">Trang chủ</a>
            </div>
        </div>
    )
}

export default NotFoundPage
