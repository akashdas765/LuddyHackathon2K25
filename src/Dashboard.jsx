
import Navbar from './components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioSummary from './components/PortfolioSummary';
import Holdings from './components/Holdings';
import StockDetail from './components/StockDetail';
  function Dashboard() {
    const [selectedStock, setSelectedStock] = useState(null);
    const [mockStockData, setMockStockData] = useState({ stocks: [] });
    const [mockChartData, setMockChartData] = useState([]);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:5000/portfolio')
        .then((response) => setMockStockData({ stocks: response.data.portfolio }))
        .catch((error) => console.error('Error fetching stock data:', error));
    }, []);
  
    useEffect(() => {
      if (selectedStock?.ticker) {
        axios.get(`http://127.0.0.1:5000/data?ticker=${selectedStock.ticker}`, {
          headers: { 'Accept': 'text/csv' }
        })
        .then((response) => {
          const csvText = response.data;
          const lines = csvText.trim().split('\n');
          const headers = lines[0].split(',');
          const dateIndex = headers.indexOf('Date');
          const closeIndex = headers.indexOf('Close');
  
          const chartData = lines.slice(1).map(line => {
            const cols = line.split(',');
            return {
              date: cols[dateIndex],
              price: parseFloat(cols[closeIndex])
            };
          }).filter(item => item.date && !isNaN(item.price));
  
          setMockChartData(chartData);
        })
        .catch((error) => console.error('Error fetching chart data:', error));
      }
    }, [selectedStock]);
  
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
  
        <main className="bg-black mx-auto p-4 space-y-6">
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
  