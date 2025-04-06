import React from 'react';

const Holdings = ({ stocks, onSelectStock }) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">📈 Your Portfolio Holdings</h2>
      <div className="space-y-6">
        {stocks.map((stock) => {
          const profitLoss = (stock.currentPrice - stock.avgPrice) * stock.qty;
          const changePercentage = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
          const profitLossColor = stock.currentPrice >= stock.avgPrice ? "text-green-400" : "text-red-400";

          return (
            <div
              key={stock.ticker}
              className="bg-gray-800 rounded-xl p-5 shadow-md transform transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelectStock(stock)}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{stock.ticker}</h3>
                  <p className="text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Last Price</p>
                  <p className="text-lg font-bold text-white">${stock.currentPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-white">
                <div>
                  <p className="text-gray-400">Quantity</p>
                  <p>{stock.qty}</p>
                </div>
                <div>
                  <p className="text-gray-400">Avg. Price</p>
                  <p>${stock.avgPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Investment</p>
                  <p>${(stock.qty * stock.avgPrice).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Current Value</p>
                  <p>${(stock.qty * stock.currentPrice).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">P/L</p>
                  <p className={`${profitLossColor} font-semibold`}>${profitLoss.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">P/L %</p>
                  <p className={`${profitLossColor} font-semibold`}>{changePercentage.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holdings;