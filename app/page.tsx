"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Clock, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import Image from "next/image";

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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary via-white to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Turn Your Land Into Profitable Farmland
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Zenxity helps landowners transform unused agricultural land into productive farms.
                Our team manages the entire farming process while you track progress through real-time
                updates, photos, and reports.
              </p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <a href="#contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </a>
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
                <Image src="/hero.jpg" alt="Agricultural Farmland" width={600} height={400} priority className="object-cover w-full" />
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
