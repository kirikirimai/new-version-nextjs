"use client"
import React from 'react'
import styles from '../page.module.css'
import useSWR from 'swr'
import EchartsExp from '../components/EchartsExp'

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


const Echarts = () => {
  const { data, error, isValidating } = useSWR("https://jsonplaceholder.typicode.com/users", fetcher)


  return (
    <>
      <h1 className={styles.h1ttl}>ECHARTS</h1>
      <p>Echartsでグラフを実装してみる。</p>
      <EchartsExp />
    </>
  )
}

export default Echarts