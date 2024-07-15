import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


export default function CustomerChart({transactions}) {
    const chartData = {
        labels: transactions.map(transaction => transaction.date),
        datasets: [
          {
            label: 'Transaction Amount',
            data: transactions.map(transaction => transaction.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    
      const options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            width:20
          }
        }
      };

      return(<div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
            <Bar data={chartData} options={options} />
      </div>) ;
}
