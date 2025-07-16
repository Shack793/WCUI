import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, User } from 'lucide-react';
import RiseLabLogo from '../common/RiseLabLogo';
import { useAuth } from '@/lib/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Add scroll event listener to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Define navigation items
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'CAMPAIGNS', path: '/public-campaigns' },
    //{ name: 'UPCOMING', path: '/upcoming-campaigns' },
    //{ name: 'SUCCESS STORY', path: '/success-story' },
    { name: 'CONTACT', path: '/contact' },
    //{ name: 'LOGIN', path: '/login' },
    //{ name: 'REGISTER', path: '/register' },
  ];

  // Show minimal navbar if authenticated
  if (isAuthenticated) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <RiseLabLogo className="h-10 w-auto" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-sm text-gray-700 hover:text-primary-500"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="text-sm text-gray-700 hover:text-primary-500 flex items-center font-semibold border border-primary-500 px-4 py-2 rounded-md bg-primary-50"
            >
              <User size={16} className="mr-1" />
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    );
  }
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <RiseLabLogo className="h-10 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  location.pathname === item.path ? 'text-primary-500' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              
            </div>
            
            <div className="flex items-center space-x-4">
              {/* 
              <Link 
                to="/dashboard" 
                className="text-sm text-gray-700 hover:text-primary-500 flex items-center"
              >
                <User size={16} className="mr-1" />
                Dashboard
              </Link>
              */}
          
              
              <Link 
                to="/login" 
                className="btn btn-primary text-sm"
              >
                START A CAMPAIGN
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                    location.pathname === item.path ? 'text-primary-500' : 'text-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-gray-200">
                <Link 
                  to="/start-campaign" 
                  className="btn btn-primary text-sm w-full block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  START A CAMPAIGN
                </Link>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <button className="flex items-center text-sm text-gray-700 hover:text-primary-500">
                  <Globe size={16} className="mr-1" />
                  <span>English</span>
                  <ChevronDown size={16} />
                </button>
                
                <Link 
                  to="/dashboard" 
                  className="text-sm text-gray-700 hover:text-primary-500 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={16} className="mr-1" />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;