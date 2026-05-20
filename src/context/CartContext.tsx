import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  color: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product, size: string, quantity?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lumere-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    total: items.reduce((s, i) => s + i.quantity * i.price, 0),
    add: (product, size, quantity = 1) => {
      const id = `${product.id}-${size}`;
      setItems((prev) => {
        const existing = prev.find((p) => p.id === id);
        if (existing) {
          return prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + quantity } : p));
        }
        return [...prev, { id, productId: product.id, name: product.name, color: product.color, price: product.price, image: product.image, size, quantity }];
      });
    },
    remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}