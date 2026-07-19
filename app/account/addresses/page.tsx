import { SectionHeader } from "@/components/common/SectionHeader";

export default function AccountAddresses() {
  return (
    <div>
      <SectionHeader title="Saved Addresses" subtitle="Manage your shipping addresses" />
      <div className="mt-8 text-gray-500">
        You have not saved any addresses yet.
      </div>
    </div>
  );
}
