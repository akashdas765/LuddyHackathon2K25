import React from 'react';
import { TrendingUp, BarChart2, Users } from 'lucide-react';

const Navigation = () => (
  <nav className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700">
    <div className="container mx-auto">
      <div className="flex justify-around p-4">
        <button className="flex flex-col items-center text-gray-400 hover:text-white">
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs mt-1">Watchlist</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-white">
          <BarChart2 className="w-6 h-6" />
          <span className="text-xs mt-1">Portfolio</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-white">
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">Community</span>
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation;

