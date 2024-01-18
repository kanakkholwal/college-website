"use client";
import { ApexOptions } from 'apexcharts';
import React, { useEffect } from 'react';
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { Semester } from "src/models/result";

interface CGPIChartProps {
  semesters: Semester[];
}

const CGPIChart: React.FC<CGPIChartProps> = ({ semesters }) => {
  const [options, setOptions] = React.useState<ApexOptions | null>(null)
  const categories = semesters.map((semester: Semester) => `Semester ${semester.semester}`);

  

  useEffect(()=>{
    const chartOptions: ApexOptions = {
      chart: {
        type: 'line',
        height: 350,
        foreColor: '#333', // Text color
        toolbar: {
          show: false, // Hide toolbar
        },
      },
      colors: ['#4CAF50'], // Line color
      xaxis: {
        categories,
        labels: {
          style: {
            fontSize: '14px', // X-axis label font size
          },
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
        },
      },
      legend: {
        show: true,
        fontSize: '16px',
        fontWeight: 'bold',
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        theme: 'dark', // Tooltip theme
        style: {
          fontSize: '14px', // Tooltip font size
        },
      },
      markers: {
        size: 6,
      },
      grid: {
        borderColor: '#f0f0f0', // Grid line color
        strokeDashArray: 5, // Dashed grid lines
      },
      series: semesters.map((semester: Semester) => semester.cgpi.toFixed(2)),
    };
    setOptions(chartOptions)


  },[semesters])



  return <>
    {options && <ApexChart options={options} series={options.series} type="line" height={350} />}
  </>
};

export default CGPIChart;
