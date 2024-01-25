"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ApexOptions } from 'apexcharts';
import React, { useEffect } from 'react';

import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
import { Semester } from "src/models/result";

export const CGPIChartLoader: React.FC = () => {
    return (
        <div className="w-full relative">
            <Skeleton className="w-full h-full min-h-64" />
        </div>)
}
const DynamicReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <CGPIChartLoader/>,
});

interface CGPIChartProps {
    semesters?: Semester[];
}

export const CGPIChart: React.FC<CGPIChartProps> = ({ semesters }) => {

    const categories = semesters?.map((semester: Semester) => `Semester ${semester.semester}`);
    const cgpiData = semesters?.map((semester: Semester) => semester.cgpi.toFixed(2));
    const { theme } = useTheme();
    const [chart, setChart] = React.useState<ApexOptions | null>(null);


    useEffect(() => {
        setChart({
            chart: {
                height: "100%",
                width: "100%",
                type: "area",
                fontFamily: "Inter, sans-serif",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: "#1C64F2",
                    gradientToColors: ["#1C64F2"],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 6,
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: 0
                },
            },
            colors: ['hsl(var(--primary))'], // Line color
            xaxis: {
                categories,
                // labels: {
                //     show: false,
                // },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '14px', // Y-axis label font size
                    },
                },
            },
            title: {
                text: 'CGPI Across Semesters',
                align: 'left',
                style: {
                    fontSize: '20px', // Chart title font size
                    fontWeight: 'bold',
                    color: theme === 'dark' ? 'hsl(var(--light))' : 'hsl(var(--dark))',
                },
            },
            legend: {
                show: true,
                fontSize: '16px',
                fontWeight: 'bold',
                position: 'top',
            },

            markers: {
                size: 6,
            },
            series: [
                {
                    name: 'CGPI',
                    data: cgpiData,
                },
            ]
        } as unknown as ApexOptions);
    }, [theme])


    return <div className=" bg-white dark:bg-gray-800 shadow-lg  p-4  border border-border rounded-lg">

        {chart ? <><DynamicReactApexChart
            options={chart} series={chart.series as ApexOptions["series"]}
            type={chart.chart?.type}
            className="w-full h-64 text-slate-800 dark:text-slate-200"
            width={"100%"}
            style={{
                background: theme === 'dark' ? 'hsl(var(--dark))' : 'hsl(var(--light))',
            }}
            height={350} /></> : <CGPIChartLoader />}

    </div>
};

export default CGPIChart;
