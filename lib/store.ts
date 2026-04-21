import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  variantId: string
  title: string
  price: number
  quantity: number
  image: string
  size: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  openCart:   () => void
  closeCart:  () => void
  addItem:    (item: CartItem) => void
  removeItem: (id: string) => void
  updateQty:  (id: string, qty: number) => void
  clearCart:  () => void
  totalItems: number
  totalPrice: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.variantId === item.variantId)
        if (existing) {
          return {
            items: state.items.map(i =>
              i.variantId === item.variantId ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }
        }
        return { items: [...state.items, item] }
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id),
      })),

      updateQty: (id, qty) => set((state) => ({
        items: qty <= 0
          ? state.items.filter(i => i.id !== id)
          : state.items.map(i => i.id === id ? { ...i, quantity: qty } : i),
      })),

      clearCart: () => set({ items: [] }),

      get totalItems() { return get().items.reduce((sum, i) => sum + i.quantity, 0) },
      get totalPrice() { return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0) },
    }),
    {
      name: 'hob-cart',
      // Only persist items, not UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
)
