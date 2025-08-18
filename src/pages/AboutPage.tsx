import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Hero Section with Wavy Border */}
      <div className="relative">
        <div 
          className="relative h-64 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="text-center z-10 text-white">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <nav className="text-lg">
             
            </nav>
          </div>
        </div>

        {/* Wavy Border */}
       {/*  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Single Image */}
          <div>
            <img 
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Community volunteers working together"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                 Your Story,<br />
                 Shared Boldly
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                At MyEasyDonate, we don’t just process donations. We empower change-makers. We tell stories. We rally communities. We give dreams a fighting chance.
                Start your campaign today. Your supporters are waiting.

              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-[#005da7] bg-opacity-10 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-[#005da7] mb-2">GHS 10,000+</h3>
                <p className="text-gray-700 font-medium">Total Fund Raised</p>
              </div>
              <div className="bg-[#005da7] bg-opacity-10 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-[#005da7] mb-2">13+</h3>
                <p className="text-gray-700 font-medium">Total Campaigns</p>
              </div>
            </div>

            <a 
              href="http://dashboard.myeasydonate.com/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mt-8">
                <button className="bg-[#005da7] hover:bg-[#2a8fc7] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                  Start a Campaign
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="flex justify-end pr-16 -mt-16">
        <div className="w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#005da7]">
            <polygon points="50,15 61,35 85,35 67,50 73,70 50,57 27,70 33,50 15,35 39,35" />
          </svg>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
