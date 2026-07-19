import { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "Login | Shesham Wood Furniture",
  description: "Sign in to your Shesham Wood Furniture account.",
  robots: { index: false }
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
        <div className="mb-8">
          <SectionHeader title="Welcome Back" subtitle="Sign in to your account" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
