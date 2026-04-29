"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-50 rounded-2xl">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: April 2026</p>
            </div>
          </div>

          <div className="prose prose-green max-w-none space-y-8 text-gray-600">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" /> 1. Information We Collect
              </h2>
              <p>To provide our specialized agricultural services, we collect various types of information from you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Identity:</strong> Your full name, email address, and mobile number.</li>
                <li><strong>Land Details:</strong> Address, land size, survey number, and patta number provided for farming assessment.</li>
                <li><strong>Financial Information:</strong> Bank details (Bank Name, Account Number, IFSC) for processing your earnings and payouts.</li>
                <li><strong>Documents:</strong> Scanned copies of identity proofs and land titles uploaded to our secure dashboard.</li>
                <li><strong>Media:</strong> Photos and videos of your land and farming activities posted for progress updates.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" /> 2. How We Use Your Data
              </h2>
              <p>Your data is used strictly for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To assess and manage agricultural activities on your land.</li>
                <li>To verify ownership and ensure legal compliance for farming contracts.</li>
                <li>To process and transfer your share of farming profits directly to your bank account.</li>
                <li>To provide real-time updates on crop progress and land status through your dashboard.</li>
                <li>To communicate important service updates or request additional information.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" /> 3. Data Protection
              </h2>
              <p>We implement industry-standard security measures to protect your sensitive information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All document uploads are stored in secure, encrypted environments.</li>
                <li>Financial details are handled with strict access controls and are never shared with unauthorized third parties.</li>
                <li>We do not sell your personal or land information to marketing companies.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" /> 4. Your Rights
              </h2>
              <p>You have the right to access, update, or request the deletion of your personal and land data through your account dashboard. You can also contact our support team for any privacy-related concerns.</p>
            </section>

            <section className="space-y-4 border-t pt-8">
              <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="font-semibold text-foreground">Zenxity Agri Support</p>
                <p>Email: zenxity.in@gmail.com</p>
                <p>Phone: +91 90423 59210</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
