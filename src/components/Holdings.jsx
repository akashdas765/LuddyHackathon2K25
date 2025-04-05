import React from 'react';

const Holdings = ({ stocks, onSelectStock }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Holdings</h2>
      <div className="space-y-4">
        {stocks.map((stock) => {
          // Calculate profit/loss in dollars and percentage
          const profitLoss = (stock.currentPrice - stock.avgPrice) * stock.qty;
          const changePercentage = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
          // Set the text color based on whether the stock is in profit or loss
          const profitLossColor = stock.currentPrice >= stock.avgPrice ? "text-green-500" : "text-red-500";
          
          return (
            <div 
              key={stock.ticker}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer"
              onClick={() => onSelectStock(stock)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{stock.ticker}</h3>
                  <p className="text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Last Trade Price: ${stock.currentPrice}</p>
                  {/* Additional metrics can be added here */}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400">Quantity</p>
                  <p>{stock.qty}</p>
                </div>
                <div>
                  <p className="text-gray-400">Avg. Price</p>
                  <p>${stock.avgPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Profit/Loss</p>
                  <p className={profitLossColor}>${stock.currentPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Investment</p>
                  <p>${(stock.qty * stock.avgPrice).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Current Value</p>
                  <p>${(stock.qty * stock.currentPrice).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Profit/Loss Percentage</p>
                  <p className={profitLossColor}>
                    {changePercentage.toFixed(2)}%
                  </p>
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
