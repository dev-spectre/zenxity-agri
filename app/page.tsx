"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Clock, TrendingUp, Award, ArrowRight, Play, Sprout, BarChart3 } from "lucide-react";
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

        <div className="container relative z-10 py-12 md:py-32 mx-auto px-4 md:px-8">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-600/30 text-white text-sm font-medium border border-green-500/30 backdrop-blur-sm">
              🌾 Managed Farmland Platform
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-sm">
              Your land can earn money,
              <span className="text-green-400 font-bold drop-shadow-md"> even while you rest.</span>
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
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-foreground tracking-tight">
            Why Choose Zenxity?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Easy to Get Started",
                desc: "Share your land details and our team takes care of the rest.",
              },
              {
                icon: BarChart3,
                title: "Complete Transparency",
                desc: "Track farming activities through real-time updates, photos, and reports.",
              },
              {
                icon: Award,
                title: "Professional Management",
                desc: "Experienced teams handle all farming operations efficiently.",
              },
              {
                icon: Sprout,
                title: "Better Use of Your Land",
                desc: "Convert unused land into productive farmland.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="bg-green-100 text-green-600 rounded-2xl p-6 mb-6 inline-flex items-center justify-center transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <feature.icon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation Section */}
      <section id="contact" className="py-12 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                  Partner With Us Today
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  If you own agricultural land but cannot actively manage it, Zenxity can help you <span className="">generate income</span> while ensuring modern, sustainable farming practices.
                </p>
              </div>

              <ul className="space-y-6">
                {[
                  "Maximize your land's potential with professional management",
                  "Receive regular updates directly on your device",
                  "Completely hands-off experience for landowners",
                  "Sustainable and modern farming practices"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 bg-gray-50 text-green-600 rounded-2xl p-4 inline-flex items-center justify-center transition-all duration-300 group-hover:bg-green-600 group-hover:text-white shadow-sm border border-gray-100 group-hover:-translate-y-1">
                      <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78748L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative lg:ml-auto w-full max-w-lg">
              <div className="bg-gray-50 rounded-3xl p-1 shadow-xl shadow-gray-200/20 border border-gray-100 transition-transform duration-500 hover:-translate-y-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground tracking-tight">
              About Zenxity
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We help landowners turn unused or underutilized agricultural land into productive farmland, managing the entire process with complete transparency.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to help landowners make productive use of their agricultural land by providing reliable farm management and transparent updates. Zenxity aims to simplify agriculture through technology, professional expertise, and modern practices so that landowners can generate sustainable income from their land with complete visibility and trust.
                </p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Services Include</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
                  {[
                    "Contract farming management",
                    "Land preparation & soil treatment",
                    "Seeding & planting services",
                    "Crop monitoring & maintenance",
                    "Harvesting & post-harvest management",
                    "Real-time updates & reports"
                  ].map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <div className="mt-1 bg-green-100 rounded-full p-1 text-green-600 flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78748L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-sm leading-tight">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-white rounded-3xl p-2 border border-gray-100 shadow-xl overflow-hidden aspect-video">
                <iframe className="w-full h-full rounded-2xl bg-white" src="https://www.youtube.com/embed/6bC1KxqYACY" title="Your Farmland Is Sitting Idle? Let It Work For You 🌱" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/20">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src="/plowing.jpg" alt="Farming CTA Background" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/80 to-emerald-900/90 mix-blend-multiply" />
            </div>

            <div className="relative z-10 px-8 py-16 md:py-20 md:px-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-sm">
                Start Earning From Your Land Today
              </h2>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-green-50 drop-shadow">
                Submit your land details and let our farming experts handle the rest. Sit back, relax, and watch your unused land turn into a steady source of income.
              </p>
              <Link href={isLoggedIn ? "/dashboard/land" : "/login"} className="inline-block">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl transition-transform hover:-translate-y-1">
                  Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-gray-300 py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image src="/logo-transparent.png" alt="Zenxity Logo" width={40} height={40} className="w-10 h-10 drop-shadow-md" />
                <span className="text-2xl font-bold text-white tracking-tight">Zenxity</span>
              </div>
              <p className="text-zinc-400 leading-relaxed pr-4">Let Your Land Work for You. We bring modern farming practices to your unused farmland.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-zinc-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Land Preparation</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Seeding</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Crop Management</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Harvesting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-zinc-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800/80 pt-8 text-center text-zinc-500">
            <p>&copy; 2026 Zenxity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
