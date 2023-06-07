import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import styles from '../page.module.css'
import useSWR from 'swr'

const WEATHER_API = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m&timezone=Asia%2FTokyo&"
const WEATER_DATA = { name: "japan", latitude: 43.43, longitude: 142.93 }
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

const EchartsExp = () => {
    const { data, error, isValidating } = useSWR(WEATHER_API + `latitude=${WEATER_DATA.latitude}&longitude=${WEATER_DATA.longitude}`, fetcher)
    const chartRef = useRef(null);

    const [jsonTemp, setJsonTemp] = useState([]);
    const [jsonRelative, setJsonRelative] = useState([]);
    const [formattedDates, setFormattedDates] = useState([]);

    useEffect(() => {

        if (!data) return;

        const temp = data.hourly.temperature_2m;
        const relative = data.hourly.relativehumidity_2m;
        const dates = data.hourly.time;
        const formattedDates = dates.map((date) => {
            return new Date(date * 1000).toLocaleDateString("ja-JP");
        });
        
        setJsonTemp(temp);
        setJsonRelative(relative);
        setFormattedDates(formattedDates);

    }, [])


    useEffect(() => {

        const chart = echarts.init(chartRef.current, "dark", {
            width: 'auto',
            height: '400px'
        });

        // chart.resize({ width: "100%", height: "500px" })
        const option = {
            title: {
                text: '天気グラフ',
                left: 'center'
            },
            legend: {
                data: ['気温', '降水確率'],
                top: 'bottom'
            },
            xAxis: {
                type: 'category',
                data: formattedDates.map((time) => time)
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Temperature',
                    min: -20,
                    max: 40,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                {
                    type: 'value',
                    name: 'Precipitation',
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    axisLine: {
                        symbol: 'arrow',
                        lineStyle: {
                            type: 'dashed'
                            // ...
                        }
                    }
                },

            ],
            series: [
                {
                    name: '気温',
                    data: jsonTemp.map((data) => data),
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    yAxisIndex: 0
                },
                {
                    name: '降水確率',
                    data: jsonRelative.map((data) => data),
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 2,
                    yAxisIndex: 1
                },

            ]
        }
        chart.setOption(option);
    }, [jsonTemp, jsonRelative, formattedDates]);


    return (
        <>
            <div style={{ width: '100%', height: '500px' }} >
                <div ref={chartRef} />
            </div>
        </>
    )
}

export default EchartsExp