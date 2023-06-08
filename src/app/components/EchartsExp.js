import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import styles from '../page.module.css'


const EchartsExp = ({option}) => {
    // const { data, error, isValidating } = useSWR(WEATHER_API + `latitude=${WEATER_DATA.latitude}&longitude=${WEATER_DATA.longitude}`, fetcher)
    const chartRef = useRef(null);

    useEffect(() => {

        const chart = echarts.init(chartRef.current, "dark", {
            width: 'auto',
            height: '400px'
        });

        chart.setOption(option);

        return () => {
            chart.dispose();
        }
    }, [option]);


    return (
        <>
            <div style={{ width: '100%', height: '500px' }} >
                <div ref={chartRef} />
            </div>
        </>
    )
}

export default EchartsExp