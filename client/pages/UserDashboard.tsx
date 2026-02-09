import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut } from "lucide-react";

export default function UserDashboard() {
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
            <span className="text-foreground font-medium">Welcome, User</span>
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
            User Dashboard
          </h1>
          <p className="text-muted-foreground mb-8">
            This page will include:
          </p>
          <ul className="text-left max-w-2xl mx-auto space-y-3 mb-8 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Current offers and advertisements
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Submit contract farming requests
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Track request status (Pending, Accepted, Rejected)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> View live farming activity updates with photos and videos
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> User profile management
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
