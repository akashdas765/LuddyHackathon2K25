// src/components/StockDetail.jsx
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from "@mui/material/Button";


const StockDetail = ({ stock, chartData, onClose }) => {
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

        <div className="mb-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" name="Historical" stroke="#8884d8" dot={false} connectNulls={true} />
              <Line type="monotone" dataKey="predictedPrice" name="Predicted" stroke="#ff7300" strokeDasharray="5 5" dot={false} connectNulls={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Current Price</p>
            <p className="text-xl font-bold">${stock.currentPrice.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">52W Return</p>
            <p className="text-xl font-bold text-red-500">
              {stock.dayChange >= 0 ? '+' : ''}
              {stock.dayChange.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">52W High</p>
            <p className="text-xl font-bold">${stock.high52W.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">52W Low</p>
            <p className="text-xl font-bold">${stock.low52W.toFixed(2)}</p>
          </div>
        </div>
        {/* TREND ANALYSER */}
        <>
          <h2 className="text-2xl font-bold mb-4">Trend Agent</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Trend Type</p>
              <p className="text-xl font-bold">DEMO</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">SMA_50</p>
              <p className="text-xl font-bold text-red-500">
                {stock.dayChange >= 0 ? '+' : ''}
                {stock.dayChange.toFixed(2)}%
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">SMA_200</p>
              <p className="text-xl font-bold">${stock.high52W.toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">RSI</p>
              <p className="text-xl font-bold">${stock.low52W.toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">MACD</p>
              <p className="text-xl font-bold">${stock.low52W.toFixed(2)}</p>
            </div>
          </div>
        </>

        {/* Risk Agent */}
        <>
          <h2 className="text-2xl font-bold mb-4">Risk Agent</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Trend Type</p>
              <p className="text-xl font-bold">DEMO</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">SMA_50</p>
              <p className="text-xl font-bold text-red-500">
                {stock.dayChange >= 0 ? '+' : ''}
                {stock.dayChange.toFixed(2)}%
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">SMA_200</p>
              <p className="text-xl font-bold">${stock.high52W.toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">RSI</p>
              <p className="text-xl font-bold">${stock.low52W.toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">MACD</p>
              <p className="text-xl font-bold">${stock.low52W.toFixed(2)}</p>
            </div>
            {/* Placeholder item */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Indicator 6</p>
              <p className="text-xl font-bold">N/A</p>
            </div>
          </div>
        </>

        {/* Recent News Analyser */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Recent News</h3>
          <div className="space-y-2">
            <p className="text-gray-400">• {stock.name} Announces Q4 Results</p>
            <p className="text-gray-400">• New Product Launch Expected Next Month</p>
            <p className="text-gray-400">• Company Expands International Operations</p>
          </div>
        </div>

        {/* Forecasting Agent */}
        <br></br>
        <>
          <h2 className="text-2xl font-bold mb-4">Forecasting Agent</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Final Forecasted Price</p>
              <p className="text-xl font-bold">DEMO</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">% Change</p>
              <p className="text-xl font-bold text-red-500">
                {stock.dayChange >= 0 ? '+' : ''}
                {stock.dayChange.toFixed(2)}%
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Trend Direction</p>
              <p className="text-xl font-bold">${stock.high52W.toFixed(2)}</p>
            </div>
          </div>
        </>

        {/* Decision Agent Buttons: Two buttons in a grid with 2 columns */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            variant="contained"
            size="large"
            className="bg-green-500 hover:bg-green-600 text-white w-full"
            onClick={() => alert('Ask Decision Agent clicked')}
          >
            Ask Decision Agent
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="border border-gray-400 text-white hover:text-white hover:border-white w-full"
            onClick={onClose}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
