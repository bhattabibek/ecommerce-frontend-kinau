// src/components/admin/Color/ColorForm.tsx
import { addColor, updateColorReducer } from "@/redux/features/color.slice";
import type { AppDispatch } from "@/redux/store";
import { createColor, updateColor } from "@/redux/thunk/color.thunk";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface ColorData {
  _id: string;
  name: string;
  hexCode: string;
}

interface ColorFormProps {
  initialData?: ColorData |null;
}

export default function ColorForm({ initialData }: ColorFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  const [name, setName] = useState(initialData?.name || "");
  const [hexCode, setHexCode] = useState(initialData?.hexCode || "#000000");
  const isEditMode = Boolean(initialData?._id);


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if(isEditMode){
      const result = await dispatch(
        updateColor({
          _id: initialData!._id,
          name,
          hexCode,
        })
      )
      if (updateColor.fulfilled.match(result)) {
        dispatch(updateColorReducer(result.payload));
        toast.success("Color updated");
      }
    }else {
      try {
        const resultAction = await dispatch(createColor({name, hexCode}))
        dispatch(addColor(resultAction.payload))
        toast.success("color created")
      } catch (error: any) {
        console.log("Failed:", error)
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">Add / Edit Color</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Color Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Enter color name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Color Hex</label>
        <input
          type="color"
          value={hexCode}
          onChange={(e) => setHexCode(e.target.value)}
          className="w-16 h-10 border rounded cursor-pointer"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
