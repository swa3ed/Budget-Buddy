import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Piechart = () => {
  const data = {
    labels: ['Cars', 'Trucks', 'SUVs'],
    datasets: [
      {
        label: 'Pourcentage Usage Des Vehicules',
        data: [40, 38, 22], // These should be your data points
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
        cutout: '55%' // Adjust this value to change the size of the chart's inner hole
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Pourcentage Usage Des Vehicules',
      },
    },
  }

  return (
    <div style={{ width: '340px', height: '340px',  marginRight: '20px',backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px',    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
  <Pie data={data} options={options} />
    </div>
  )
}

export default Piechart;
