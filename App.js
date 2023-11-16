import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [timeRange, setTimeRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [orderData, setOrderData] = useState([]);
  const [chartType, setChartType] = useState(0);

  useEffect(() => {
    
    axios.get(`/api/orders?start=${timeRange.start}&end=${timeRange.end}`).then((response) => {
      setOrderData(response.data);
    });
  }, [timeRange]);


  const chartData = {
    labels: orderData.map((data) => data.label),
    datasets: [
      {
        label: 'Number of Orders',
        data: orderData.map((data) => data.numberOfOrders),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Total Value (in Rs)',
        data: orderData.map((data) => data.totalValue),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <DatePicker
        selected={timeRange.start}
        onChange={(date) => setTimeRange({ ...timeRange, start: date })}
        selectsStart
        startDate={timeRange.start}
        endDate={timeRange.end}
      />
      <DatePicker
        selected={timeRange.end}
        onChange={(date) => setTimeRange({ ...timeRange, end: date })}
        selectsEnd
        startDate={timeRange.start}
        endDate={timeRange.end}
        minDate={timeRange.start}
      />
      <select onChange={(e) => setChartType(e.target.value)}>
        <option value="number-of-orders">Number of Orders</option>
        <option value="total-value">Total Value</option>
      </select>
      {chartType === 'number-of-orders' ? (
        <Line data={chartData} />
      ) : (
        <Bar data={chartData} />
      )}
    </div>
  );
}

export default App;
