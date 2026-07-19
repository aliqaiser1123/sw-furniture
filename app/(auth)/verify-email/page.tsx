import { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "Verify Email | Shesham Wood Furniture",
  robots: { index: false }
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 text-center rounded-xl shadow-sm border border-neutral-100">
        <SectionHeader title="Verify Email" subtitle="We've sent a verification link to your email." />
        <p className="mt-4 text-sm text-gray-500">Please check your inbox and follow the link to activate your account.</p>
      </div>
    </div>
  );
}
