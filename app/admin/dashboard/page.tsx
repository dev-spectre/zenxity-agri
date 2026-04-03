"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LogOut,
  LayoutDashboard,
  Clipboard,
  Upload,
  Megaphone,
  ChevronDown,
  User,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Image,
  Video,
  MapPin,
  Calendar,
  Timer,
  FileText,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FarmingRequest {
  id: string;
  userName: string;
  status: string;
  notes: string;
  createdAt: string;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  validity: string;
  img?: string;
}

interface FarmingUpdate {
  id: string;
  title: string;
  content?: string;
  description?: string;
  img?: string;
  video?: string;
  landInfo?: string;
  activityDate?: string;
  activityTime?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [requests, setRequests] = useState<any[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [newOffer, setNewOffer] = useState({ title: "", description: "", validity: "", img: "" });
  const [showAddOfferForm, setShowAddOfferForm] = useState(false);
  const router = useRouter();

  // Upload Updates state
  const [uploadData, setUploadData] = useState({ requestId: "", title: "", description: "", landInfo: "", activityDate: "", activityTime: "" });
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Update history state
  const [updateHistory, setUpdateHistory] = useState<FarmingUpdate[]>([]);
  const [expandedUpdateId, setExpandedUpdateId] = useState<string | null>(null);

  const authHeaders = () => ({
    "Content-Type": "application/json",
  });

  const handleRequestAction = async (id: string, action: "accept" | "reject") => {
    setRequests(requests.map((req) => req.id === id ? { ...req, status: action === "accept" ? "accepted" : "rejected" } : req));
    await fetch("/api/land-requests/admin", { method: "PUT", headers: authHeaders(), body: JSON.stringify({ reqId: id, status: action }) });
  };

  const handleAddOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newOffer.title && newOffer.description) {
      const offer: Offer = { id: (offers.length + 1).toString(), title: newOffer.title, description: newOffer.description, validity: newOffer.validity, img: newOffer.img };
      setOffers([...offers, offer]);
      await fetch("/api/offer/", { method: "POST", headers: authHeaders(), body: JSON.stringify({ title: offer.title, description: offer.description, validUntil: offer.validity, img: offer.img }) });
      setNewOffer({ title: "", description: "", validity: "", img: "" });
      setShowAddOfferForm(false);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    setOffers(offers.filter((offer) => offer.id !== id));
    await fetch("/api/offer/delete", { method: "POST", headers: authHeaders(), body: JSON.stringify({ id }) });
  };

