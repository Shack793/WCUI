import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import {
  Megaphone, Clock, CheckCircle, XCircle, Download, User, Wallet, DollarSign,
} from "lucide-react";
import Footer from '../components/layout/Footer';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import Navbar from '../components/layout/Navbar';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

interface DashboardStats {
  totalCampaigns: number;
  pendingCampaigns: number;
  approvedCampaigns: number;
  rejectedCampaigns: number;
  receivedDonation: number;
  myDonation: number;
  availableBalance: number;
  withdrawalAmount: number;
}

interface ChartData {
  month: string;
  value: number;
}

interface UserType {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats] = useState<DashboardStats>({
    totalCampaigns: 3,
    pendingCampaigns: 0,
    approvedCampaigns: 3,
    rejectedCampaigns: 0,
    receivedDonation: 5950.0,
    myDonation: 1000.0,
    availableBalance: 5850.0,
    withdrawalAmount: 100.0,
  });

  const [donationData, setDonationData] = useState<ChartData[]>([]);
  const [withdrawData, setWithdrawData] = useState<ChartData[]>([]);

  const sampleDonationData: ChartData[] = [
    { month: "Jan", value: 1000 }, { month: "Feb", value: 2000 }, { month: "Mar", value: 6000 },
    { month: "Apr", value: 4000 }, { month: "May", value: 3000 }, { month: "Jun", value: 2000 },
    { month: "Jul", value: 1000 }, { month: "Aug", value: 500 }, { month: "Sep", value: 300 },
    { month: "Oct", value: 200 }, { month: "Nov", value: 100 }, { month: "Dec", value: 50 },
  ];

  const sampleWithdrawData: ChartData[] = [
    { month: "Jan", value: 0 }, { month: "Feb", value: 10 }, { month: "Mar", value: 30 },
    { month: "Apr", value: 80 }, { month: "May", value: 60 }, { month: "Jun", value: 40 },
    { month: "Jul", value: 20 }, { month: "Aug", value: 10 }, { month: "Sep", value: 5 },
    { month: "Oct", value: 3 }, { month: "Nov", value: 2 }, { month: "Dec", value: 1 },
  ];

  useEffect(() => {
    setDonationData(sampleDonationData);
    setWithdrawData(sampleWithdrawData);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } catch (err) {
      // Optionally handle error
    }
  };

  // Simple StatCard and FinancialCard components
  const StatCard = ({ title, value, icon, bgColor, textColor, onClick }: any) => (
    <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-sm cursor-pointer`} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold mb-1">{value}</div>
          <div className="text-sm opacity-90">{title}</div>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  const FinancialCard = ({ title, amount, icon, bgColor, textColor }: any) => (
    <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold mb-1">₵{amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}</div>
          <div className="text-sm opacity-90">{title}</div>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar userName={user?.name || ''} />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#005da7] to-[#005da7] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Dashboard</h1>
            <nav className="text-white text-lg">
              <span className="opacity-80">Home</span>
            </nav>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 fill-gray-50">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Campaign"
            value={stats.totalCampaigns}
            icon={<Megaphone />}
            bgColor="bg-[#005da7]"
            textColor="text-white"
            onClick={() => navigate('/all-campaigns')}
          />
          <StatCard
            title="Pending Campaign"
            value={stats.pendingCampaigns}
            icon={<Clock />}
            bgColor="bg-orange-500"
            textColor="text-white"
          />
          <StatCard
            title="Approved Campaign"
            value={stats.approvedCampaigns}
            icon={<CheckCircle />}
            bgColor="bg-[#005da7]"
            textColor="text-white"
          />
          <StatCard
            title="Rejected Campaign"
            value={stats.rejectedCampaigns}
            icon={<XCircle />}
            bgColor="bg-red-500"
            textColor="text-white"
          />
        </div>
        {/* Financial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FinancialCard
            title="Received Donation"
            amount={stats.receivedDonation}
            icon={<Download />}
            bgColor="bg-blue-500"
            textColor="text-white"
          />
          <FinancialCard
            title="My Donation"
            amount={stats.myDonation}
            icon={<User />}
            bgColor="bg-purple-500"
            textColor="text-white"
          />
          <FinancialCard
            title="Available Balance"
            amount={stats.availableBalance}
            icon={<Wallet />}
            bgColor="bg-[#005da7]"
            textColor="text-white"
          />
          <FinancialCard
            title="Withdrawal Amount"
            amount={stats.withdrawalAmount}
            icon={<DollarSign />}
            bgColor="bg-orange-500"
            textColor="text-white"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Donation Report */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-[#005da7] text-white p-4 rounded-t-lg mb-4">
              <h3 className="text-lg font-semibold">Monthly Donation Report</h3>
              <p className="text-sm opacity-90">Year - 2024</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area type="monotone" dataKey="value" stroke="#005da7" fill="#005da7" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Withdraw Report */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-[#005da7] text-white p-4 rounded-t-lg mb-4">
              <h3 className="text-lg font-semibold">Monthly Withdraw Report</h3>
              <p className="text-sm opacity-90">Year - 2024</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={withdrawData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area type="monotone" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;