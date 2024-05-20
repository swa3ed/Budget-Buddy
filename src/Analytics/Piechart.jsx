import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Piechart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [{
      label: 'Budget Distribution',
      data: data.map(item => item.amount),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
    }]
  };
  if (!Array.isArray(data)) {
    return null; // or return a loading indicator
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    }
  };

  return (
    <div>
      <h2>Budget Distribution</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default Piechart;
