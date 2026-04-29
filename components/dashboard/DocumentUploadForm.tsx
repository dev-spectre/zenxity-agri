"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export function DocumentUploadForm({ requestId }: { requestId?: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) {
      toast.error(t("Please provide both a document name and a file"));
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      if (requestId) {
        formData.append("requestId", requestId);
      }

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || t("Failed to upload document"));
      }

      toast.success(t("Document uploaded successfully!"));
      setName("");
      setFile(null);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || t("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="border rounded-lg p-4 bg-white space-y-4 shadow-sm">
      <h3 className="font-bold text-foreground text-sm mb-2">{t("Upload New Document")}</h3>
      
      <div className="space-y-1">
        <Label htmlFor="doc-name" className="text-xs text-muted-foreground">{t("Document Name")}</Label>
        <Input 
          id="doc-name" 
          type="text" 
          placeholder={t("e.g. Aadhaar Card, Land Patta")} 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="h-8 text-sm"
          required 
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="doc-file" className="text-xs text-muted-foreground">{t("Select File")}</Label>
        <Input 
          id="doc-file" 
          type="file" 
          accept=".pdf,.jpg,.jpeg,.png" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="h-9 text-xs"
          required 
        />
      </div>

      <Button type="submit" size="sm" className="w-full gap-2" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
        {t("Upload")}
      </Button>
    </form>
  );
}
