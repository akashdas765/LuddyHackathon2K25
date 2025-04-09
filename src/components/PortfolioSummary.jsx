import React from 'react';

const PortfolioSummary = ({ stocks }) => {
  // Calculate totals dynamically based on stocks data
  const totalInvestment = stocks.reduce((acc, stock) => acc + stock.qty * stock.avgPrice, 0);
  const totalCurrent = stocks.reduce((acc, stock) => acc + stock.qty * stock.currentPrice, 0);
  const totalPnL = totalCurrent - totalInvestment;
  const profitLossPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg transition-transform transform hover:scale-[1.01]">
      <h2 className="text-2xl font-bold text-white mb-6">📊 Portfolio Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
          <p className="text-gray-400 text-sm">Total Investment</p>
          <p className="text-2xl font-semibold">${totalInvestment.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
          <p className="text-gray-400 text-sm">Current Value</p>
          <p className="text-2xl font-semibold">${totalCurrent.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
          <p className="text-gray-400 text-sm">Profit / Loss</p>
          <p className={`text-2xl font-semibold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${Math.abs(totalPnL).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
          <p className="text-gray-400 text-sm">Change (%)</p>
          <p className={`text-2xl font-semibold ${profitLossPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitLossPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
