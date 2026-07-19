import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  salePrice?: number | null;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        if (!items.find((i) => i.productId === item.productId)) {
          set({ items: [...items, item] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },
      
      hasItem: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'shesham-wishlist-storage',
    }
  )
);
