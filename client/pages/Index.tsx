import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Clock, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-transparent.png" alt="" className="w-10 h-10" />
            <span className="text-3xl font-bold text-primary">Zenxity</span>
          </div>
          <div className="flex gap-4">
            {isLoggedIn ? (
              <Link to="/user-dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/user-login">
                <Button size="sm">Login</Button>
              </Link>
            )}
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
                Book professional farming services for your land and track
                farming activities in real-time with live updates, photos, and
                videos.
              </p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <Link to="/user-login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <a href="#about" className="inline-block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className=" rounded-2xl overflow-hidden relative text-center">
                <img src="/hero.jpg" alt="" className="" />
                <p className="text-white font-semibold absolute left-0 right-0 text-center bottom-0 bg-gradient-to-b from-transparent to-black/70 py-2">
                  Transparent & Reliable Farming Services
                </p>
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

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">
            About Zenxity
          </h2>
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              <strong className="text-foreground">Zenxity</strong> is a contract
              farming company dedicated to providing reliable and transparent
              farming services to landowners. We specialize in managing farming
              operations on behalf of landowners while maintaining complete
              transparency through live updates, ensuring trust, efficiency, and
              convenience.
            </p>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed">
                To provide an accessible online platform where landowners can
                easily book professional farming services and monitor their
                agricultural operations in real-time.
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

      {/* Meet the Founders Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-foreground">
            Meet the Founders of Zenxity
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Led by a passionate team dedicated to revolutionizing contract
            farming and empowering landowners
          </p>
          <div className="bg-white rounded-xl border border-border mb-8 lg:mb-10 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center ">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                <img
                  src="/partha.jpeg"
                  alt="Parthasarathi S"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Parthasarathi S
              </h3>
              <p className="text-primary font-semibold mb-4 text-sm">
                Founder & CEO
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Oversees daily operations, farming workflow execution, and
                coordination between field teams and users.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 place-content-center md:grid-cols-2 gap-8 lg:gap-10">
            {[
              {
                name: "Muthu Mohammed A",
                role: "Founder & COO",
                bio: "Leads company vision, strategic growth, and partnerships to expand Zenxity's contract farming network.",
                image: "/muthu.jpeg",
              },
              {
                name: "Abhishek Dallas",
                role: "Founder & CTO",
                bio: "Leads technology development, platform architecture, and live farming update systems.",
                image: "/abhi.png",
              },
              {
                name: "Kavyashri K P",
                role: "Founder & CMO",
                bio: "Handles marketing strategy, brand communication, and user outreach across digital platforms.",
                image: "/kavya.png",
              },
              {
                name: "Saniya S",
                role: "Founder & CCSO",
                bio: "Oversees customer support systems, ensures landowner satisfaction, and manages the overall customer success journey.",
                image: "/sanya.jpeg",
              },
            ].map((founder, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-border p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center ">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4 text-sm">
                    {founder.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
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
            Join hundreds of landowners who trust Zenxity for their farming
            needs
          </p>
          <Link to="/user-login">
            <Button size="lg" variant="secondary" className="px-8">
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
                <img src="/logo-transparent.png" alt="" className="w-10 h-10" />
                <span className="text-xl font-bold">Zenxity</span>
              </div>
              <p className="text-white/70">Smart contract farming services</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <Link to="/user-login" className="hover:text-white">
                    Login
                  </Link>
                </li>
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
