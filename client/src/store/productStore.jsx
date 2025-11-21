import { create } from "zustand";

const API_URL = "http://localhost:5000/api/product/";

const useProductStore = create((set) => ({
  products: [],
  currentForm: {
    name_th: "",
    price: 0,
    category_id: 30,
    image_url: "",
    is_available: 1,
  },
  loading: false,
  error: null,

  setFormValue: (name, value) =>
    set((state) => ({
      currentForm: {
        ...state.currentForm,
        [name]: value,
      },
    })),

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลสินค้าได้");
      }
      const data = await response.json();

      set({ products: data.data, loading: false });
    } catch (error) {
      console.error("Error fetching products: ", error);
      set({ error: error.message, loading: false });
    }
  },

  addProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        throw new Error(errorDetail.message || "เพิ่มสินค้าไม่สำเร็จ");
      }

      const newProduct = await response.json();

      set((state) => ({
        products: [...state.products, newProduct],
        currentForm: {
          name_th: "",
          price: 69,
          category_id: 30,
          image_url: "",
          is_available: 1,
        },
        loading: false,
      }));
    } catch (error) {
      console.error("Error adding Product: ", error);
      set({ error: error.message, loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_URL + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        throw new Error(errorDetail.message || "ลบสินค้าไม่สำเร็จ");
      }

      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }));

      // code
      console.log(id);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addOrder: async (id) => {
    console.log(id);
  },
}));

export default useProductStore;
