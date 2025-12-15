import { useState } from "react";

// Example CRUD components (tables + forms)
import ProductList from "@/components/admin/Product/ProductList";
import ProductForm from "@/components/admin/Product/ProductForm";

import CategoryList from "@/components/admin/Category/CategoryList";
import CategoryForm from "@/components/admin/Category/CategoryForm";

import VariantList from "@/components/admin/Variant/VariantList";
import VariantForm from "@/components/admin/Variant/VariantForm";

import SizeList from "@/components/admin/Size/SizeList";
import SizeForm from "@/components/admin/Size/SizeForm";

import ColorList from "@/components/admin/Color/ColorList";
import ColorForm from "@/components/admin/Color/ColorForm";

interface SidebarItemProps {
  label: string;
  collapsed: boolean;
}

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  // Toggle forms
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{id: string, name: string} | null>(null);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [showSizeForm, setShowSizeForm] = useState(false);
  const [showColorForm, setShowColorForm] = useState(false);


  const handleAddCategory = () => {
    setEditingCategory(null)
    setShowCategoryForm(!showCategoryForm)
  }
  const handleEditCategory = (category:{id:string; name:string;}) => {
    setEditingCategory(category)
    setShowCategoryForm(true)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <h1 className="text-lg font-bold">E‑Commerce Admin</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-white"
          >
            ☰
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarItem label="Dashboard" collapsed={collapsed} />
          <SidebarItem label="Orders" collapsed={collapsed} />
          <SidebarItem label="Products" collapsed={collapsed} />
          <SidebarItem label="Customers" collapsed={collapsed} />
          <SidebarItem label="Payments" collapsed={collapsed} />
          <SidebarItem label="Settings" collapsed={collapsed} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {/* Products */}
        <div>
          <button
            onClick={() => setShowProductForm(!showProductForm)}
            className="mb-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showProductForm ? "Close Product Form" : "Add Product"}
          </button>
          {showProductForm && <ProductForm onSubmit={(data) => console.log(data)} />}
          <ProductList />
        </div>

        {/* Categories */}
        <div>
          <button
            onClick={handleAddCategory}
            className="mb-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showCategoryForm ? "Close Category Form" : "Add Category"}
          </button>
          {showCategoryForm && <CategoryForm initialData={editingCategory} />}
          <CategoryList handleEditCategory = {handleEditCategory} />
        </div>

        {/* Variants */}
        <div>
          <button
            onClick={() => setShowVariantForm(!showVariantForm)}
            className="mb-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showVariantForm ? "Close Variant Form" : "Add Variant"}
          </button>
          {showVariantForm && <VariantForm onSubmit={(data) => console.log(data)} />}
          <VariantList />
        </div>

        {/* Sizes */}
        <div>
          <button
            onClick={() => setShowSizeForm(!showSizeForm)}
            className="mb-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showSizeForm ? "Close Size Form" : "Add Size"}
          </button>
          {showSizeForm && <SizeForm onSubmit={(data) => console.log(data)} />}
          <SizeList />
        </div>

        {/* Colors */}
        <div>
          <button
            onClick={() => setShowColorForm(!showColorForm)}
            className="mb-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showColorForm ? "Close Color Form" : "Add Color"}
          </button>
          {showColorForm && <ColorForm onSubmit={(data) => console.log(data)} />}
          <ColorList />
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ label, collapsed }: SidebarItemProps) {
  return (
    <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
      <span className="text-sm font-medium">
        {collapsed ? label.charAt(0) : label}
      </span>
    </div>
  );
}
