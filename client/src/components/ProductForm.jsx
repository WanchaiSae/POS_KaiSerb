import React, { useEffect } from "react";
import useCategoryStore from "../store/categoryStore";
import useProductStore from "../store/productStore";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();

  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);

  const currentForm = useProductStore((state) => state.currentForm);
  const addProduct = useProductStore((state) => state.addProduct);

  const setFormValue = useProductStore((state) => state.setFormValue);

  // Category Fetch
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct(currentForm);
      navigate("/");
    } catch (error) {
      alert("เกิดข้อผิดพลาด " + error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        เพิ่มเมนูอาหารใหม่
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* --- Product Name (ชื่อเมนู) --- */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ชื่อเมนูอาหาร
          </label>
          <input
            type="text"
            id="productName"
            name="name_th"
            onChange={(e) => setFormValue("name_th", e.target.value)}
            placeholder="เช่น ข้าวกะเพราหมูสับ, ชาเขียวมัทฉะ"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150"
          />
        </div>

        {/* --- Product Price (ราคา) --- */}
        <div>
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ราคา (บาท)
          </label>
          <input
            type="number"
            id="productPrice"
            name="price"
            onChange={(e) => setFormValue("price", e.target.value)}
            placeholder="เช่น 65.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150"
          />
        </div>

        {/* --- Product Category (หมวดหมู่) --- */}
        <div>
          <label
            htmlFor="productCategory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            หมวดหมู่
          </label>
          <select
            id="productCategory"
            name="category_id"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150 bg-white"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            {categories.map((categorie) => {
              return (
                <option
                  key={categorie.category_id}
                  value={categorie.category_id}
                >
                  {categorie.name_th}
                </option>
              );
            })}
          </select>
        </div>

        {/* --- Product Image (รูปภาพ) --- */}
        <div>
          <label
            htmlFor="productImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL รูปภาพ (หรืออัปโหลด)
          </label>
          <input
            type="text"
            id="productImage"
            name="image_url"
            onChange={(e) => setFormValue("image_url", e.target.value)}
            placeholder="เช่น https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150"
          />
          {/* <input type="file" id="productImageFile" name="productImageFile" className="mt-2" /> */}
        </div>

        {/* --- Product Status (สถานะ) --- */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            สถานะสินค้า
          </span>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="is_available"
                value={1}
                className="form-radio text-green-600 focus:ring-green-500"
                defaultChecked // ตัวอย่าง: ตั้งให้พร้อมขายเป็นค่าเริ่มต้น
              />
              <span className="ml-2 text-gray-700">พร้อมขาย</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="is_available"
                value="out_of_stock"
                className="form-radio text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-gray-700">หมด</span>
            </label>
          </div>
        </div>

        {/* --- Submit Button --- */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 text-lg"
          >
            บันทึกเมนูอาหาร
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
