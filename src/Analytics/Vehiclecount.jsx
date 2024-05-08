import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Vehiclecount = () => {
  // Assuming each vehicle has a current usage value and a total value.
  const vehicleData = {
    voitures: { current: 3, total: 8 },
    semi: { current: 6, total: 15 },
    suvs: { current: 2, total: 9 },
  };

  // Generate background colors for each vehicle type.
  const backgroundColors = {
    voitures: 'rgba(255, 99, 132, 0.5)',
    semi: 'rgba(54, 162, 235, 0.5)',
    suvs: 'rgba(255, 206, 86, 0.5)',
  };

  // Build datasets for the used and remaining capacities.
  const datasets = [
    {
      label: 'Current',
      data: Object.values(vehicleData).map(v => v.current),
      backgroundColor: Object.keys(vehicleData).map(v => backgroundColors[v]),
    },
    {
      label: 'Total',
      data: Object.values(vehicleData).map(v => v.total - v.current),
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
    },
  ];

  const data = {
    labels: Object.keys(vehicleData),
    datasets: datasets,
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        stacked: true,
        display: false, // Hides the x-axis labels
      },
      y: {
        stacked: true,
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Nombre De Vehicules Utitliser', 
      },
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x;
            }
            return label;
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

return (
  <div style={{ 
    width: '340px', 
    height: '250px', 
    backgroundColor: '#f0f0f0', 
    padding: '20px', 
    borderRadius: '10px', 
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)'
  }}>
    <Bar data={data} options={options} />
  </div>
);
};

export default Vehiclecount;
