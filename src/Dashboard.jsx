import React, { useState } from 'react';
import Header from './components/Header';
import PortfolioSummary from './components/PortfolioSummary';
import Holdings from './components/Holdings';
import StockDetail from './components/StockDetail';
import Navbar from './components/Navbar';

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
  
  const mockChartData = Array.from({ length: 20 }, (_, i) => ({
    date: `2024-${String(i + 1).padStart(2, '0')}-01`,
    price: Number((Math.random() * 100 + 100).toFixed(2)),
  }));

  function Dashboard() {
    const [selectedStock, setSelectedStock] = useState(null);
  
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
  
        <main className="container mx-auto p-4 space-y-6">
          <PortfolioSummary stocks={mockStockData.stocks} />
          <Holdings stocks={mockStockData.stocks} onSelectStock={setSelectedStock} />
        </main>
  
        {selectedStock && (
          <StockDetail
            stock={selectedStock}
            chartData={mockChartData}
            onClose={() => setSelectedStock(null)}
          />
        )}
      </div>
    );
  }
  
  export default Dashboard;
  