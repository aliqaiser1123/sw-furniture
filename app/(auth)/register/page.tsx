import { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "Create an Account | Shesham Wood Furniture",
  description: "Join Shesham Wood Furniture to track orders, manage your wishlist, and check out faster.",
  robots: { index: false }
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
        <div className="mb-8">
          <SectionHeader title="Create an Account" subtitle="Join the Shesham Wood family" />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
