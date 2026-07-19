import { SectionHeader } from "@/components/common/SectionHeader";

export default function AccountWishlist() {
  return (
    <div>
      <SectionHeader title="My Wishlist" subtitle="Your saved items" />
      <div className="mt-8 text-gray-500">
        Your wishlist is currently empty.
      </div>
    </div>
  );
}
