import React from "react";
import Sidebar from "../Sidebar";
import RightSidebar from "../RightSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/*
          Content ของแต่ละหน้า (children) จะถูกส่งมาแสดงที่นี่
          เรากำหนดให้ Content อยู่ตรงกลางด้วย Flexbox
        */}
        <div className="h-full flex justify-center items-center p-4">
          {children}
        </div>
      </main>

      <RightSidebar />
    </div>
  );
};

export default Layout;
