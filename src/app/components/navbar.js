import Link from 'next/link'
import React from 'react'
import styles from '../page.module.css'

const NavBar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <nav className={styles.navbar}>
                    <Link href={"/"}>HOME</Link>
                    <Link href={"/posts"}>POSTS</Link>
                    <Link href={"/echarts"}>ECHARTS</Link>
                    <Link href={"/form"}>FORM</Link>
                    <Link href={"/swr"}>SWR</Link>
                </nav>
            </div>
        </header>
    )
}


export default NavBar