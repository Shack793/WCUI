import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import myEasyDonateLogo from '@/images/logo/MyEasyDonate 3.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="bg-gray-950 py-6">
        <div className="container-custom">
          {/* Two Row Footer: Logo positioned above social links, with copyright and navigation on sides */}
          <div className="flex flex-col space-y-4">
            {/* Bottom Row: Copyright (left), Logo+Social (center), Navigation (right) */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full space-y-4 lg:space-y-0">
              {/* Left Side: Copyright */}
              <div className="flex-1 lg:flex-none">
                <p className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">
                  &copy; {new Date().getFullYear()} MyEasyDonate. All rights reserved.
                </p>
              </div>
              
              {/* Center: Logo above Social Media Icons */}
              <div className="flex flex-col items-center space-y-3">
                <img 
                  src={myEasyDonateLogo} 
                  alt="MyEasyDonate Logo" 
                  className="h-10 w-auto"
                />
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/waltergatesgh/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <Facebook size={16} />
                  </a>
                  <a href="https://www.linkedin.com/company/waltergates-ghana-limited" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href="https://www.instagram.com/watergatesghlimited" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
              
              {/* Right Side: Navigation Links */}
              <div className="flex-1 lg:flex-none">
                <div className="flex flex-wrap justify-center lg:justify-end space-x-3 sm:space-x-4 md:space-x-6">
                  <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors text-xs sm:text-sm">
                    About Us
                  </Link>
                  <Link to="/public-campaigns" className="text-gray-400 hover:text-primary-500 transition-colors text-xs sm:text-sm">
                    Campaigns
                  </Link>
                  <Link to="/faq" className="text-gray-400 hover:text-primary-500 transition-colors text-xs sm:text-sm">
                    FAQ
                  </Link>
                  {/* <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                    Privacy Policy
                  </Link>
                  <Link to="/terms-of-service" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                    Terms of Service
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;