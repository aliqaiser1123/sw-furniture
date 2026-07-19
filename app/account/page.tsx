import { SectionHeader } from "@/components/common/SectionHeader";

export default function AccountDashboard() {
  return (
    <div>
      <SectionHeader title="Dashboard" subtitle="Overview of your account" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl bg-neutral-50 border-neutral-100">
          <h3 className="font-semibold text-lg font-serif">Recent Orders</h3>
          <p className="text-gray-500 mt-2 text-sm">You have no recent orders.</p>
        </div>
        <div className="p-6 border rounded-xl bg-neutral-50 border-neutral-100">
          <h3 className="font-semibold text-lg font-serif">Account Information</h3>
          <p className="text-gray-500 mt-2 text-sm">Manage your profile details and preferences.</p>
        </div>
      </div>
    </div>
  );
}
