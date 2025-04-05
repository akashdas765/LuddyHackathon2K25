import React from 'react';
import { Search, User } from 'lucide-react';

const Header = () => (
  <header className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Stock Portfolio</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
);

export default Header;
