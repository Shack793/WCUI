import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { CampaignCardSkeleton } from '@/components/ui/shimmer';

interface Campaign {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  slug: string;
  description: string;
  goal_amount: string;
  current_amount: string;
  start_date: string;
  end_date: string;
  status: string;
  visibility: string;
  thumbnail: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  contributions_count: number;
  is_boosted: boolean;
  boost_ends_at: string | null;
  boost_ends_at_formatted: string | null;
  boost_days_remaining: number | null;
}

const TrendingCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingCampaigns = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/campaigns/trending');
        const data = await response.json();
        const campaignsData = Array.isArray(data) ? data : data.data || [];

        // Sort campaigns to show boosted ones first
        const sortedCampaigns = campaignsData.sort((a: Campaign, b: Campaign) => {
          // Boosted campaigns come first
          if (a.is_boosted && !b.is_boosted) return -1
          if (!a.is_boosted && b.is_boosted) return 1
          // If both are boosted or both are not boosted, sort by created_at (newest first)
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

        setCampaigns(sortedCampaigns);
      } catch (error) {
        console.error('Error fetching trending campaigns:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingCampaigns();
  }, []);

  const getImageUrl = (url: string | null) => {
    if (!url) return '/placeholder.svg?height=200&width=400';
    if (url.startsWith('http')) return url;
    return `http://127.0.0.1:8000${url}`;
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
    }).format(Number.parseFloat(amount));
  };

  const calculateProgress = (current: string, goal: string) => {
    const currentAmount = Number.parseFloat(current);
    const goalAmount = Number.parseFloat(goal);
    return goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;
  };

  return (
    <section className="py-16 bg-primary-500 relative">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Trending Campaigns</h2>
          <p className="text-white opacity-80">
            These campaigns are Trending for their activities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Show 6 skeleton cards while loading with staggered animation
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <CampaignCardSkeleton />
              </div>
            ))
          ) : campaigns.length === 0 ? (
            <div className="col-span-full text-center text-white">No trending campaigns found.</div>
          ) : (
            campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                to={`/campaign/${campaign.slug}`}
                className="card bg-white overflow-hidden transform transition-all duration-300 hover:-translate-y-2 block group"
                style={{ textDecoration: 'none' }}
              >
                <div className="relative">
                  <img
                    src={getImageUrl(campaign.image_url)}
                    alt={campaign.title}
                    className="w-full h-56 object-cover"
                  />
                  {/* <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {campaign.status}
                  </div> */}
                  {campaign.is_boosted && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
                      <span className="mr-1">⭐</span>
                      Boosted
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {/* <span className="text-sm text-gray-500">
                      {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                    </span> */}
                    <span className="text-sm font-medium">Contributions: {campaign.contributions_count}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {campaign.title}
                  </h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{formatCurrency(campaign.current_amount)} Raised</span>
                      <span className="text-gray-500">Goal: {formatCurrency(campaign.goal_amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(calculateProgress(campaign.current_amount, campaign.goal_amount), 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="text-primary-500 font-medium hover:underline cursor-pointer bg-transparent border-none p-0"
                      onClick={e => {
                        e.preventDefault();
                        navigate(`/campaign/${campaign.slug}`);
                      }}
                    >
                      View Details
                    </button>
                    <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors" type="button">
                      <Heart size={18} className="mr-1" />
                      Donate
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingCampaigns;