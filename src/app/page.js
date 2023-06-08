
"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {

  const [num,setNum] = useState(0)
  const [stringNum,setStringNum] = useState("")

  //setNunber
  const setNumber = (e) => {

    const num=parseInt(e.target.value,10);
   
    const connma=num.toLocaleString();
    console.log(connma)
    setNum(num)
    setStringNum(connma)
  }
  return (
   <main className={styles.inner}>
      <h1 className={styles.h1ttl}>HOME</h1>

      <input type="number" value={num} onChange={(e) => setNumber(e)} />

      <p>入力した数字は{stringNum}です。</p>
   </main>
  )
}
