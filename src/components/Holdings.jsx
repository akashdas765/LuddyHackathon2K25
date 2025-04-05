import React from 'react';

const Holdings = ({ stocks, onSelectStock }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Holdings</h2>
      <div className="space-y-4">
        {stocks.map((stock) => (
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
                <p className="font-bold">${stock.currentPrice}</p>
                {/* If needed, you can calculate profit/loss percentage here */}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Quantity</p>
                <p>{stock.qty}</p>
              </div>
              <div>
                <p className="text-gray-400">Avg. Price</p>
                <p>${stock.avgPrice}</p>
              </div>
              <div>
                <p className="text-gray-400">Invested</p>
                <p>${(stock.qty * stock.avgPrice).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Current</p>
                <p>${(stock.qty * stock.currentPrice).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holdings;
