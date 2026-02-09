import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Zenxity</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium">Welcome, Admin</span>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mb-8">
            This page will include:
          </p>
          <ul className="text-left max-w-2xl mx-auto space-y-3 mb-8 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Review, accept, or reject farming requests
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Upload photos and videos of farming activities
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Add comments or captions to updates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Post and manage advertisements and offers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Edit request status and delete media
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Manage multiple admin accounts
            </li>
          </ul>
          <Link to="/">
            <Button>← Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
