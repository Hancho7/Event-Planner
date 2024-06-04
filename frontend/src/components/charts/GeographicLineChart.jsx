

import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'CU',
        data: [50, 60, 70, 80, 90, 100],
        fill: false,
        borderColor: '#36a2eb',
        tension: 0.1,
      },
      {
        label: 'UG',
        data: [40, 50, 60, 70, 80, 90],
        fill: false,
        borderColor: '#ff6384',
        tension: 0.1,
      },
      {
        label: 'UPSA',
        data: [30, 40, 50, 60, 70, 80],
        fill: false,
        borderColor: '#ffce56',
        tension: 0.1,
      },
      {
        label: 'KNUST',
        data: [20, 30, 40, 50, 60, 70],
        fill: false,
        borderColor: '#4bc0c0',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Geographic Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
