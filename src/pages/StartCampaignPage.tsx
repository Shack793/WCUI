import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const StartCampaignPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold mb-8">Start a Campaign</h1>
          <p className="mb-4">This is the Start a Campaign page. Content will be added here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartCampaignPage;