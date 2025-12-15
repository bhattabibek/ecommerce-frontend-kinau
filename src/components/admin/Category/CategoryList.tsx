// components/admin/Category/CategoryList.tsx
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";
import { deleteCategory, getAllCategory } from "@/redux/thunk/category.thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryList({handleEditCategory}: any) {
  const dispatch = useDispatch<AppDispatch>();
    const { categories, isLoading, error } = useSelector(
  (state: RootState) => state.categories
  );
  useEffect(()=>{
    dispatch(getAllCategory())
  },[dispatch])

  const handleDeleteCategory = (id: string)=>{
    dispatch(deleteCategory(id))
  }

 if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load categories</p>;
  }

 return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border space-x-2">
                <button onClick={()=>handleEditCategory(c)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={()=>handleDeleteCategory(c.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}