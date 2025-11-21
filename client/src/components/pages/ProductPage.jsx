import React, { useEffect } from "react";
import useProductStore from "../../store/productStore";
import useCartStore from "../../store/cartStore";

const ProductPage = () => {
  const fetchProduct = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProduct();
  };

  const handleOrder = async (product) => {
    addToCart(product);
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen w-full">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              จัดการสินค้า / เมนู
            </h1>
            <p className="text-gray-500 mt-1">
              รายการอาหารทั้งหมดในร้าน (5 รายการ)
            </p>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-lg shadow-md flex items-center transition duration-200">
            <span className="text-xl mr-2">+</span>{" "}
            <a href="/products">เพิ่มเมนูใหม่</a>
          </button>
        </div>

        {/* --- Filter & Search Bar --- */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-2 w-full md:w-auto scrollbar-hide">
            <button className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 bg-pink-100 text-pink-600 border border-pink-200">
              ทั้งหมด
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="ค้นหาเมนูอาหาร..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            return (
              <div
                key={product.product_id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Image Area */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image_url}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm bg-green-500">
                    พร้อมขาย
                  </div>
                </div>

                {/* Content Area */}

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-1 rounded-md">
                      อาหารจานเดียว
                    </span>
                    <span className="text-gray-400 text-xs">#28</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                    {product.name_th}
                  </h3>
                  <p className="text-xl font-extrabold text-gray-900 mb-4">
                    ฿{product.price}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleOrder(product)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition"
                    >
                      ✅ เพิ่ม
                    </button>
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition"
                    >
                      🗑️ ลบ
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
