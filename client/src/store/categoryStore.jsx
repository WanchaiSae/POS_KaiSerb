import { create } from "zustand";

const API_URL = "http://localhost:5000/api/category/";

const useCategoryStore = create((set, get) => ({
  // 1. STATE
  categories: [],
  currentForm: { name_th: "" },
  loading: false, // 📌 เพิ่ม State สำหรับ Loading
  error: null, // 📌 เพิ่ม State สำหรับ Error

  // Action สำหรับอัปเดตค่าในฟอร์ม (เหมือนเดิม)
  setFormValue: (name, value) =>
    set((state) => ({
      currentForm: {
        ...state.currentForm,
        [name]: value,
      },
    })),

  // 📌 2. Action สำหรับดึงข้อมูลหมวดหมู่ทั้งหมด (GET)
  fetchCategories: async () => {
    set({ loading: true, error: null }); // ตั้งค่า Loading
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลหมวดหมู่ได้");
      }
      const data = await response.json();
      set({ categories: data, loading: false }); // อัปเดต State
    } catch (error) {
      console.error("Error fetching categories: ", error);
      set({ error: error.message, loading: false }); // ตั้งค่า Error
    }
  },

  // 📌 3. Action สำหรับเพิ่มหมวดหมู่ใหม่ (POST)
  addCategory: async (newCategoryData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategoryData),
      });

      if (!response.ok) {
        // หากมี error จาก server (เช่น 400/500)
        const errorDetail = await response.json();
        throw new Error(errorDetail.message || "เพิ่มหมวดหมู่ไม่สำเร็จ");
      }

      const newCategory = await response.json();

      // อัปเดตรายการใน State ทันที และรีเช็ตฟอร์ม
      set((state) => ({
        categories: [...state.categories, newCategory],
        currentForm: { name_th: "", name_en: "", display_order: 1 },
        loading: false,
      }));
    } catch (error) {
      console.error("Error adding category: ", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  deleteCategory: async (id) => {
    set({ loading: true, error: null });

    if (!id) {
      return "Category ID Not Found.";
    }

    try {
      const response = await fetch(API_URL + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        throw new Error(errorDetail.message || "ลบรายการไม่สำเร็จ");
      }

      set((state) => ({
        // ใช้ filter() เพื่อสร้าง Array ใหม่ที่ไม่มีรายการถูกลบ
        categories: state.categories.filter((category) => category.id !== id),
        loading: false,
      }));

      // code
      console.log(id);
    } catch (error) {
      console.error("Error deleting category: ", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

export default useCategoryStore;
