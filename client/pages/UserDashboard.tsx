import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LogOut,
  ChevronDown,
  User,
  Settings,
  Clock,
  DollarSign,
  MessageSquare,
  Send,
  MapPin,
  Calendar,
  Download,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Offer {
  id: string;
  title: string;
  description: string;
  validity: string;
}

interface FarmingRequest {
  id: string;
  duration: string;
  budget: number;
  status: "pending" | "accepted" | "rejected";
  notes: string;
  createdDate: string;
}

interface Update {
  id: string;
  type: "photo" | "video";
  date: string;
  caption: string;
  thumbnail: string;
}

export default function UserDashboard() {
  const [userName] = useState("John Doe");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [requests, setRequests] = useState<FarmingRequest[]>([
    {
      id: "1",
      duration: "30",
      budget: 15000,
      status: "accepted",
      notes: "Plowing and tilling for paddy cultivation",
      createdDate: "2024-02-01",
    },
    {
      id: "2",
      duration: "15",
      budget: 8000,
      status: "pending",
      notes: "Land preparation",
      createdDate: "2024-02-05",
    },
  ]);

  const [formData, setFormData] = useState({
    duration: "7",
    budget: "",
    notes: "",
  });

  const [profileData, setProfileData] = useState({
    name: userName,
    mobile: "9876543210",
    email: "john.doe@example.com",
    password: "",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Current Offers Mock Data
  const offers: Offer[] = [
    {
      id: "1",
      title: "Plowing & Tilling",
      description: "Professional land preparation for optimal crop growth",
      validity: "Valid till Mar 31",
    },
    {
      id: "2",
      title: "Seeding Services",
      description: "Expert seeding with modern machinery",
      validity: "Valid till Apr 15",
    },
    {
      id: "3",
      title: "Harvesting",
      description: "Efficient harvesting with minimal crop loss",
      validity: "Valid till May 31",
    },
  ];

  // Mock Live Updates
  const liveUpdates: Update[] = [
    {
      id: "1",
      type: "photo",
      date: "2024-02-10",
      caption: "Land preparation completed successfully",
      thumbnail:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop",
    },
    {
      id: "2",
      type: "video",
      date: "2024-02-12",
      caption: "Seeding process in progress",
      thumbnail:
        "https://images.unsplash.com/photo-1595421683101-2870a65eb776?w=300&h=200&fit=crop",
    },
    {
      id: "3",
      type: "photo",
      date: "2024-02-14",
      caption: "Crops growing well",
      thumbnail:
        "https://images.unsplash.com/photo-1500595046891-9f3e8eda2ba6?w=300&h=200&fit=crop",
    },
  ];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: FarmingRequest = {
      id: (requests.length + 1).toString(),
      duration: formData.duration,
      budget: parseFloat(formData.budget) || 0,
      status: "pending",
      notes: formData.notes,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setRequests([...requests, newRequest]);
    setFormData({ duration: "7", budget: "", notes: "" });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const acceptedRequest = requests.find((r) => r.status === "accepted");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <img src="/logo.jpg" alt="" className="w-8 h-8" />
            <span className="text-2xl font-bold text-primary">Zenxity</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium hidden sm:inline">
              Welcome, {userName}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden" />

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Section 1: Current Offers */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Current Offers
              </h2>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max lg:min-w-full lg:grid lg:grid-cols-3">
                  {offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition flex-shrink-0 lg:flex-shrink w-80 lg:w-auto"
                    >
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {offer.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {offer.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                          {offer.validity}
                        </span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 2: Post a Farming Request */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Post a Farming Request
              </h2>
              <div className="bg-white rounded-lg border border-border p-8">
                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-foreground font-semibold mb-2">
                        Duration (Days)
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <select
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="7">7 days</option>
                          <option value="15">15 days</option>
                          <option value="30">30 days</option>
                          <option value="45">45 days</option>
                          <option value="60">60 days</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-foreground font-semibold mb-2">
                        Budget (₹)
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Enter budget amount"
                          className="pl-10"
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground font-semibold mb-2">
                      Additional Notes
                    </Label>
                    <textarea
                      placeholder="Describe your farming request, land size, crop type, etc."
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      rows={5}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </form>
              </div>
            </section>

            {/* Section 3: Field Status */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Your Requests
              </h2>
              <div className="grid gap-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">
                              {request.duration} days
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">
                              ₹{request.budget.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {request.notes}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted on {request.createdDate}
                        </p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap ${getStatusColor(request.status)}`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Live Farming Updates (Only if Accepted) */}
            {acceptedRequest && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Live Farming Updates
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveUpdates.map((update) => (
                    <div
                      key={update.id}
                      className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition"
                    >
                      <div className="relative overflow-hidden bg-gray-200 h-48">
                        <img
                          src={update.thumbnail}
                          alt={update.caption}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                        {update.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-10 border-t-primary ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          {update.date}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {update.caption}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              User Profile
            </h2>
            <div className="bg-white rounded-lg border border-border p-8">
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <Label className="text-foreground font-semibold mb-2">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditingProfile}
                    className="disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <Label className="text-foreground font-semibold mb-2">
                    Mobile Number
                  </Label>
                  <Input
                    type="tel"
                    value={profileData.mobile}
                    onChange={(e) =>
                      setProfileData({ ...profileData, mobile: e.target.value })
                    }
                    disabled={!isEditingProfile}
                    className="disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <Label className="text-foreground font-semibold mb-2">
                    Email ID
                  </Label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditingProfile}
                    className="disabled:bg-gray-50"
                  />
                </div>

                {isEditingProfile && (
                  <div>
                    <Label className="text-foreground font-semibold mb-2">
                      New Password (leave blank to keep current)
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={profileData.password}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  {!isEditingProfile ? (
                    <Button
                      type="button"
                      onClick={() => setIsEditingProfile(true)}
                      className="md:w-auto w-full"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button type="submit" className="md:w-auto w-full">
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingProfile(false)}
                        className="md:w-auto w-full"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
