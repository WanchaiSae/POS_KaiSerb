import React from "react";
import useCartStore from "../store/cartStore";

const RightSidebar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handlePayment = (e) => {
    e.preventDefault();

    alert("Payment Coming Soon.");
  };

  return (
    <aside className="w-80 bg-white shadow-xl shrink-0 border-l border-gray-200 p-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        📋 รายการอาหาร (Order Summary)
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-5 text-sm italic">
            ... ยังไม่มีรายการสั่งซื้อ ...
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="text-gray-800 font-medium flex-1">
                {item.name_th} x {item.qty}
              </span>

              <span className="font-semibold text-sm w-16 text-right">
                ฿{item.price * item.qty}
              </span>

              <button
                onClick={() => removeFromCart(item.product_id)}
                className="text-red-500 hover:text-red-700 ml-3 text-sm font-medium"
              >
                ลบ
              </button>
            </div>
          ))
        )}
      </div>

      {/* สรุปราคา */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <div className="flex justify-between font-extrabold text-lg mb-4">
          <span>รวมทั้งหมด:</span>
          <span className="text-red-600">฿{totalPrice()}</span>
        </div>

        <button
          onClick={(e) => handlePayment(e)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-150 disabled:bg-gray-400"
        >
          ✅ ชำระเงิน (Pay Now)
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
