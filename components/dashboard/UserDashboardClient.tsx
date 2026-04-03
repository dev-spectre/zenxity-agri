"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, MapPin, Calendar, Timer, Image, Video, ChevronUp, ChevronDown, Play, Settings } from "lucide-react";
import { useSession } from "next-auth/react";

interface UserDashboardClientProps {
  initialOffers: any[];
  initialRequests: any[];
  initialUpdates: any[];
}

export function UserDashboardClient({ initialOffers, initialRequests, initialUpdates }: UserDashboardClientProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [requests, setRequests] = useState(initialRequests);
  const [liveUpdates, setLiveUpdates] = useState(initialUpdates);
  const [expandedUpdateId, setExpandedUpdateId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    landSize: "",
    landAddress: "",
    preferredLanguage: "",
    notes: "",
  });

  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    mobile: "",
    email: session?.user?.email || "",
    password: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    // Optimistic UI
    const tempId = Math.random().toString();
    setRequests([...requests, { ...newRequest, id: tempId }]);
    
    // API Call
    const res = await fetch("/api/land-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest),
    });
    if (res.ok) {
       const savedData = await res.json();
       setRequests((prev) => prev.map(r => r.id === tempId ? savedData.request : r));
    }
    setFormData({ landSize: "", landAddress: "", preferredLanguage: "", notes: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "accepted":
      case "approved": return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
      case "declined": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const hasAcceptedRequest = requests.some(r => r.status.toLowerCase() === "accepted" || r.status.toLowerCase() === "approved");

  return (
    <div className="w-full">
      {/* Dashboard Toggle Options Could go here, but we'll stick to displaying current active tab */}
      {activeTab === "dashboard" && (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Offers */}
            {initialOffers.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Current Offers</h2>
                <div className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3">
                  {initialOffers.map((offer) => (
                    <div key={offer.id} className="relative overflow-hidden rounded-lg border hover:shadow-md flex-shrink-0 w-80 lg:w-auto">
                      <img src={offer.img} alt="" className="absolute inset-0 opacity-30 object-cover w-full h-full" />
                      <div className="z-10 relative p-6">
                        <h3 className="text-xl font-bold text-primary mb-2">{offer.title}</h3>
                        <p className="text-sm mb-4">{offer.description}</p>
                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">{offer.validUntil}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Request Form */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Post a Farming Request</h2>
              <div className="bg-white rounded-lg border p-8">
                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Land Size</Label>
                      <input type="text" value={formData.landSize} onChange={(e) => setFormData({ ...formData, landSize: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required placeholder="Enter land size in acres" />
                    </div>
                    <div>
                      <Label>Preferred Language</Label>
                      <Input type="text" value={formData.preferredLanguage} onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })} required placeholder="Enter preferred language" />
                    </div>
                    <div className="col-span-2">
                      <Label>City</Label>
                      <input type="text" value={formData.landAddress} onChange={(e) => setFormData({ ...formData, landAddress: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required placeholder="City location" />
                    </div>
                  </div>
                  <div>
                    <Label>Additional Notes</Label>
                    <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" rows={4} placeholder="Describe crop type, terrain, etc." />
                  </div>
                  <Button type="submit"><Send className="w-4 h-4 mr-2" /> Submit Request</Button>
                </form>
              </div>
            </section>

            {/* Requests */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Requests</h2>
              <div className="grid gap-4">
                {requests.map((req: any) => (
                  <div key={req.id} className="bg-white rounded-lg border p-6 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <p className="font-bold text-lg">{req.landAddress} <span className="text-sm font-normal text-muted-foreground">- {req.landSize}</span></p>
                      <p className="text-muted-foreground text-sm mt-1">{req.notes}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(req.status)}`}>{req.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Updates */}
            {hasAcceptedRequest && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Live Farming Updates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveUpdates.map((update: any) => (
                    <div key={update.id} className="bg-white rounded-lg border overflow-hidden">
                      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                        {update.img ? <img src={update.img} className="w-full h-full object-cover" alt="" /> : <Image className="text-gray-300 w-12 h-12" />}
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="flex gap-1 items-center"><Calendar className="w-3 h-3"/> {update.activityDate || new Date(update.createdAt).toLocaleDateString()}</span>
                          {update.activityTime && <span className="flex gap-1 items-center"><Timer className="w-3 h-3"/> {update.activityTime}</span>}
                        </div>
                        <h3 className="font-bold">{update.title}</h3>
                        {update.description && <p className="text-sm text-muted-foreground line-clamp-2">{update.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
