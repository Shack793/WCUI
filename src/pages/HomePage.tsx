import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import DonationForm from '../components/home/DonationForm';
import AboutSection from '../components/home/AboutSection';
import TrendingCampaigns from '../components/home/TrendingCampaigns';
import CampaignCategories from '../components/home/CampaignCategories';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <TrendingCampaigns />
        {/*
        <CampaignCategoies />
        */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;