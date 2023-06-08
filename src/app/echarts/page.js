"use client"
import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'
import useSWR from 'swr'
import EchartsExp from '../components/EchartsExp'
import * as echarts from 'echarts';


const WEATHER_API = "https://covid19-japan-web-api.vercel.app/api/v1/prefectures"
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

  const { data, error, isValidating } = useSWR(WEATHER_API, fetcher)
  const [option, setOption] = useState({})
  
  //
  useEffect(() => {
    console.log(data)
   if(data){
    const redata = {
      xAxis: {
        type: 'category',
        data: data.map((item) => {
          console.log(item.name_ja)
          return item.name_ja
        }),
        axisLabel: {
          interval: 0, // Force to display all labels
          rotate: 45 // Rotate labels
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '感染者数',
          min: 0,
          max:300000,
          interval: 1000,
          axisLabel: {
            formatter: '{value} 人'
          }
        },
        {
          type: 'value',
          name: '死者数',
          min: 0,
          max: 1000,
          interval: 100,
          axisLabel: {
            formatter: '{value} 人'
          }
        },
      ],
      series: [
        {
          data:  data.map((item) => {
            console.log(item.name_ja)
            return item.cases
          }),
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          yAxisIndex: 0
        },
        {
          data:  data.map((item) => {
            console.log(item.name_ja)
            return item.deaths
          }),
          type: 'line',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          yAxisIndex: 1
        }
      ]
    }

    setOption(redata)
   }

  }, [data])
  return (
    <>
      <h1 className={styles.h1ttl}>ECHARTS</h1>
      <p>Echartsでグラフを実装してみる。</p>
      <EchartsExp option={option} />
    </>
  )
}

export default Echarts