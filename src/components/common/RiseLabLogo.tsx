import React from 'react';
import wggLogo from '@/images/logo/wgg.png';

interface RiseLabLogoProps {
  className?: string;
}

const RiseLabLogo: React.FC<RiseLabLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={wggLogo} alt="WGCrowdfunding Logo" className="w-8 h-8 mr-2" />
      <span className="text-xl font-bold flex items-center">
        <span className="text-black dark:text-white">WG</span>
        <span className="mx-1" />
        <span className="text-red-500">Crowdfunding</span>
      </span>
    </div>
  );
};

export default RiseLabLogo;