'use client'
import ReactEcharts from "echarts-for-react";
import { useEffect } from "react";

const Analytics = () => {

    let time: any = [];
    let minutes: any = [];
    const dayAndDate: any = new Date().toLocaleDateString();


    useEffect(() => {
        time = [];
        minutes = [];
        fetchData();
    }, [])


    const fetchData = () => {
        const data = localStorage.getItem("analyticsData");
        if (data) {
            const parsedData = JSON.parse(data);
            parsedData.forEach((element: any) => {
                time.push(element.currentTme)
                minutes.push(element.currentMinutes)
            });
            return false;
        }
        else {
            return true;
        }
    }

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
        ],
        title: {
            show: fetchData(),
            textStyle: {
                color: "grey",
                fontSize: 20
            },
            text: "No data",
            left: "center",
            top: "center"
        },
    };

    return (
        <div className="my-1">
            <div className="flex justify-center items-center">
                <p className="text-center pr-1">Analytics for</p>
                <p className="font-semibold underline">{dayAndDate}</p>
            </div>
            <ReactEcharts option={option} style={{ height: 400, width: 500 }} />
            <div className="w-[500px]">
                <p className="text-[10px] text-center font-semibold">*All data is stored within your browser and will be cleared every day. No data will be persistent.</p>
            </div>
        </div>
    )
};


export default Analytics;