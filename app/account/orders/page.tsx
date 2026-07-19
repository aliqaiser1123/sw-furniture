import { SectionHeader } from "@/components/common/SectionHeader";

export default function AccountOrders() {
  return (
    <div>
      <SectionHeader title="Order History" subtitle="View and track your orders" />
      <div className="mt-8 text-gray-500">
        You have no orders yet.
      </div>
    </div>
  );
}
