import { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Reset Password | Shesham Wood Furniture",
  robots: { index: false }
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
        <div className="mb-8">
          <SectionHeader title="Create New Password" subtitle="Enter your new password below" />
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">New Password</label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Update Password</Button>
        </form>
      </div>
    </div>
  );
}