  const uploadToCloudinary = async (file: File, resourceType: "image" | "video"): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zenxity");
    const res = await fetch(`https://api.cloudinary.com/v1_1/dzcbyadrb/${resourceType}/upload`, { method: "POST", body: formData });
    if (!res.ok) throw new Error(`${resourceType} upload failed`);
    const data = await res.json();
    return data.secure_url;
  };

  const handleUploadUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.requestId || !uploadData.title) return;
    setUploading(true);
    try {
      let imgUrl = "";
      let videoUrl = "";
      if (selectedImageFiles.length > 0) imgUrl = await uploadToCloudinary(selectedImageFiles[0], "image");
      if (selectedVideoFile) videoUrl = await uploadToCloudinary(selectedVideoFile, "video");
      await fetch("/api/updates/", { method: "POST", headers: authHeaders(), body: JSON.stringify({ requestId: uploadData.requestId, title: uploadData.title, description: uploadData.description, img: imgUrl || undefined, video: videoUrl || undefined, landInfo: uploadData.landInfo || undefined, activityDate: uploadData.activityDate || undefined, activityTime: uploadData.activityTime || undefined }) });
      setUploadData({ requestId: uploadData.requestId, title: "", description: "", landInfo: "", activityDate: "", activityTime: "" });
      setSelectedImageFiles([]);
      setSelectedVideoFile(null);
      if (uploadData.requestId) fetchUpdateHistory(uploadData.requestId);
    } catch (error) {
      console.error("Error uploading update:", error);
    } finally {
      setUploading(false);
    }
  };

  const fetchUpdateHistory = async (requestId: string) => {
    try {
      const res = await fetch(`/api/updates/by-request/${requestId}`, { method: "GET", headers: authHeaders() });
      const data = await res.json();
      setUpdateHistory(data.updates || []);
    } catch (err) {
      console.error("Error fetching update history:", err);
    }
  };

  useEffect(() => {
    if (uploadData.requestId) fetchUpdateHistory(uploadData.requestId);
  }, [uploadData.requestId]);

  const acceptedRequests = requests.filter((r) => r.status?.toLowerCase() === "accepted" || r.status?.toLowerCase() === "approved");
  const pendingRequests = requests.filter((r) => r.status?.toLowerCase() === "pending");

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "accepted": case "approved": return "bg-green-100 text-green-800 border-green-300";
      case "rejected": case "declined": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "requests", label: "Farming Requests", icon: Clipboard },
    { id: "uploads", label: "Upload Updates", icon: Upload },
    { id: "offers", label: "Offers Management", icon: Megaphone },
  ];

  useEffect(() => {
    fetch("/api/land-requests/admin", { method: "GET", headers: authHeaders() })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) router.push("/admin/login");
        }
        return res.json();
      })
      .then((data) => { if (data.farmingRequests) setRequests(data.farmingRequests); })
      .catch((err) => console.log(err));

    fetch("/api/offer/all", { method: "GET", headers: authHeaders() })
      .then((res) => res.json())
      .then((data) => { setOffers((data.offers || []).map((offer: any) => ({ ...offer, validity: offer.validUntil })) || []); });
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-border">
        <div className="sticky top-0">
          <div className="h-16 flex items-center border-b border-border px-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src="/logo-transparent.png" alt="" className="w-10 h-10" />
              <span className="font-bold text-primary hidden md:inline">Zenxity</span>
            </Link>
          </div>
          <nav className="py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setActiveSection(item.id)} className={`w-full flex items-center gap-3 px-6 py-3 text-left transition ${activeSection === item.id ? "bg-secondary text-primary border-r-4 border-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="border-t border-border p-4">
            <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full">
              <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <nav className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-primary" /></div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}><LogOut className="w-4 h-4 mr-2" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Dashboard Overview */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-2"><h3 className="text-muted-foreground text-sm font-medium">Total Requests</h3><Clipboard className="w-5 h-5 text-primary" /></div>
                  <p className="text-3xl font-bold text-foreground">{requests.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-2"><h3 className="text-muted-foreground text-sm font-medium">Pending</h3><Clock className="w-5 h-5 text-yellow-600" /></div>
                  <p className="text-3xl font-bold text-yellow-600">{pendingRequests.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-2"><h3 className="text-muted-foreground text-sm font-medium">Accepted</h3><CheckCircle className="w-5 h-5 text-green-600" /></div>
                  <p className="text-3xl font-bold text-green-600">{acceptedRequests.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-2"><h3 className="text-muted-foreground text-sm font-medium">Active Offers</h3><Megaphone className="w-5 h-5 text-primary" /></div>
                  <p className="text-3xl font-bold text-foreground">{offers.length}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Recent Requests</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border"><tr><th className="text-left py-3 px-2 text-muted-foreground font-semibold">User</th><th className="text-left py-3 px-2 text-muted-foreground font-semibold">Size</th><th className="text-left py-3 px-2 text-muted-foreground font-semibold">City</th><th className="text-left py-3 px-2 text-muted-foreground font-semibold">Status</th></tr></thead>
                    <tbody>
                      {requests.slice(0, 5).map((req) => (
                        <tr key={req.id} className="border-b border-border hover:bg-gray-50">
                          <td className="py-3 px-2 text-foreground">{req.user?.name}</td>
                          <td className="py-3 px-2 text-muted-foreground">{req.landSize}</td>
                          <td className="py-3 px-2 text-foreground font-medium">{req.landAddress}</td>
                          <td className="py-3 px-2"><span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(req.status)}`}>{req.status?.charAt(0).toUpperCase() + req.status?.slice(1).toLowerCase()}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Requests Management */}
          {activeSection === "requests" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Farming Requests Management</h2>
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary border-b border-border"><tr><th className="text-left py-4 px-6 text-foreground font-semibold">User</th><th className="text-left py-4 px-6 text-foreground font-semibold">Size</th><th className="text-left py-4 px-6 text-foreground font-semibold">City</th><th className="text-left py-4 px-6 text-foreground font-semibold">Status</th><th className="text-left py-4 px-6 text-foreground font-semibold">Action</th></tr></thead>
                    <tbody>
                      {requests.map((req) => (
                        <tr key={req.id} className="border-b border-border hover:bg-gray-50">
                          <td className="py-4 px-6 text-foreground font-medium">{req.user?.name}</td>
                          <td className="py-4 px-6 text-muted-foreground">{req.landSize}</td>
                          <td className="py-4 px-6 text-foreground">{req.landAddress}</td>
                          <td className="py-4 px-6"><span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(req.status)}`}>{req.status?.charAt(0).toUpperCase() + req.status?.slice(1).toLowerCase()}</span></td>
                          <td className="py-4 px-6">
                            {req.status?.toLowerCase() === "pending" ? (
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleRequestAction(req.id, "accept")}><CheckCircle className="w-4 h-4 mr-1" />Accept</Button>
                                <Button size="sm" variant="destructive" onClick={() => handleRequestAction(req.id, "reject")}><XCircle className="w-4 h-4 mr-1" />Reject</Button>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-xs">{req.status?.toLowerCase() === "accepted" || req.status?.toLowerCase() === "approved" ? "Accepted" : "Rejected"}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Upload Updates */}
          {activeSection === "uploads" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Post Farming Updates</h2>
              <div className="bg-white rounded-lg border border-border p-8">
                <p className="text-muted-foreground mb-6">Post rich updates with photos, videos, and details for accepted farming requests.</p>
                {acceptedRequests.length > 0 ? (
                  <form onSubmit={handleUploadUpdate} className="space-y-6">
                    <div>
                      <Label className="text-foreground font-semibold mb-2">Select Request / User</Label>
                      <select value={uploadData.requestId} onChange={(e) => setUploadData({ ...uploadData, requestId: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                        <option value="">-- Choose a request --</option>
                        {acceptedRequests.map((req) => (<option className="text-black" key={req.id} value={req.id}>{`${req.user?.name} | ${req.landAddress} | ${req.landSize} Acres`}</option>))}
                      </select>
                    </div>
                    <div>
                      <Label className="text-foreground font-semibold mb-2 flex items-center gap-2"><FileText className="w-4 h-4" />Title</Label>
                      <Input type="text" placeholder="e.g., Land Preparation Completed" value={uploadData.title} onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })} required />
                    </div>
                    <div>
                      <Label className="text-foreground font-semibold mb-2 flex items-center gap-2"><FileText className="w-4 h-4" />Description</Label>
                      <textarea placeholder="Describe the farming activity in detail..." className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" rows={4} value={uploadData.description} onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-foreground font-semibold mb-2 flex items-center gap-2"><Image className="w-4 h-4" />Upload Photo</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                          <input type="file" accept="image/*" onChange={(e) => setSelectedImageFiles(Array.from(e.target.files || []))} className="hidden" id="image-upload" />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Image className="w-10 h-10 text-primary mx-auto mb-2" />
                            <p className="text-foreground font-medium text-sm">Click to upload photo</p>
                            <p className="text-muted-foreground text-xs">PNG, JPG up to 10MB</p>
                          </label>
                          {selectedImageFiles.length > 0 && <div className="mt-3 text-left"><p className="text-xs font-semibold text-green-600">{selectedImageFiles.length} photo(s) selected:</p><ul className="text-xs text-foreground">{selectedImageFiles.map((file) => <li key={file.name}>✓ {file.name}</li>)}</ul></div>}
                        </div>
                      </div>
                      <div>
                        <Label className="text-foreground font-semibold mb-2 flex items-center gap-2"><Video className="w-4 h-4" />Upload Video</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                          <input type="file" accept="video/*" onChange={(e) => setSelectedVideoFile(e.target.files?.[0] || null)} className="hidden" id="video-upload" />
                          <label htmlFor="video-upload" className="cursor-pointer">
                            <Video className="w-10 h-10 text-primary mx-auto mb-2" />
                            <p className="text-foreground font-medium text-sm">Click to upload video</p>
                            <p className="text-muted-foreground text-xs">MP4, MOV up to 100MB</p>
                          </label>
                          {selectedVideoFile && <div className="mt-3 text-left"><p className="text-xs font-semibold text-green-600">Video selected:</p><p className="text-xs text-foreground">✓ {selectedVideoFile.name}</p></div>}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><Label className="text-foreground font-semibold mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" />Land / Field Info</Label><Input type="text" placeholder="e.g., Plot A - North section" value={uploadData.landInfo} onChange={(e) => setUploadData({ ...uploadData, landInfo: e.target.value })} /></div>
                      <div><Label className="text-foreground font-semibold mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" />Activity Date</Label><Input type="date" value={uploadData.activityDate} onChange={(e) => setUploadData({ ...uploadData, activityDate: e.target.value })} /></div>
                      <div><Label className="text-foreground font-semibold mb-2 flex items-center gap-2"><Timer className="w-4 h-4" />Activity Time</Label><Input type="time" value={uploadData.activityTime} onChange={(e) => setUploadData({ ...uploadData, activityTime: e.target.value })} /></div>
                    </div>
                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={uploading}><Upload className="w-4 h-4 mr-2" />{uploading ? "Uploading..." : "Post Update"}</Button>
                  </form>
                ) : (
                  <div className="text-center py-8"><p className="text-muted-foreground">No accepted requests available. Accept requests first to upload updates.</p></div>
                )}
              </div>

              {/* Update History */}
              {uploadData.requestId && (
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />Update History
                    {updateHistory.length > 0 && <span className="text-sm font-normal text-muted-foreground">({updateHistory.length} update{updateHistory.length !== 1 ? "s" : ""})</span>}
                  </h3>
                  {updateHistory.length > 0 ? (
                    <div className="space-y-4">
                      {updateHistory.map((update) => (
                        <div key={update.id} className="border border-border rounded-lg overflow-hidden hover:shadow-sm transition">
                          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedUpdateId(expandedUpdateId === update.id ? null : update.id)}>
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1">{update.img && <Image className="w-4 h-4 text-blue-500" />}{update.video && <Video className="w-4 h-4 text-purple-500" />}</div>
                              <div>
                                <h4 className="font-semibold text-foreground">{update.title}</h4>
                                <p className="text-xs text-muted-foreground">{new Date(update.createdAt).toLocaleDateString()} {update.activityDate && `• Activity: ${update.activityDate}`} {update.activityTime && `at ${update.activityTime}`}</p>
                              </div>
                            </div>
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </div>
                          {expandedUpdateId === update.id && (
                            <div className="border-t border-border p-4 bg-gray-50 space-y-3">
                              {update.description && <p className="text-sm text-foreground">{update.description}</p>}
                              {update.landInfo && <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {update.landInfo}</p>}
                              <div className="flex gap-4 flex-wrap">
                                {update.img && <img src={update.img} alt={update.title} className="w-48 h-32 object-cover rounded-lg border" />}
                                {update.video && <video src={update.video} controls className="w-48 h-32 object-cover rounded-lg border" />}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-4">No updates posted yet for this request.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Offers Management */}
          {activeSection === "offers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Offers Management</h2>
                <Button onClick={() => setShowAddOfferForm(!showAddOfferForm)} className="gap-2"><Plus className="w-4 h-4" />Add Offer</Button>
              </div>
              {showAddOfferForm && (
                <div className="bg-white rounded-lg border border-border p-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">Create New Offer</h3>
                  <form onSubmit={handleAddOffer} className="space-y-4">
                    <div><Label className="text-foreground font-semibold mb-2">Offer Title</Label><Input type="text" placeholder="e.g., Plowing & Tilling" value={newOffer.title} onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })} required /></div>
                    <div><Label className="text-foreground font-semibold mb-2">Description</Label><textarea placeholder="Describe the offer..." className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" rows={3} value={newOffer.description} onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })} required /></div>
                    <div><Label className="text-foreground font-semibold mb-2">Validity Period</Label><Input type="text" placeholder="e.g., Valid till Mar 31" value={newOffer.validity} onChange={(e) => setNewOffer({ ...newOffer, validity: e.target.value })} /></div>
                    <div><Label className="text-foreground font-semibold mb-2">Background Image</Label><Input type="text" placeholder="e.g., https://cloudinary.com/image.jpg" value={newOffer.img} onChange={(e) => setNewOffer({ ...newOffer, img: e.target.value })} /></div>
                    <div className="flex gap-4"><Button type="submit">Save Offer</Button><Button type="button" variant="outline" onClick={() => { setShowAddOfferForm(false); setNewOffer({ title: "", description: "", validity: "", img: "" }); }}>Cancel</Button></div>
                  </form>
                </div>
              )}
              <div className="grid gap-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">{offer.title}</h3>
                        <p className="text-muted-foreground mb-3">{offer.description}</p>
                        <p className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">{offer.validity}</p>
                      </div>
                      <div className="flex gap-2"><Button size="sm" variant="destructive" onClick={() => handleDeleteOffer(offer.id)}><Trash2 className="w-4 h-4" /></Button></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
