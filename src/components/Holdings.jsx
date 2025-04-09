import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Holdings = ({ stocks, onSelectStock }) => {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1,
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <span className="bg-blue-500 w-2 h-6 rounded mr-2"></span>
        Holdings
      </h2>
      
      <div className="space-y-6">
        {stocks.map((stock) => {
          // Calculate profit/loss in dollars and percentage
          const profitLoss = (stock.currentPrice - stock.avgPrice) * stock.qty;
          const changePercentage = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
          // Set the text color based on whether the stock is in profit or loss
          const profitLossColor = stock.currentPrice >= stock.avgPrice ? "text-green-500" : "text-red-500";
          const isProfit = stock.currentPrice >= stock.avgPrice;
          
          return (
            <div 
              key={stock.ticker}
              className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 cursor-pointer transform transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-500"
              onClick={() => onSelectStock(stock)}
            >
              {/* Header with company info and price */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="bg-gray-600 p-3 rounded-lg mr-3">
                    <p className="text-xl font-bold text-white">{stock.ticker.slice(0, 2)}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{stock.ticker}</h3>
                    <p className="text-gray-400 text-base">{stock.name}</p>
                  </div>
                </div>
                <div className="text-right flex items-center">
                  <div>
                    <p className="font-medium text-gray-400 text-base">Last Trade</p>
                    <p className="font-bold text-xl">${stock.currentPrice.toFixed(2)}</p>
                  </div>
                  <div className={`ml-2 p-3 rounded-full ${isProfit ? 'bg-green-900 bg-opacity-20' : 'bg-red-900 bg-opacity-20'}`}>
                    {isProfit ? <TrendingUp className="text-green-500" size={20} /> : <TrendingDown className="text-red-500" size={20} />}
                  </div>
                </div>
              </div>
              
              {/* Metrics grid */}
              <div className="mt-3 grid grid-cols-3 gap-6">
                <div className="p-3 rounded-lg hover:bg-gray-600">
                  <p className="text-gray-400 text-md font-medium mb-1">Quantity</p>
                  <p className="font-semibold text-2xl">{stock.qty.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg hover:bg-gray-600">
                  <p className="text-gray-400 text-md font-medium mb-1">Avg. Price</p>
                  <p className="font-semibold text-2xl">${stock.avgPrice.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-lg hover:bg-gray-600">
                  <p className="text-gray-400 text-md font-medium mb-1">Profit/Loss</p>
                  <p className={`font-semibold text-2xl ${profitLossColor}`}>
                    ${Math.abs(profitLoss).toFixed(2)}
                    {isProfit ? ' (+)' : ' (-)'}
                  </p>
                </div>
                <div className="p-3 rounded-lg hover:bg-gray-600">
                  <p className="text-gray-400 text-md font-medium mb-1">Investment</p>
                  <p className="font-semibold text-2xl">${(stock.qty * stock.avgPrice).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg hover:bg-gray-600">
                  <p className="text-gray-400 text-md font-medium mb-1">Current Value</p>
                  <p className="font-semibold text-2xl">${(stock.qty * stock.currentPrice).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg hover:bg-gray-600">
                  <p className="text-gray-400 text-md font-medium mb-1">P/L %</p>
                  <p className={`font-semibold flex items-center text-2xl ${profitLossColor}`}>
                    {isProfit && '+'}{changePercentage.toFixed(2)}%
                    {isProfit ? 
                      <TrendingUp className="ml-1" size={14} /> : 
                      <TrendingDown className="ml-1" size={14} />
                    }
                  </p>
                </div>
              </div>
              
              {/* View details button
              <div className="mt-4 flex justify-end">
                <button className="flex items-center text-blue-400 text-sm hover:text-blue-300 transform transition-transform hover:translate-x-1">
                  View details <ArrowRight size={16} className="ml-1" />
                </button>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holdings;