import React, { useState, useEffect } from "react";
import { Plus, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";
import { campaignApi, categoryApi } from "../services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

// Dummy UI components for demonstration (replace with your UI library or custom components)
const Button = (props: any) => <button {...props} className={`rounded-md px-4 py-2 font-medium transition-colors ${props.className}`} />;
const Input = (props: any) => <input {...props} className={`w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#37b7ff] ${props.className}`} />;
const Textarea = (props: any) => <textarea {...props} className={`w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#37b7ff] ${props.className}`} />;
const Select = (props: any) => <select {...props} className={`w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#37b7ff] appearance-none ${props.className}`} />;
const Card = (props: any) => <div {...props} className={`rounded-md border border-gray-200 ${props.className}`} />;

export default function CreateCampaign() {
  const [campaignData, setCampaignData] = useState({
    title: "",
    category_id: "",
    goal_amount: "",
    start_date: "",
    end_date: "",
    description: "",
    status: "running",
  });

  const [campaignImage, setCampaignImage] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categories, setCategories] = useState<{id:number, name:string}[]>([]);

  // Dummy userName for navbar (replace with actual user context if available)
  const userName = "James";

  const navigate = useNavigate();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCampaignImage(e.target.files[0]);
    }
  };

  const handleCampaignImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCampaignImage(e.target.files[0]);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    // Client-side validation
    if (!campaignData.title || !campaignData.category_id || !campaignData.goal_amount || !campaignData.end_date || !campaignData.description) {
      setError("Please fill in all required fields.");
      return;
    }
    // Ensure selected category_id is valid
    if (!categories.some(cat => String(cat.id) === String(campaignData.category_id))) {
      setError("Please select a valid category.");
      return;
    }
    setLoading(true);
    try {
      // Removed CSRF cookie fetch (not needed for token auth)
      // Prepare payload
      const payload = {
        user_id: 1, // Replace with actual user_id from auth context if available
        category_id: Number(campaignData.category_id),
        title: campaignData.title,
        slug: slugify(campaignData.title),
        description: campaignData.description,
        goal_amount: Number(campaignData.goal_amount),
        start_date: campaignData.start_date,
        end_date: campaignData.end_date,
        status: campaignData.status,
      };
      await campaignApi.create(payload); // Uses Axios with token interceptor
      setSuccess("Campaign created successfully!");
      setTimeout(() => navigate("/all-campaigns"), 1200);
      setCampaignData({
        title: "",
        category_id: "",
        goal_amount: "",
        start_date: "",
        end_date: "",
        description: "",
        status: "running",
      });
      setCampaignImage(null);
      setDocument(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create campaign");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to slugify title
  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        {/* Dashboard Navbar */}
        <DashboardNavbar userName={userName} />
        
        {/* Hero Section */}
        <div className="bg-[#37b7ff] text-white py-12 relative">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-2">Create New Campaign</h1>
            <nav className="flex justify-center">
              <Link to="/" className="text-white hover:text-gray-200">View all campaigns.</Link>
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
            </svg>
          </div>
        </div>
        {/* Main Content */}
        <main className="flex-grow bg-white">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              {error && <div className="mb-4 text-red-600">{error}</div>}
              {success && <div className="mb-4 text-green-600">{success}</div>}
              {/* Title */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title<span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  name="title"
                  value={campaignData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category<span className="text-red-500">*</span></label>
                <div className="relative">
                  <Select
                    value={campaignData.category_id}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleSelectChange("category_id", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
              {/* Goal Amount */}
              <div className="mb-6">
                <label htmlFor="goal_amount" className="block text-sm font-medium mb-2">
                  Goal Amount<span className="text-red-500">*</span>
                </label>
                <Input
                  id="goal_amount"
                  name="goal_amount"
                  type="number"
                  value={campaignData.goal_amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Start Date */}
              <div className="mb-6">
                <label htmlFor="start_date" className="block text-sm font-medium mb-2">
                  Start Date<span className="text-red-500">*</span>
                </label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={campaignData.start_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* End Date */}
              <div className="mb-6">
                <label htmlFor="end_date" className="block text-sm font-medium mb-2">
                  End Date<span className="text-red-500">*</span>
                </label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={campaignData.end_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Description */}
              <div className="mb-8">
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description<span className="text-red-500">*</span>
                </label>
                <Card>
                  <Textarea
                    id="description"
                    name="description"
                    value={campaignData.description}
                    onChange={handleInputChange}
                    className="min-h-[200px] border-0 focus:ring-0 rounded-t-none"
                    placeholder="Enter a detailed description for your campaign"
                    required
                  />
                </Card>
              </div>
              
              {/* Optional Fields: Image, Document */}
              
              {/* Campaign Image */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Campaign Image</label>
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                    {campaignImage ? (
                      <img
                        src={URL.createObjectURL(campaignImage)}
                        alt="Campaign preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <Plus className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input type="file" id="campaignImage" className="hidden" onChange={handleCampaignImageUpload} />
                    <label htmlFor="campaignImage">
                      <Button type="button" className="mb-2 border border-[#37b7ff] text-[#37b7ff] hover:bg-[#37b7ff] hover:text-white flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </label>
                    <p className="text-xs text-gray-400">
                      *Supported file: jpeg, jpg, png. Image size: 555x437px. Thumbnail size: 415x275px.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Document */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Document</label>
                <div className="border border-gray-200 rounded-md p-4">
                  <input type="file" id="document" className="hidden" onChange={handleDocumentUpload} />
                  <label htmlFor="document" className="flex items-center">
                    <Button type="button" className="border border-[#37b7ff] text-[#37b7ff] hover:bg-[#37b7ff] hover:text-white">
                      Choose File
                    </Button>
                    <span className="ml-2 text-sm text-gray-500">{document ? document.name : "No file chosen"}</span>
                  </label>
                  <p className="text-xs text-gray-400 mt-2">*Supported file: .pdf</p>
                </div>
              </div>
              
              {/* Submit Button */}
              <Button type="submit" className="w-full bg-[#37b7ff] hover:bg-[#2a8fc7] text-white py-3 text-lg font-semibold" disabled={loading}>
                {loading ? "Creating..." : "Create Campaign"}
              </Button>
            </form>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
