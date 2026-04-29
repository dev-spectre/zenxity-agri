import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map, IndianRupee, TrendingUp, ClipboardList, PlusCircle, FileText, Phone } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpdateFeedCard } from "@/components/dashboard/UpdateFeedCard";
import { Metadata } from "next";

// This simulates the client-side translation hook for server components
const t = (key: string) => key;

export const metadata: Metadata = {
  title: "Dashboard Home - Zenxity",
  description: "Your farming dashboard overview.",
};

export default async function DashboardHomePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  // Fetch actual data from DB where possible
  const [requests, updates, user] = await Promise.all([
    prisma.farmingRequest.findMany({
      where: { userId },
      select: { id: true, landSize: true, status: true },
    }),
    prisma.farmingUpdates.findMany({
      where: { request: { userId } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    userId ? prisma.user.findUnique({
      where: { id: userId },
      select: { bankName: true, accountNumber: true, ifscCode: true }
    }) : Promise.resolve(null),
    prisma.financialRecord.findMany({
      where: { userId }
    })
  ]);

  const activeProjectsCount = requests.filter(r => r.status === "APPROVED").length;

  // Calculate total land size (assuming landSize is stored as a string number)
  const totalLandSize = requests.reduce((acc, req) => {
    const size = parseFloat(req.landSize) || 0;
    return acc + size;
  }, 0);

  // Real financial data from DB
  const financialRecords = await prisma.financialRecord.findMany({ where: { userId } });
  const totalEarnings = financialRecords.reduce((acc, rec) => acc + rec.amount, 0);
  const seasonProfit = totalEarnings; // Using total earnings as profit metric for dashboard simplicity

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("Dashboard Overview")}</h1>
        <p className="text-muted-foreground">{t("Welcome back, here is what is happening with your land.")}</p>
      </div>

      {/* Bank details alert */}
      {(!user?.bankName || !user?.accountNumber || !user?.ifscCode) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <IndianRupee className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800">{t("Bank Details Missing")}</p>
              <p className="text-sm text-yellow-700">{t("Please add your bank details to ensure seamless profit withdrawals.")}</p>
            </div>
          </div>
          <Link href="/dashboard/profile">
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white gap-2 text-sm shrink-0">
              {t("Add Bank Details")}
            </Button>
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard/land">
          <Button className="gap-2"><PlusCircle className="w-4 h-4" /> {t("Land")}</Button>
        </Link>
        <Link href="/dashboard/earnings">
          <Button variant="outline" className="gap-2 bg-white"><FileText className="w-4 h-4" /> {t("Earnings")}</Button>
        </Link>
        <Link href="/dashboard/support">
          <Button variant="outline" className="gap-2 hidden sm:flex bg-white"><Phone className="w-4 h-4" /> {t("Contact Support")}</Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("Total Land")}
          value={`${totalLandSize} ${t("Acres")}`}
          icon={Map}
        />
        <StatCard
          title={t("Total Earnings")}
          value={`₹${formatCurrency(totalEarnings)}`}
          icon={IndianRupee}
        />
        <StatCard
          title={t("This Season Profit")}
          value={`₹${formatCurrency(seasonProfit)}`}
          icon={TrendingUp}
          className="border-primary/20 bg-primary/5"
        />
        <StatCard
          title={t("Active Projects")}
          value={activeProjectsCount}
          icon={ClipboardList}
        />
      </div>

      {/* Recent Updates */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">{t("Recent Updates")}</h2>
          <Link href="/dashboard/updates" className="text-sm font-semibold text-primary hover:underline">
            {t("View All")}
          </Link>
        </div>

        {updates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((update) => (
              <UpdateFeedCard
                key={update.id}
                title={update.title}
                description={update.description || undefined}
                imgUrl={update.img || undefined}
                date={update.activityDate || update.createdAt.toLocaleDateString()}
                time={update.activityTime || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">{t("No recent updates available for your projects.")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
