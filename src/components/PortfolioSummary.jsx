import React from 'react';

const PortfolioSummary = ({ stocks }) => {
  // Calculate totals dynamically based on stocks data
  const totalInvestment = stocks.reduce((acc, stock) => acc + stock.qty * stock.avgPrice, 0);
  const totalCurrent = stocks.reduce((acc, stock) => acc + stock.qty * stock.currentPrice, 0);
  const totalPnL = totalCurrent - totalInvestment;
  const profitLossPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-gray-400 mb-2">Total Investment</h2>
          <div className="text-3xl font-bold">${totalInvestment.toLocaleString()}</div>
        </div>
        <div>
          <h2 className="text-gray-400 mb-2">Current Value</h2>
          <div className="text-3xl font-bold">${totalCurrent.toLocaleString()}</div>
        </div>
        <div>
          <h2 className="text-gray-400 mb-2">Profit/Loss</h2>
          <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${Math.abs(totalPnL).toLocaleString()} ({profitLossPercentage.toFixed(2)}%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
