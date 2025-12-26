// components/admin/Size/SizeForm.tsx
import { addSize } from "@/redux/features/size.slice";
import type { AppDispatch } from "@/redux/store";
import { createSize, updateSize } from "@/redux/thunk/size.thunk";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSize as updateSizeReducer } from "@/redux/features/size.slice";
import toast from "react-hot-toast";

interface SizeFormProps {
  initialData?: { _id:string,name:string, code:string, description:string} | null;
}
interface SizeForm {
  name:string;
  code: string;
  description: string;
}

export default function SizeForm({  initialData }: SizeFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(initialData?.name || "");
  const [code, setCode] = useState(initialData?.code || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const isEditMode = Boolean(initialData?._id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(isEditMode){
      const result = await dispatch(
        updateSize({
          id: initialData!._id,
          name,
          code,
          description,
        })
      );

      if (updateSize.fulfilled.match(result)) {
        dispatch(updateSizeReducer(result.payload));
        toast.success("Size updated");
      }
    }else {
    try {
      const resultAction = await dispatch(createSize({name, code, description}))
      if(createSize.fulfilled.match(resultAction)) {
        dispatch(addSize(resultAction.payload))
        toast.success("size created")
      }else {
        console.log("Failed to create size")
      }
    } catch (error: any) {
      console.log("Failed:", error)
    }
    }

    
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Add / Edit Size</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
