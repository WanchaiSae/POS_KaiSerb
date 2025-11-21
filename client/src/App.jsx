import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import CategoryForm from "./components/CategoryForm";
import ErrorPage from "./errors/ErrorPage";
import ProductPage from "./components/pages/ProductPage";
import ProductForm from "./components/ProductForm";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <ProductPage />
          </Layout>
        }
      />

      <Route
        path="/categories"
        element={
          // ห่อหุ้ม CategoryForm ด้วย Layout Component
          <Layout>
            <CategoryForm />
          </Layout>
        }
      />

      <Route
        path="/products"
        element={
          <Layout>
            <ProductForm />
          </Layout>
        }
      />

      {/* Error Page  */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
