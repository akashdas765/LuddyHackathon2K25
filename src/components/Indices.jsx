import React from 'react';

const Indices = ({ indicesData }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-center gap-4">
        {indicesData.map((idx) => {
          const isNegative = idx.change.trim().startsWith('-');
          return (
            <div key={idx.name} className="flex items-baseline gap-1">
              <p className="text-gray-400 font-bold">{idx.name}</p>
              <p className="text-xl font-bold text-white">{idx.value}</p>
              <p className={`text-sm ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
                {idx.change}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Indices;
