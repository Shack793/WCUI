import React from 'react';
import wggLogo from '@/images/logo/wgg.png';

interface MyEasyDonateLogo {
  className?: string;
}

const MyEasyDonateLogo: React.FC<MyEasyDonateLogo> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={wggLogo} alt="MyEasyDonate Logo" className="w-8 h-8 mr-2" />
      <span className="text-xl font-bold flex items-center">
        <span className="text-black dark:text-white">MyEasy</span>
        <span className="mx-1" />
        <span className="text-red-500">Donate</span>
      </span>
    </div>
  );
};

export default MyEasyDonateLogo;