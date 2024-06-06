'use client'
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";

const Analytics = () => {

    const time: any = [];
    const minutes: any = [];

    const option = {
        xAxis: {
            type: 'category',
            data: time
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: minutes,
                type: 'bar'
            }
        ]
    };

    useEffect(() => {
        const data = localStorage.getItem("analyticsData")
        if (data) {
            const test = JSON.parse(data);
            console.log(test)
            test.forEach((element: any) => {
                console.log(element)
                time.push(element.currentTme)
                minutes.push(element.currentMinutes)
            });
        }
    })

    console.log("test")
    return (
        <div>
            Analytics
            <ReactEcharts option={option} style={{ height: 400, width: 500 }} />
        </div>
    )
};

export default Analytics;