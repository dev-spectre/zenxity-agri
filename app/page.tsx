"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Clock, TrendingUp, Award, ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative pt-20 md:pt-0 min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/hero-farm.jpg" alt="Lush green farmland" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
        </div>

        <div className="container relative z-10 py-20 md:py-32 mx-auto px-4 md:px-8">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-600/30 text-white text-sm font-medium border border-green-500/30 backdrop-blur-sm">
              🌾 Managed Farmland Platform
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-sm">
              Your land can earn money
              <span className="text-green-400 font-bold drop-shadow-md">, even while you rest.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-lg">
              We find the farmers. We manage the work. You get paid every season. Simple.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={isLoggedIn ? "/dashboard/land" : "/login"} className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20">
                Register Your Land Free <ArrowRight size={18} />
              </Link>
              <Link href="#about" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
                <Play size={18} /> Watch How It Works
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
              <span>✓ Free to join</span>
              <span>✓ No paperwork hassle</span>
              <span>✓ Tamil support</span>
            </div>
          </div>
        </div>

        {/* Floating card - desktop only */}
        <div className="hidden lg:block absolute right-12 xl:right-24 bottom-24 w-80">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur bg-white/95">
            <img src="/hero-farm-2.jpg" alt="Aerial view of farmland" className="w-full h-40 object-cover" />
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Monthly Earnings</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">+24% ROI</span>
              </div>
              <div className="text-3xl font-bold text-green-600">₹18,400</div>
              <div className="flex gap-2 text-[10px]">
                <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 font-medium border border-green-100">🌾 Paddy</span>
                <span className="px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium border border-yellow-100">Harvest in 28 days</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-green-600 w-[72%]" />
              </div>
              <p className="text-xs text-gray-500">Crop growth: 72% complete</p>
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
                title: "Easy to Get Started",
                desc: "Share your land details and our team takes care of the rest.",
              },
              {
                icon: TrendingUp,
                title: "Complete Transparency",
                desc: "Track farming activities through real-time updates, photos, and reports.",
              },
              {
                icon: Award,
                title: "Professional Management",
                desc: "Experienced teams handle all farming operations efficiently.",
              },
              {
                icon: Leaf,
                title: "Better Use of Your Land",
                desc: "Convert unused land into productive farmland.",
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

      {/* Lead Generation Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
                Partner With Us Today
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                If you own agricultural land but cannot actively manage it, Zenxity can help you generate income from it while ensuring modern, sustainable farming practices. Submit your details and our team will contact you to discuss the next steps.
              </p>
              <ul className="space-y-4">
                {[
                  "Maximize your land's potential with professional management",
                  "Receive regular updates directly on your device",
                  "Completely hands-off experience for landowners",
                  "Sustainable and modern farming practices"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78748L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ContactForm />
            </div>
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
              <strong className="text-foreground">Zenxity </strong>
              helps landowners turn unused or underutilized agricultural land into
              productive farmland. Our team manages the entire farming process while
              providing real-time updates, photos, and reports, ensuring complete transparency
              and allowing landowners to earn from their land without handling daily farming operations.
            </p>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed">
                Our mission is to help landowners make productive use of their agricultural
                land by providing reliable farm management and transparent updates. Zenxity
                aims to simplify agriculture through technology, professional expertise,
                and modern practices so that landowners can generate sustainable income
                from their land with complete visibility and trust.
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
          <iframe className="mt-10 w-full max-w-2xl aspect-video" src="https://www.youtube.com/embed/6bC1KxqYACY" title="Your Farmland Is Sitting Idle? Let It Work For You 🌱" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start Earning From Your Land Today
          </h2>
          <p className="text-lg mb-8 opacity-95">
            Submit your land details and let our farming experts handle the rest.
          </p>
          <a href="#contact">
            <Button size="lg" variant="secondary" className="px-8">
              Get Started
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo-transparent.png" alt="Zenxity Logo" width={40} height={40} className="w-10 h-10" />
                <span className="text-xl font-bold">Zenxity</span>
              </div>
              <p className="text-white/70">Let Your Land Work for You.</p>
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
            <p>&copy; 2026 Zenxity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
