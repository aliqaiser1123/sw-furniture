import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  salePrice?: number | null;
  image: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.productId === item.productId);
        
        if (existingItem) {
          // Check stock limit
          const newQuantity = Math.min(existingItem.quantity + item.quantity, item.stock);
          set({
            items: items.map((i) => 
              i.productId === item.productId 
                ? { ...i, quantity: newQuantity } 
                : i
            )
          });
        } else {
          set({ items: [...items, { ...item, quantity: Math.min(item.quantity, item.stock) }] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((i) => {
            if (i.productId === productId) {
              return { ...i, quantity: Math.min(Math.max(1, quantity), i.stock) };
            }
            return i;
          })
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.salePrice || item.price;
          return total + (price * item.quantity);
        }, 0);
      },
      
      getTotal: () => {
        return get().getSubtotal(); // Will add tax/shipping logic in checkout
      }
    }),
    {
      name: 'shesham-cart-storage',
    }
  )
);
