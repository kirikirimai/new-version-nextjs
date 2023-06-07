"use client"
import React, { useState } from 'react'
import styles from "../page.module.css"

const Form = () => {
  const [inpuText, setInputText] = useState("")
  const [resText, setResText] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: JSON.stringify({ text: inpuText }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      setResText(data.text)

    } catch (error) {
      console.log(error)
    }
  }

  const onChangeHandler = (e) => {
    setInputText(e.target.value)
  }

  return (
    <div>
      <h1 className={styles.h1ttl}>Form</h1>
      <p>新しいNextJSでFormのテスト。</p>

      <div className={styles.box_con08}>
        <form onSubmit={(e) => onSubmitHandler(e)} action="/api/form" method="post">
          <ul className={styles.formTable}>
            <li>
              <p className={styles.title}><em>お名前<span>必須</span></em></p>
              <div className={styles.box_det}><input className={styles.wide} onChange={e => onChangeHandler(e)} type="text" name="text" /></div>
            </li>
            <li>
              <p className={styles.box_det}>入力したテキスト：{inpuText}</p>
            </li>
            <li>
              <p className={styles.box_det}>送信後にレスポンスで戻ってきたテキスト：{resText}</p>
            </li>
          </ul>
          <p className="btn"><span><input type="submit" value="　確認 " /></span></p>
        </form>
      </div>
    </div>
  )
}

export default Form