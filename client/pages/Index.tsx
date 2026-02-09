import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Clock, TrendingUp, Award } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Zenxity</span>
          </div>
          <div className="flex gap-4">
            <Link to="/user-login">
              <Button variant="outline" size="sm">
                User Login
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary via-white to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Smart Contract Farming Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Book professional farming services for your land and track farming activities in real-time with live updates, photos, and videos.
              </p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <Link to="/user-login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <a href="#about" className="inline-block">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 text-center">
                <Leaf className="w-32 h-32 text-primary mx-auto mb-4 opacity-80" />
                <p className="text-foreground font-semibold">Transparent & Reliable Farming Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Zenxity?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Easy Booking",
                desc: "Book farming services in minutes with our simple interface",
              },
              {
                icon: TrendingUp,
                title: "Real-time Updates",
                desc: "Get live photos and videos of your farming operations",
              },
              {
                icon: Award,
                title: "Professional Team",
                desc: "Experienced farming professionals managing your land",
              },
              {
                icon: Leaf,
                title: "Transparent",
                desc: "Complete transparency with detailed updates and comments",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="bg-secondary rounded-lg p-6 mb-4 inline-block">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Offers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-foreground">
            Current Offers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Plowing & Tilling",
                desc: "Professional land preparation for optimal crop growth",
                price: "Competitive Rates",
              },
              {
                title: "Seeding Services",
                desc: "Expert seeding with modern machinery for better yield",
                price: "Custom Quotes",
              },
              {
                title: "Harvesting",
                desc: "Efficient harvesting solutions with minimal crop loss",
                price: "Seasonal Pricing",
              },
            ].map((offer, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {offer.title}
                </h3>
                <p className="text-muted-foreground mb-4">{offer.desc}</p>
                <p className="text-sm font-semibold text-accent">
                  {offer.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">
            About Zenxity
          </h2>
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              <strong className="text-foreground">Zenxity</strong> is a contract farming company dedicated to providing reliable and transparent farming services to landowners. We specialize in managing farming operations on behalf of landowners while maintaining complete transparency through live updates, ensuring trust, efficiency, and convenience.
            </p>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed">
                To provide an accessible online platform where landowners can easily book professional farming services and monitor their agricultural operations in real-time.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Our Services Include
              </h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Contract farming management</li>
                <li>Land preparation and soil treatment</li>
                <li>Seeding and planting services</li>
                <li>Crop monitoring and maintenance</li>
                <li>Harvesting and post-harvest management</li>
                <li>Real-time updates with photos and videos</li>
                <li>Direct communication with your farming team</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-95">
            Join hundreds of landowners who trust Zenxity for their farming needs
          </p>
          <Link to="/user-login">
            <Button
              size="lg"
              variant="secondary"
              className="px-8"
            >
              Create Your Account Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6" />
                <span className="text-xl font-bold">Zenxity</span>
              </div>
              <p className="text-white/70">Smart contract farming services</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><Link to="/user-login" className="hover:text-white">User Login</Link></li>
                <li><Link to="/admin-login" className="hover:text-white">Admin Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70">
                <li>Land Preparation</li>
                <li>Seeding</li>
                <li>Crop Management</li>
                <li>Harvesting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2024 Zenxity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
