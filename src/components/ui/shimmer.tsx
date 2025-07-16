import React from 'react';
import { cn } from '@/lib/utils';

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

// Base shimmer component with animated gradient
export const Shimmer: React.FC<ShimmerProps> = ({ className, children, delay = 0 }) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]",
        className
      )}
      style={{
        animation: `shimmer 1.5s ease-in-out infinite`,
        animationDelay: `${delay}ms`,
        backgroundSize: '200% 100%',
      }}
    >
      {children}
    </div>
  );
};

// Campaign card skeleton for grid layouts
interface CampaignCardSkeletonProps {
  variant?: 'default' | 'compact';
}

export const CampaignCardSkeleton: React.FC<CampaignCardSkeletonProps> = ({ variant = 'default' }) => {
  // Add some randomness to make it look more natural
  const titleWidths = ['w-full', 'w-5/6', 'w-4/5'];
  const secondLineWidths = ['w-3/4', 'w-2/3', 'w-4/5'];
  const randomTitleWidth = titleWidths[Math.floor(Math.random() * titleWidths.length)];
  const randomSecondWidth = secondLineWidths[Math.floor(Math.random() * secondLineWidths.length)];

  return (
    <div className="card bg-white overflow-hidden">
      {/* Image skeleton */}
      <div className="relative">
        <Shimmer className="w-full h-56" />
        {/* Status badge skeleton */}
        <div className="absolute top-4 left-4">
          <Shimmer className="w-16 h-6 rounded-full" />
        </div>
      </div>

      {/* Card content */}
      <div className={variant === 'compact' ? 'p-4 space-y-3' : 'p-6 space-y-4'}>
        {/* Date and contributions skeleton */}
        <div className="flex items-center justify-between">
          <Shimmer className="w-32 h-4" />
          <Shimmer className="w-24 h-4" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <Shimmer className={`${randomTitleWidth} h-6`} />
          <Shimmer className={`${randomSecondWidth} h-6`} />
        </div>

        {/* Progress section skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Shimmer className="w-24 h-4" />
            <Shimmer className="w-20 h-4" />
          </div>
          <Shimmer className="w-full h-2 rounded-full" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex justify-between items-center">
          <Shimmer className="w-24 h-4" />
          <Shimmer className="w-16 h-4" />
        </div>
      </div>
    </div>
  );
};

// Campaign detail page skeleton
export const CampaignDetailSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button skeleton */}
      <Shimmer className="w-32 h-6 mb-6" />
      
      {/* Title skeleton */}
      <div className="mb-8 text-center space-y-2">
        <Shimmer className="w-3/4 h-10 mx-auto" />
        <Shimmer className="w-1/2 h-10 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Image skeleton */}
          <Shimmer className="w-full h-96 rounded-lg" />
          
          {/* Organizer Info skeleton */}
          <div className="flex items-center space-x-3">
            <Shimmer className="h-12 w-12 rounded-full" />
            <Shimmer className="w-64 h-4" />
          </div>
          
          {/* Badge skeleton */}
          <Shimmer className="w-32 h-6 rounded" />
          
          {/* Description skeleton */}
          <div className="space-y-3">
            <Shimmer className="w-full h-4" />
            <Shimmer className="w-full h-4" />
            <Shimmer className="w-3/4 h-4" />
            <Shimmer className="w-full h-4" />
            <Shimmer className="w-5/6 h-4" />
          </div>
          
          {/* Reaction emojis skeleton */}
          <div className="flex space-x-2 pt-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Shimmer key={i} className="w-10 h-10 rounded" />
            ))}
          </div>
        </div>
        
        {/* Right Column - Donation Info */}
        <div className="space-y-6">
          <DonationCardSkeleton />
        </div>
      </div>
    </div>
  );
};

// Donation card skeleton
export const DonationCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      {/* Amount raised section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Shimmer className="w-32 h-8" />
          <Shimmer className="w-16 h-4" />
        </div>
        <Shimmer className="w-16 h-16 rounded-full" />
      </div>
      
      {/* Goal and donations count */}
      <Shimmer className="w-48 h-4" />
      
      {/* Action buttons */}
      <div className="space-y-3">
        <Shimmer className="w-full h-10 rounded" />
        <Shimmer className="w-full h-10 rounded" />
      </div>
      
      {/* Recent activity header */}
      <div className="pt-4">
        <div className="flex items-center space-x-2 mb-4">
          <Shimmer className="w-4 h-4" />
          <Shimmer className="w-32 h-4" />
        </div>
        
        {/* Recent donations */}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <DonationItemSkeleton key={i} />
          ))}
        </div>
        
        {/* See all/top buttons */}
        <div className="flex space-x-2 mt-4">
          <Shimmer className="flex-1 h-8 rounded" />
          <Shimmer className="flex-1 h-8 rounded" />
        </div>
      </div>
    </div>
  );
};

// Individual donation item skeleton
export const DonationItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <Shimmer className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <Shimmer className="w-24 h-4" />
          <Shimmer className="w-16 h-4" />
        </div>
        <Shimmer className="w-32 h-3" />
      </div>
    </div>
  );
};
