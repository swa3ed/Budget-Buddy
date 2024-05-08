import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'], // X-axis labels
  datasets: [
    {
      label: 'Distance Parcourue par Les Camions',
      data: [200, 300, 250, 400, 497, 350], // Data points for Y-axis
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.4, 
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distance Parcourue Par Les Camions',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Mois',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Km',
      },
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  maintainAspectRatio: false,
};

const Linechart = () => {
  return (
    <div style={{ width: '700px',
      height: '340px', 
      marginRight: '300px', 
      backgroundColor: '#f0f0f0',
      padding: '20px', borderRadius: '10px',
      boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
  <Line data={data} options={options} />
    </div>
);
};

export default Linechart;
