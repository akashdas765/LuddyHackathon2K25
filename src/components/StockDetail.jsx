import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="text-gray-300 mb-1">{label}</p>
        {payload.map((entry) => {
          if (entry.value !== null) {
            return (
              <p key={entry.name} className={`font-semibold ${entry.name === 'predictedPrice' ? 'text-blue-400' : 'text-purple-400'}`}>
                {entry.name === 'predictedPrice' ? 'Predicted: ' : 'Price: '} ${entry.value.toFixed(2)}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

const StockDetail = ({ stock, chartData, onClose }) => {
  // Function to generate uniform Y-axis ticks
  const calculateTicks = (data) => {
    const prices = data.map(item => item.price || item.predictedPrice);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const step = 20; // Define step size
    const tickValues = [];
    for (let i = Math.floor(minPrice / step) * step; i <= Math.ceil(maxPrice / step) * step; i += step) {
      tickValues.push(i);
    }
    return tickValues;
  };

  const ticks = calculateTicks(chartData);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{stock.name}</h2>
            <p className="text-gray-400">{stock.ticker}</p>
          </div>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mb-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                ticks={ticks}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                name="Historical" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={false}
                connectNulls={true}
              />
              <Line 
                type="monotone" 
                dataKey="predictedPrice" 
                name="Predicted" 
                stroke="#60A5FA" 
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
