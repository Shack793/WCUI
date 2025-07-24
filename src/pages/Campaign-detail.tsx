"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Copy, Facebook, Twitter, MessageCircle, ChevronLeft, TrendingUp, User, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
// Make sure the dialog component exists at the correct path, or update the import path accordingly
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import QRCodeModal from '@/components/QRCodeModal';
import { CampaignDetailSkeleton } from '@/components/ui/shimmer';

interface Campaign {
  id: number
  user_id: number
  category_id: number
  title: string
  slug: string
  description: string
  goal_amount: string
  current_amount: string
  start_date: string
  end_date: string
  status: string
  visibility: string
  thumbnail: string | null
  image_url: string | null
  created_at: string
  updated_at: string
  is_boosted: boolean
  boost_ends_at: string | null
  boost_ends_at_formatted: string | null
  boost_days_remaining: number | null
  category: {
    id: number
    name: string
    description: string
  }
  user: {
    id: number
    name: string
    email: string
  }
}

interface Donation {
  id: number
  donor_name: string
  amount: string
  message: string
  is_anonymous: boolean
  created_at: string
}

export default function CampaignDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  // Add state for image error
  const [imgError, setImgError] = useState(false);
  // Add new state for recent donations and stats
  const [recentStats, setRecentStats] = useState<{
    totalRaised: string;
    goalAmount: string;
    totalDonations: number;
    recentDonations: any[];
  } | null>(null);

  // Mock recent donations data
  const mockDonations: Donation[] = [
    {
      id: 1,
      donor_name: "Emily Bodin",
      amount: "100.00",
      message: "Recent donation",
      is_anonymous: false,
      created_at: "2025-01-24T10:00:00Z",
    },
    {
      id: 2,
      donor_name: "Anonymous",
      amount: "1635.00",
      message: "Top donation",
      is_anonymous: true,
      created_at: "2025-01-23T15:30:00Z",
    },
    {
      id: 3,
      donor_name: "Anonymous",
      amount: "100.00",
      message: "First donation",
      is_anonymous: true,
      created_at: "2025-01-22T09:15:00Z",
    },
  ]

  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/campaigns/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch campaign');
        const data = await response.json();
        setCampaign(data); // API returns the campaign object directly
        setDonations(mockDonations);
      } catch (e: any) {
        setError('Failed to fetch campaign details');
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentDonations = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/campaigns/${slug}/donations/recent`);
        if (!res.ok) throw new Error('Failed to fetch recent donations');
        const stats = await res.json();
        setRecentStats(stats);
        if (!stats.recentDonations || stats.recentDonations.length === 0) {
          console.warn('No recent donations found for this campaign:', slug);
        }
      } catch (e) {
        setRecentStats(null);
        console.error('Error fetching recent donations:', e);
      }
    };

    if (slug) {
      fetchCampaign();
      fetchRecentDonations();
    }
  }, [slug]);

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(Number.parseFloat(amount))
  }

  const calculateProgress = (current: string, goal: string) => {
    const currentAmount = Number.parseFloat(current)
    const goalAmount = Number.parseFloat(goal)
    return goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0
  }

  const formatGoalAmount = (amount: string) => {
    const num = Number.parseFloat(amount)
    if (num >= 1000000) {
      return `₵${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `₵${(num / 1000).toFixed(0)}K`
    }
    return formatCurrency(amount)
  }

  const getDonationCount = () => {
    // Mock donation count based on current amount
    const amount = Number.parseFloat(campaign?.current_amount || "0")
    return Math.floor(amount / 100) // Rough estimate
  }

  const getCurrentUrl = () => {
    return window.location.href
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentUrl())
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL")
    }
  }

  const handleDonate = () => {
    if (campaign?.slug) {
      localStorage.setItem('last_campaign_slug', campaign.slug);
      navigate(`/donate/${campaign.slug}`);
    }
  };

  const handleShare = (platform: string) => {
    const url = getCurrentUrl()
    const text = `Help support: ${campaign?.title}`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
        break
    }
  }

  // Replace the getImageUrl function with the one from PublicCampaignsPage.tsx
  const getImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg?height=200&width=400";
    if (url.startsWith("http")) return url;
    return `http://127.0.0.1:8000${url}`;
  };

  // Add a toast for download success (optional, simple alert for now)
  const handleToast = (msg: string) => alert(msg);

  // Human Icon component for consistent styling
  const HumanIcon: React.FC<{
    size?: 'sm' | 'md' | 'lg';
    isAnonymous?: boolean;
    isOrganizer?: boolean;
    className?: string;
  }> = ({ size = 'md', isAnonymous = false, isOrganizer = false, className = '' }) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16'
    };

    const iconSizes = {
      sm: 16,
      md: 24,
      lg: 32
    };

    // Different gradient colors for different user types
    const getBackgroundClass = () => {
      if (isOrganizer) {
        return 'bg-gradient-to-br from-[#37b7ff] to-[#2a9ae6]';
      }
      if (isAnonymous) {
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
      }
      return 'bg-gradient-to-br from-primary-400 to-primary-600';
    };

    return (
      <div className={`${sizeClasses[size]} rounded-full ${getBackgroundClass()} flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg ${className}`}>
        {isAnonymous ? (
          <UserX size={iconSizes[size]} className="text-white" />
        ) : (
          <User size={iconSizes[size]} className="text-white" />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-white">
          <CampaignDetailSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-red-500">{error || "Campaign not found"}</div>
        </div>
        <Footer />
      </div>
    )
  }

  const progress = calculateProgress(campaign.current_amount, campaign.goal_amount)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 p-0 h-auto font-normal text-gray-600 hover:text-gray-800"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to campaigns
          </Button>
          {/* Campaign Title */}
          <div className="text-center mb-8">
            <h1 className="text-base md:text-2xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
            {campaign.is_boosted && (
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                <span className="mr-2">⭐</span>
                Boosted Campaign
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Image */}
              <div className="relative">
                <img
                  src={getImageUrl(campaign.image_url)}
                  alt={campaign.title}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={e => {
                    setImgError(true);
                    console.error('Image failed to load:', getImageUrl(campaign.image_url));
                  }}
                  style={imgError ? { display: 'none' } : {}}
                />
                {imgError && (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                    <span className="text-gray-400">Image not available</span>
                  </div>
                )}
              </div>
              {/* Organizer Info */}
              <div className="flex items-center space-x-3">
                <HumanIcon size="md" isOrganizer={true} />
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">{campaign.user?.name || 'the beneficiary'}</span> is organizing this fundraiser.
                  </p>
                </div>
              </div>

              {/* Donation Protected Badge */}
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <span className="mr-1">✓</span> Donation protected
              </Badge>

              {/* Campaign Description */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{campaign.description}</p>
              </div>

              {/* Reaction Emojis */}
              <div className="flex space-x-2 pt-4">
              
              </div>
              
            </div>
            {/* Right Column - Donation Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <CardContent className="p-0 space-y-4">
                  {/* Amount Raised */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{formatCurrency(campaign.current_amount)}</div>
                      <div className="text-sm text-gray-600">raised</div>
                    </div>
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeDasharray={`${progress}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold text-green-600">{Math.round(progress)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Goal and Donations Count */}
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{recentStats?.goalAmount ? formatGoalAmount(recentStats.goalAmount) : formatGoalAmount(campaign.goal_amount)}</span> goal •{" "}
                    <span className="font-semibold">{recentStats?.totalDonations ?? 0}</span> donations
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
                      onClick={() => setShareModalOpen(true)}
                    >
                      Share
                    </Button>
                   
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                      onClick={handleDonate}
                    >
                      Donate now
                    </Button>
                  </div>

                  {/* Recent Activity */}
                  <div className="pt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-600">
                        {recentStats?.recentDonations?.length ?? 0} people just donated
                      </span>
                    </div>
                    {/* Recent Donations */}
                    <div className="space-y-3">
                      {(recentStats?.recentDonations || []).slice(0, 5).map((donation, idx) => (
                        <div key={donation.id || idx} className="flex items-center space-x-3">
                          <HumanIcon size="sm" isAnonymous={!donation.user_id} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {donation.user_id ? (donation.donor_name || 'Anonymous') : 'Anonymous'} donated {formatCurrency(donation.amount)}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">{donation.contribution_date}</p>
                          </div>
                        </div>
                      ))}
                      {(!recentStats?.recentDonations || recentStats.recentDonations.length === 0) && (
                        <div className="text-gray-400 text-sm">No recent contributions found.</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      {/* Share Modal */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              <span className="your-class">Share this campaign</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* QR Code Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => {
                  setShareModalOpen(false);
                  setQrModalOpen(true);
                }}
              >
                <span className="text-2xl mb-1">📱</span>
                <span className="text-xs">Show QR Code</span>
              </Button>
            </div>

            {/* Social Media Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="h-6 w-6 text-blue-600 mb-1" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="h-6 w-6 text-blue-400 mb-1" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleShare("whatsapp")}
              >
                <MessageCircle className="h-6 w-6 text-green-600 mb-1" />
                <span className="text-xs">WhatsApp</span>
              </Button>
            </div>

            {/* URL Copy */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Campaign URL</label>
              <div className="flex space-x-2">
                <Input value={getCurrentUrl()} readOnly className="flex-1" />
                <Button variant="outline" onClick={handleCopyUrl} className={copySuccess ? "text-green-600" : ""}>
                  <Copy className="h-4 w-4" />
                  {copySuccess ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* QR Code Modal */}
      <QRCodeModal
        url={getCurrentUrl()}
        open={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        onToast={handleToast}
      />
      <Footer />
    </div>
  )
}
