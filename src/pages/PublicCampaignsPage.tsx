"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Search, Calendar, Heart, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { campaignApi, categoryApi } from "../services/api"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { CampaignCardSkeleton } from '@/components/ui/shimmer'

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

export default function PublicCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<number | "all">("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true)
      setError(null)
      try {
        // Updated endpoint to use public campaigns
        const response = await campaignApi.getPublic()
        const data = response.data
        const campaignsData = Array.isArray(data) ? data : data.data || []

        // Sort campaigns to show boosted ones first
        const sortedCampaigns = campaignsData.sort((a: Campaign, b: Campaign) => {
          // Boosted campaigns come first
          if (a.is_boosted && !b.is_boosted) return -1
          if (!a.is_boosted && b.is_boosted) return 1
          // If both are boosted or both are not boosted, sort by created_at (newest first)
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

        setCampaigns(sortedCampaigns)
        setFilteredCampaigns(sortedCampaigns)
        
        // Debug logging
        console.log('Fetched campaigns:', sortedCampaigns);
        if (sortedCampaigns.length > 0) {
          console.log('Sample campaign structure:', sortedCampaigns[0]);
          console.log('Sample image URL:', sortedCampaigns[0].image_url);
          console.log('Sample image_url type:', typeof sortedCampaigns[0].image_url);
        }
      } catch (e: any) {
        setError("Failed to fetch campaigns")
        setCampaigns([])
        setFilteredCampaigns([])
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryApi.getAll()
        console.log('Categories API response:', res);
        console.log('Categories data:', res.data);
        setCategories(res.data || [])
      } catch (e) {
        console.error('Error fetching categories:', e);
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const filtered = campaigns.filter((campaign) => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
      
      // More robust category matching - handle both string and number comparisons
      let matchesCategory = false;
      if (categoryFilter === "all") {
        matchesCategory = true;
      } else {
        // Convert both to numbers for comparison to handle type mismatches
        const filterAsNumber = typeof categoryFilter === 'string' ? parseInt(categoryFilter) : categoryFilter;
        const campaignCategoryId = typeof campaign.category_id === 'string' ? parseInt(campaign.category_id) : campaign.category_id;
        matchesCategory = campaignCategoryId === filterAsNumber;
      }

      let matchesDate = true
      if (dateRange.start && dateRange.end) {
        const campaignDate = new Date(campaign.start_date)
        const startDate = new Date(dateRange.start)
        const endDate = new Date(dateRange.end)
        matchesDate = campaignDate >= startDate && campaignDate <= endDate
      }

      return matchesSearch && matchesCategory && matchesDate
    })

    setFilteredCampaigns(filtered)
  }, [campaigns, searchTerm, categoryFilter, dateRange])

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

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-[#005da7]"
      case "pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getImageUrl = (url: string | null) => {
    if (!url) {
      console.log('No image URL provided, using placeholder');
      return "/placeholder.svg?height=200&width=400";
    }
    if (url.startsWith("http")) {
      console.log('Using full URL:', url);
      return url;
    }
    const fullUrl = `https://admin.myeasydonate.com${url}`;
    console.log('Constructed image URL:', fullUrl);
    return fullUrl;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

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
            <h1 className="text-5xl font-bold mb-4">Campaigns</h1>
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
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                {/* Filter By Category */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Filter By Category</h3>
                  <Select
                    value={categoryFilter === "all" ? "all" : categoryFilter.toString()}
                    onValueChange={(value) => {
                      console.log('Category selection changed:', value);
                      const newFilter = value === "all" ? "all" : parseInt(value);
                      console.log('Setting category filter to:', newFilter);
                      setCategoryFilter(newFilter);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter by Name */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Filter by name</h3>
              <div className="relative">
                <Input
                  type="text"
                      placeholder="Campaign name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                {/* Filter by Date */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Filter by date</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        type="date"
                        placeholder="Start Date - End Date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                        className="pr-10"
                      />
                      <Calendar
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>
                    <div className="relative">
                      <Input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                        className="pr-10"
                      />
                      <Calendar
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                />
              </div>
            </div>
                </div>
              </div>
          </div>

            {/* Campaign Cards Grid */}
            <div className="lg:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Show 6 skeleton cards while loading with staggered animation */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} style={{ animationDelay: `${index * 150}ms` }}>
                  <CampaignCardSkeleton />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {filteredCampaigns.map((campaign) => (
                    <Link
                      key={campaign.id}
                      to={`/campaign/${campaign.slug}`}
                      className="card bg-white overflow-hidden transform transition-all duration-300 hover:-translate-y-2 block group text-base md:text-lg shadow-lg rounded-xl min-h-[420px]"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="relative">
                        <img
                          src={getImageUrl(campaign.image_url)}
                          alt={campaign.title}
                          className="w-full h-56 object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', getImageUrl(campaign.image_url));
                            console.error('Campaign:', campaign.title);
                            e.currentTarget.src = "/placeholder.svg?height=200&width=400";
                          }}
                        />
                        {campaign.is_boosted && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
                            <span className="mr-1">⭐</span>
                            Boosted
                          </div>
                        )}
                      </div>
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium">Category: {campaign.category?.name || ''}</span>
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
                              window.location.href = `/campaign/${campaign.slug}`;
                            }}
                          >
                            View Details
                          </button>
                          <span className="flex items-center text-primary-500">
                            <Heart size={18} className="mr-1" />
                            Donate
                          </span>
                        </div>
                      </div>
                    </Link>
                      ))}
                    </div>
              )}

              {!loading && filteredCampaigns.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No campaigns found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 
