import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicRoute from '@/components/PublicRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
//import CampaignPage from './pages/CampaignPage';
import FaqPage from './pages/FaqPage';
import VolunteerPage from './pages/VolunteerPage';
import SuccessStoryPage from './pages/SuccessStoryPage';
import StartCampaignPage from './pages/StartCampaignPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import MyCampaignPage from './pages/MyCampaignPage';
import DonationsPage from './pages/DonationsPage';
import WithdrawPage from './pages/WithdrawPage';
import TransactionsPage from './pages/TransactionsPage';
import CreateCampaign from './pages/create-campaign';
import AllCampaignsPage from './pages/AllCampaignsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/layout/Navbar';
import PublicCampaignsPage from './pages/PublicCampaignsPage';
import UpcomingCampaignsPage from './pages/UpcomingCampaignsPage';
import ContactPage from './pages/ContactPage';
import CampaignDetailsPage from './pages/Campaign-detail';

const App: React.FC = () => {
  // Add Tawk.to live chat script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67b5c7ba9ab76b190dd3f535/1j10qodic";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          } />
          <Route path="/about" element={
            <PublicRoute>
              <AboutPage />
            </PublicRoute>
          } />
          <Route path="/campaign" element={
            <AllCampaignsPage />
          } />
          <Route path="/faq" element={
            <PublicRoute>
              <FaqPage />
            </PublicRoute>
          } />
          <Route path="/volunteer" element={
            <PublicRoute>
              <VolunteerPage />
            </PublicRoute>
          } />
          <Route path="/success-story" element={
            <PublicRoute>
              <SuccessStoryPage />
            </PublicRoute>
          } />
          <Route path="/start-campaign" element={
            <PublicRoute>
              <StartCampaignPage />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute restricted>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute restricted>
              <RegisterPage />
            </PublicRoute>
          } />
          <Route path="/all-campaigns" element={
            <AllCampaignsPage />
          } />
          <Route path="/public-campaigns" element={
            <PublicRoute>
              <PublicCampaignsPage />
            </PublicRoute>
          } />
          <Route path="/upcoming-campaigns" element={
            <PublicRoute>
              <UpcomingCampaignsPage />
            </PublicRoute>
          } />
          <Route path="/contact" element={
            <PublicRoute>
              <ContactPage />
            </PublicRoute>
          } />
          <Route path="/donate/:slug" element={
            <DonationsPage />
          } />
          <Route path="/DonationsPage/:slug" element={
            <DonationsPage />
          } />
          <Route path="/campaign/:slug" element={<CampaignDetailsPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/my-campaign" element={
            <ProtectedRoute>
              <MyCampaignPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/donations" element={
            <ProtectedRoute>
              <DonationsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/withdraw" element={
            <ProtectedRoute>
              <WithdrawPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/transactions" element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          } />
          <Route path="/create-campaign" element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;