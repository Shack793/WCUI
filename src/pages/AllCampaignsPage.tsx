import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "@/lib/axios";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// Import your UI components (adjust import paths as needed)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { categoryApi } from "../services/api";
import DashboardNavbar from "../components/layout/DashboardNavbar";

interface Campaign {
  id: number;
  title: string;
  category_id: number; // Add this line to match JSON data
  category: { id: number; name: string } | null;
  goal_amount: number;
  current_amount: number;
  end_date: string;
  status: string;
  created_at: string;
  approvalStatus?: string;
  campaignStatus?: string;
}

export default function AllCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Campaign | "category">("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{id:number, name:string}[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        // Do not send Authorization header if no token
        const token = localStorage.getItem('token');
        const headers: any = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await axios.get('https://admin.myeasydonate.com/api/v1/campaigns/all', {
          headers
        });
        setCampaigns(res.data || []);
        setFilteredCampaigns(res.data || []);
      } catch (e: any) {
        setError(e.response?.data?.message || 'Failed to fetch campaigns');
        setCampaigns([]);
        setFilteredCampaigns([]);
        // Do not redirect to login for unauthenticated users
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryApi.getAll();
        setCategories(res.data || []);
      } catch (e) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  // Get unique campaign statuses from campaigns data
  const campaignStatuses = React.useMemo(() => {
    // Normalize status values for dropdown (capitalize first letter)
    const statuses = campaigns
      .map((c) => c.status)
      .filter(Boolean)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
    return Array.from(new Set(statuses));
  }, [campaigns]);

  useEffect(() => {
    const filtered = campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (campaign.category?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || campaign.category_id === (typeof categoryFilter === 'string' ? Number(categoryFilter) : categoryFilter);
      const matchesStatus = statusFilter === "all" || (campaign.status && statusFilter && campaign.status.toLowerCase() === statusFilter.toLowerCase());
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    // Improved sort function
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle category specially
      if (sortField === 'category') {
        const aName = a.category?.name || '';
        const bName = b.category?.name || '';
        return sortDirection === "asc" ? aName.localeCompare(bName) : bName.localeCompare(aName);
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
    
    setFilteredCampaigns(filtered);
    setCurrentPage(1);
  }, [campaigns, searchTerm, categoryFilter, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  const handleSort = (field: keyof Campaign | "category") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (campaign: Campaign) => {
    console.log('Edit campaign:', campaign);
  };
  const handleView = (campaign: Campaign) => {
    console.log('View campaign:', campaign);
  };
  const handleDelete = (campaignToDelete: Campaign) => {
    setCampaignToDelete(campaignToDelete);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    if (campaignToDelete) {
      // Implement delete API call
      setCampaigns(campaigns.filter((c) => c.id !== campaignToDelete.id));
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
    }
  };
  const handleDuplicate = (campaign: Campaign) => {
    console.log('Duplicate campaign:', campaign);
  };
  const handleExport = () => {
    // Implement export logic
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(amount);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Approved":
      case "Running":
        return "default";
      case "Pending":
      case "Draft":
        return "secondary";
      case "Rejected":
      case "Paused":
        return "destructive";
      case "Completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  const userName = "James"; // Replace with actual user context if available

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar userName={userName} />
      {/* Hero Section (match DonationsPage style) */}
      <div className="bg-[#37b7ff] text-white py-12 relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">All Campaigns</h1>
          <p className="mb-6 text-lg opacity-90">View all campaigns on the platform.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            fill="#ffffff"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </div>
      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          {/* Create Campaign Button */}
          <div className="flex justify-end mb-6">
            <Button asChild className="bg-[#37b7ff] text-white hover:bg-[#2e6e65] font-semibold px-6 py-2 rounded-md">
              <Link to="/create-campaign">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Create Campaign
                </span>
              </Link>
            </Button>
          </div>
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative">
                <Input
                  placeholder="Campaign Category..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-10 w-64"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 bg-[#37b7ff] hover:bg-[#2e6e65]"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Select
                value={categoryFilter === 'all' ? 'all' : String(categoryFilter)}
                onValueChange={val => setCategoryFilter(val === 'all' ? 'all' : Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {campaignStatuses.map((status) => (
                    <SelectItem key={status} value={status!}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          {/* Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#37b7ff] bg-opacity-10">
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("title")}
                      className="h-auto p-0 font-semibold"
                    >
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("category")}
                      className="h-auto p-0 font-semibold"
                    >
                      Category
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("goal_amount")}
                      className="h-auto p-0 font-semibold"
                    >
                      Goal Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("current_amount")}
                      className="h-auto p-0 font-semibold"
                    >
                      Fund Raised
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("end_date")}
                      className="h-auto p-0 font-semibold"
                    >
                      Deadline
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                        <span className="ml-2">Loading campaigns...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : currentCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No campaigns found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentCampaigns.map((campaign, index) => (
                    <TableRow key={campaign.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600 hover:text-green-700 cursor-pointer">
                          {campaign.title.length > 30 ? `${campaign.title.substring(0, 30)}...` : campaign.title}
                        </div>
                      </TableCell>
                      <TableCell>{campaign.category?.name || 'No Category'}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(campaign.goal_amount)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(campaign.current_amount)}</TableCell>
                      <TableCell>{formatDate(campaign.end_date)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(campaign.approvalStatus || "")}
                          className="bg-[#37b7ff] bg-opacity-10 text-[#37b7ff] hover:bg-[#37b7ff] hover:text-white"
                        >
                          {campaign.approvalStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(campaign.status || "")}
                          className="bg-[#37b7ff] bg-opacity-10 text-[#37b7ff] hover:bg-[#37b7ff] hover:text-white"
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#37b7ff] border-[#37b7ff] hover:bg-[#37b7ff] hover:text-white"
                            >
                              Action
                              <MoreVertical className="ml-1 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(campaign)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(campaign)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(campaign)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          {!loading && filteredCampaigns.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-[#37b7ff] hover:bg-[#2e6e65] text-white" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 relative">
        {/* ...footer content... */}
      </footer>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign{" "}
              {campaignToDelete?.title && <strong>"{campaignToDelete?.title}"</strong>} and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete Campaign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
