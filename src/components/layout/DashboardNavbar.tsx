import React from 'react';
import { ChevronDown, Globe, Plus } from 'lucide-react';
import { authApi } from '../../services/authApi';
import { Link } from 'react-router-dom';

const DashboardNavbar: React.FC<{ userName: string }> = ({ userName }) => {
  // Use axios for logout
  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <div className="flex justify-center items-center h-16">
          <h1 className="text-xl font-bold text-gray-800 w-full text-center">Dashboard</h1>
        </div>
        <div className="flex justify-between items-center h-16">
          {/* <div className="flex items-center">
          <img src="/api/placeholder/120/40" alt="nixfund" className="h-8" />
        </div> */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/all-campaigns" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>My Campaign</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link to="/dashboard/donations" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Donations</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link to="/dashboard/withdraw" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Withdraw</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link to="/dashboard/transactions" className="text-gray-700 hover:text-gray-900 cursor-pointer flex items-center">
              <span>Transactions</span>
            </Link>
            {/* Remove Create Campaign button from dashboard navbar */}
            {/* <Link to="/create-campaign" className="flex items-center space-x-1 text-white bg-[#378b7f] px-4 py-2 rounded-md font-semibold hover:bg-[#2e6e65] transition-colors">
              <span>Create Campaign</span>
              <Plus className="w-4 h-4" />
            </Link> */}
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>{userName}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-[#005da7] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-400" onClick={handleLogout}>
              Logout
            </button>
            <div className="flex items-center space-x-1 text-gray-700 cursor-pointer">
              <Globe className="w-4 h-4" />
              <span className="text-sm">English</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
