"use client"
import React from 'react'
import styles from '../page.module.css'
import useSWR from 'swr'

//swrでfetchする
const fetcher = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error fetching data.");
    }
    return res.json();
  } catch (error) {
    console.error("fetch error: ", error);
    throw error;
  }
}


const SWR = () => {

  const { data, error, isValidating } = useSWR("https://jsonplaceholder.typicode.com/users", fetcher)


  return (
    <main>
      <h1 className={styles.h1ttl}>SWR</h1>
      <p>SWRでデータを取ってくる</p>

      {isValidating && <div>loading...</div>}
      <ul>
        {data && data.map((item) => {
          return (
            <li key={item.id}>{item.name}</li>
          )
        })}
      </ul>
    </main>
  )
}

export default SWR