// components/admin/Category/CategoryForm.tsx
import { addCategories } from "@/redux/features/category.slice";
import { createCategory } from "@/redux/thunk/category.thunk";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface CategoryFormProps {
  initialData?: { id: string; name: string } | null;
}
interface CategoryData{
  name:string;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const dispatch = useDispatch<any>();
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(createCategory({name}))
      if(createCategory.fulfilled.match(resultAction)) {
        dispatch(addCategories(resultAction.payload))
        alert("category created")
      }else {
        console.error("Failed to create category:", resultAction)
      }
    } catch (error: any) {
      console.log("Failed:", error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Add / Edit Category</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
