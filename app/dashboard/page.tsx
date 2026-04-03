import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { UserDashboardClient } from "@/components/dashboard/UserDashboardClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Zenxity",
  description: "Manage your farming requests and view live updates.",
};

export default async function UserDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const userId = session.user.id;

  // Parallel data fetching for performance
  const [offers, requests, updates] = await Promise.all([
    prisma.offer.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.farmingRequest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.farmingUpdates.findMany({
      where: { request: { userId } },
      orderBy: { createdAt: "desc" },
      include: { request: true },
    }),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <UserDashboardClient 
        initialOffers={offers} 
        initialRequests={requests} 
        initialUpdates={updates} 
      />
    </div>
  );
}
