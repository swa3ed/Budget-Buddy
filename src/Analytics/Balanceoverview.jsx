import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BalanceOverview = () => {
  // Assuming each account type has a current balance and a credit limit or maximum balance.
  const accountData = {
    Checking: { current: 1200, total: 5000 },
    Savings: { current: 5000, total: 10000 },
    CreditCard: { current: 1500, total: 3000 },
  };

  // Generate background colors for each account type.
  const backgroundColors = {
    Checking: 'rgba(255, 99, 132, 0.5)',
    Savings: 'rgba(54, 162, 235, 0.5)',
    CreditCard: 'rgba(255, 206, 86, 0.5)',
  };

  // Build datasets for the used and available balances.
  const datasets = [
    {
      label: 'Current Balance',
      data: Object.values(accountData).map(v => v.current),
      backgroundColor: Object.keys(accountData).map(v => backgroundColors[v]),
    },
    {
      label: 'Available',
      data: Object.values(accountData).map(v => v.total - v.current),
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
    },
  ];

  const data = {
    labels: Object.keys(accountData),
    datasets: datasets,
  };

  const options = {
    indexAxis: 'y', // Bar orientation as horizontal
    scales: {
      x: {
        stacked: true, // Stacks the bars on the x-axis
      },
      y: {
        stacked: true, // Stacks the bars on the y-axis
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Account Balances Overview',
      },
      legend: {
        display: false, // Hides the legend to keep the chart clean
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += '$' + context.parsed.x.toFixed(2);
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

export default BalanceOverview;
