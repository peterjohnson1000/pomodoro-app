'use client'
import ReactEcharts from "echarts-for-react";

const Analytics = () => {

    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };

    return (
        <div>
            Analytics
            <ReactEcharts option={option} style={{ height: 400, width: 500 }} />
        </div>
    )
};

export default Analytics;