const API_URL = "http://localhost:5000/api/product/";

import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  // เพิ่มสินค้าในตะกร้า
  addToCart: (product) => {
    const { cartItems } = get();

    const exists = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    if (exists) {
      // ถ้ามีสินค้าอยู่แล้ว → เพิ่มจำนวน
      const updated = cartItems.map((item) =>
        item.product_id === product.product_id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
      set({ cartItems: updated });
    } else {
      // ถ้ายังไม่มี → เพิ่มรายการใหม่
      set({
        cartItems: [...cartItems, { ...product, qty: 1 }],
      });
    }
  },

  // ลบสินค้า 1 ชิ้น (ถ้า qty=1 ก็ลบทั้งรายการ)
  removeFromCart: (product_id) => {
    const items = get().cartItems;

    const target = items.find((i) => i.product_id === product_id);
    if (!target) return;

    if (target.qty > 1) {
      set({
        cartItems: items.map((i) =>
          i.product_id === product_id ? { ...i, qty: i.qty - 1 } : i
        ),
      });
    } else {
      // qty = 1 → ลบรายการออกจาก cart
      set({
        cartItems: items.filter((i) => i.product_id !== product_id),
      });
    }
  },

  // รวมเงินทั้งหมด
  totalPrice: () => {
    return get().cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  },

  // เคลียร์ตะกร้าเมื่อชำระเงินเสร็จ
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
