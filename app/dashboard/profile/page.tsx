import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { User, Phone, Mail, FileText, Building, Eye } from "lucide-react";
import { Metadata } from "next";
import { DocumentUploadForm } from "@/components/dashboard/DocumentUploadForm";
import { ProfileEditManager } from "@/components/dashboard/ProfileEditManager";

const t = (key: string) => key;

export const metadata: Metadata = {
  title: "Profile - Zenxity",
  description: "View your profile, bank details, and uploaded documents.",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const realDocuments = await prisma.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">{t("My Profile")}</h1>
        <p className="text-muted-foreground text-sm">{t("View your personal information and documents.")}</p>
      </div>

      <ProfileEditManager 
        initialUser={{
          name: user.name,
          email: user.email,
          mobileNumber: user.mobileNumber,
          bankName: user.bankName,
          accountNumber: user.accountNumber,
          ifscCode: user.ifscCode
        }} 
      />

        {/* Uploaded Documents */}
        <div className="md:col-span-2 bg-white rounded-xl border p-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b pb-2">
            <FileText className="w-5 h-5 text-primary" />
            {t("Uploaded Documents")}
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {realDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm text-foreground">{t(doc.name)}</p>
                    <p className={
                      `text-xs font-semibold ${doc.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`
                    }>
                      {t(doc.status)}
                    </p>
                  </div>
                </div>
                <a 
                  href={doc.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
                  title={t("View Document")}
                >
                  <Eye className="w-4 h-4" />
                </a>
              </div>
            ))}

            {realDocuments.length === 0 && (
              <div className="col-span-full text-center py-4 text-sm text-muted-foreground">
                {t("No uploaded documents found.")}
              </div>
            )}
          </div>

          <div className="max-w-md">
            <DocumentUploadForm />
          </div>
        </div>
    </div>
  );
}
