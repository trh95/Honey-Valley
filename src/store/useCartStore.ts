import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDrawerOpen: (open: boolean) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          let newItems = [...state.items];
          if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];
            const newQty = existingItem.quantity + quantity;
            const finalQty = product.stock ? Math.min(newQty, product.stock) : newQty;
            newItems[existingItemIndex] = {
              ...existingItem,
              quantity: finalQty,
            };
          } else {
            const finalQty = product.stock ? Math.min(quantity, product.stock) : quantity;
            newItems.push({ product, quantity: finalQty });
          }

          return { items: newItems, isDrawerOpen: true };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id === productId) {
              const maxStock = item.product.stock || 99;
              const validatedQty = Math.max(1, Math.min(quantity, maxStock));
              return { ...item, quantity: validatedQty };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      setDrawerOpen: (open) => {
        set({ isDrawerOpen: open });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'honey-valley-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
