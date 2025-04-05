import React, { useState } from 'react';
import Header from './components/Header';
import PortfolioSummary from './components/PortfolioSummary';
import Indices from './components/Indices';
import Holdings from './components/Holdings';
import StockDetail from './components/StockDetail';

// Mock stock data
const mockStockData = {
  stocks: [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      qty: 100,
      avgPrice: 180.0,
      currentPrice: 188.38,
      dayChange: -2.5,       // Day change in percentage
      high52W: 198.23,       // 52-week high
      low52W: 124.17,        // 52-week low
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      qty: 50,
      avgPrice: 400.0,
      currentPrice: 425.52,
      dayChange: 1.2,
      high52W: 450.00,
      low52W: 280.50,
    },
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      qty: 80,
      avgPrice: 150.0,
      currentPrice: 147.74,
      dayChange: 0.8,
      high52W: 160.00,
      low52W: 115.00,
    },
  ],
};

// Generate chart data: historical data for 15 months and predicted for next 5 months (predicted = 0 for now)
const generateChartData = () => {
  const currentDate = new Date();
  const data = [];

  // Historical data (past 15 months)
  for (let i = 14; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    const price = Number((Math.random() * 50 + 100).toFixed(2));
    data.push({
      date: date.toISOString().slice(0, 10),
      price,
      predictedPrice: null,
    });
  }

  // Predicted data (next 5 months; predicted price = 0 for now)
  for (let i = 1; i <= 5; i++) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + i);
    data.push({
      date: date.toISOString().slice(0, 10),
      price: null,
      predictedPrice: 0,
    });
  }
  return data;
};

const chartData = generateChartData();

function App() {
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <PortfolioSummary stocks={mockStockData.stocks} />
        <Indices
          indicesData={[
            { name: 'Dow Jones', value: '34,000', change: '+200' },
            { name: 'S&P 500', value: '4,100', change: '+30' },
          ]}
        />
        <Holdings stocks={mockStockData.stocks} onSelectStock={setSelectedStock} />
      </main>
      {selectedStock && (
        <StockDetail
          stock={selectedStock}
          chartData={chartData}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
}

export default App;
