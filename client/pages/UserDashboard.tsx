import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LogOut,
  ChevronDown,
  User,
  Settings,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

interface Offer {
  id: string;
  title: string;
  description: string;
  validity: string;
  img: string;
}

interface FarmingRequest {
  id: string;
  status: "pending" | "accepted" | "rejected";
  notes: string;
  createdAt?: string;
  landSize?: string;
  preferredLanguage?: string;
  landAddress?: string;
}

interface Update {
  id: string;
  type: "photo" | "video";
  date: string;
  caption: string;
  thumbnail: string;
}

export default function UserDashboard() {
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [requests, setRequests] = useState<FarmingRequest[]>([]);

  const [formData, setFormData] = useState({
    landSize: "",
    landAddress: "",
    preferredLanguage: "",
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
      img: "/plowing.jpg",
    },
    {
      id: "2",
      title: "Seeding Services",
      description: "Expert seeding with modern machinery",
      validity: "Valid till Apr 15",
      img: "/seeding.jpeg",
    },
    {
      id: "3",
      title: "Harvesting",
      description: "Efficient harvesting with minimal crop loss",
      validity: "Valid till May 31",
      img: "/harvesting.avif",
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
      type: "photo",
      date: "2024-02-12",
      caption: "Seeding process in progress",
      thumbnail: "/seed.avif",
    },
    {
      id: "3",
      type: "photo",
      date: "2024-02-14",
      caption: "Crops growing well",
      thumbnail: "/crop.avif",
    },
  ];

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: FarmingRequest = {
      ...formData,
      id: (requests.length + 1).toString(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setRequests([...requests, newRequest]);
    await fetch("/api/land/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(newRequest),
    });
    setFormData({
      landSize: "",
      landAddress: "",
      preferredLanguage: "",
      notes: "",
    });
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
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
      case "declined":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const acceptedRequest = requests.find(
    (r) =>
      r.status.toLocaleLowerCase() === "accepted" ||
      r.status.toLocaleLowerCase() === "approved",
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const accessToken =
    searchParams.get("accessToken") || localStorage.getItem("accessToken");
  const refreshToken =
    searchParams.get("refreshToken") || localStorage.getItem("refreshToken");
  setSearchParams({ accessToken: "", refreshToken: "" });

  useEffect(() => {
    if (accessToken && refreshToken) {
      fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }).then(async (res) => {
        const payload = await res.json();

        if (payload.user) {
          setProfileData({
            name: payload.user.name,
            email: payload.user.email,
            mobile: payload.user.mobileNumber,
            password: "",
          });
          localStorage.setItem("user", JSON.stringify(payload.user));
          localStorage.setItem("accessToken", accessToken || "");
          localStorage.setItem("refreshToken", refreshToken || "");
        } else {
          localStorage.clear();
          window.location.href = "/user-login";
        }

        fetch("/api/land/request", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setRequests(data.requests);
          });

        setUserName(payload.user.name);
      });
    } else {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const storedAccessToken = localStorage.getItem("accessToken");

      if (user && storedAccessToken) {
        setUserName(user.name);
      } else {
        localStorage.clear();
        window.location.href = "/user-login";
      }
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.profilePicture) {
      setProfilePicture(user.profilePicture);
    }
  }, [userName]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <img src="/logo-transparent.png" alt="" className="w-10 h-10" />
            <span className="text-2xl font-bold text-primary">Zenxity</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium hidden sm:inline">
              Welcome, {userName}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {profilePicture ? (
                    <img
                      src={`${profilePicture}?sz=500`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 mr-2" />
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    onClick={() => {
                      localStorage.clear();
                    }}
                    to="/"
                  >
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
                      className="bg-white relative overflow-hidden rounded-lg border border-border hover:shadow-md transition flex-shrink-0 lg:flex-shrink w-80 lg:w-auto"
                    >
                      <div className="relative isolate">
                        <img
                          src={offer.img}
                          alt=""
                          className="absolute inset-0 opacity-30"
                        />
                        <div className="z-10 relative p-6">
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
                          </div>
                        </div>
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
                        Land Size
                      </Label>
                      <div className="relative">
                        <input
                          type="text"
                          name="landSize"
                          id="landSize"
                          value={formData.landSize}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              landSize: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter land size in acres"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-foreground font-semibold mb-2">
                        Preferred Language For Communication
                      </Label>
                      <div className="relative">
                        <Input
                          type="text"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your preferred language"
                          value={formData.preferredLanguage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredLanguage: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <Label className="text-foreground font-semibold mb-2">
                        City
                      </Label>
                      <div className="relative">
                        <input
                          type="text"
                          name="landAddress"
                          id="landAddress"
                          value={formData.landAddress}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              landAddress: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter the city in which your land is located"
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
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center font-bold text-green-600 gap-2">
                            {request.landAddress}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {request.notes}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted on{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap ${getStatusColor(request.status.toLocaleLowerCase())}`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1).toLocaleLowerCase()}
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
                          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform"
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
