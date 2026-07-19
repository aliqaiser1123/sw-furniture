import { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Forgot Password | Shesham Wood Furniture",
  robots: { index: false }
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
        <div className="mb-8">
          <SectionHeader title="Reset Password" subtitle="Enter your email to receive a reset link" />
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email Address</label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
      </div>
    </div>
  );
}
