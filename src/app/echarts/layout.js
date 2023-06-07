import React from 'react'
import styles from '../page.module.css'

const layout = ({children}) => {
  return (
    <div className={styles.col2}>
        <div className={styles.sidenav}>
            <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
            </ul>
        </div>
        <div className={styles.main}>{children}</div>
    </div>
  )
}

export default layout