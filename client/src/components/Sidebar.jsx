import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "หน้าหลัก", path: "/", icon: "🏠" },
    { name: "หมวดหมู่", path: "/categories", icon: "🍽️" },
    { name: "สินค้า/เมนู", path: "/products", icon: "🍔" },
    { name: "ตั้งค่า", path: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-white shadow-xl shrink-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-extrabold text-pink-700">POS KAISERB</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition duration-150 
                  ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
