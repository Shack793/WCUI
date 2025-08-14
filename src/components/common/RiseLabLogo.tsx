import React from 'react';
import myEasyDonateLogo from '@/images/logo/MyEasyDonate 4.png';

interface MyEasyDonateLogo {
  className?: string;
}

const MyEasyDonateLogo: React.FC<MyEasyDonateLogo> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={myEasyDonateLogo} alt="MyEasyDonate Logo" className="h-full w-auto" />
      {/* Comment 
      <span className="text-xl font-bold flex items-center">
        <span className="text-black dark:text-white">MyEasy</span>
        <span className="mx-1" />
        <span className="text-red-500">Donate</span>
      </span>*/}
    </div>
  );
};

export default MyEasyDonateLogo;