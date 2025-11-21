import React, { useEffect } from "react";
import useCategoryStore from "../store/categoryStore";

const CategoryForm = () => {
  const categories = useCategoryStore((state) => state.categories);

  const {
    currentForm,
    loading,
    error,
    setFormValue,
    fetchCategories,
    addCategory,
    deleteCategory,
  } = useCategoryStore();

  // โหลดข้อมูลตอนคอมโพเนนต์ mount ครั้งแรก
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ฟังก์ชันเมื่อกดบันทึกฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentForm.name_th) {
      alert("กรุณากรอกชื่อหมวดหมู่");
      return;
    }

    try {
      await addCategory(currentForm);
      fetchCategories();
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  const deleted = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  // 📌 2. แสดง Loading State ขณะรอข้อมูล
  // if (loading && categories.length === 0) {
  //   return (
  //     <div className="text-center text-xl p-8">กำลังโหลดรายการหมวดหมู่...</div>
  //   );
  // }

  return (
    // 1. Container หลัก: ใช้ Flexbox แบ่งพื้นที่ภายใน Content Area
    // max-w-4xl (หรือตามที่ต้องการ) เพื่อจำกัดความกว้างรวม
    <div className="flex w-full max-w-4xl space-x-8">
      {/* ****************************************** */}
      {/* 1. ส่วนฟอร์ม (Form Section) - ใช้พื้นที่ 1/2 */}
      {/* ****************************************** */}
      <div className="flex-1 bg-blue-100 p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-700">
            เพิ่มหมวดหมู่ใหม่
          </h2>
        </div>

        {/* 📌 แสดง Error หากมี */}
        {/* {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
            เกิดข้อผิดพลาด: {error}
          </div>
        )} */}

        <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name_th"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ชื่อภาษาไทย (name_th)
            </label>
            <input
              type="text"
              id="name_th"
              name="name_th"
              onChange={(e) => setFormValue("name_th", e.target.value)}
              placeholder="เช่น อาหารจานเดียว"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-150"
            >
              {loading ? "กำลังบันทึก..." : "เพิ่มหมวดหมู่เมนูอาหาร"}
            </button>
          </div>
        </form>

        {/* แสดง Loading / Error */}
        {loading && <p className="text-blue-600">กำลังโหลดหมวดหมู่...</p>}
        {error && <p className="text-red-600">ข้อผิดพลาด: {error}</p>}
      </div>

      {/* ****************************************** */}
      {/* 2. ส่วนรายการ (List Section) - ใช้พื้นที่ 1/2 */}
      {/* ****************************************** */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-2xl border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          {/* รายการหมวดหมู่ที่มีอยู่ ({categories.length} รายการ) */}
        </h3>

        <div className="max-h-[500px] overflow-y-auto space-y-3">
          {/* แสดงรายการหมวดหมู่ */}
          {categories.length === 0 && !loading && !error && (
            <p className="text-gray-500 text-center py-8">ยังไม่มีหมวดหมู่</p>
          )}
          {categories.map((cat, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center p-3 border-l-4 border-pink-500 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-150"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {cat.name_th}
                  </span>
                </div>
                <button
                  onClick={() => deleted(cat.category_id)}
                  className="text-pink-500 hover:text-pink-700 text-sm font-medium"
                >
                  ลบ
                </button>
              </div>
            );
          })}

          {/* ถ้ามีรายการเยอะ จะมี Scrollbar ในส่วนนี้ */}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
