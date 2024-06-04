// import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = () => {
  const data = {
    labels: ["Male", "Female", ],
    datasets: [
      {
        label: "Gender Distribution",
        data: [60, 40,  ], 
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", 
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gender Distribution",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default GenderPieChart;
