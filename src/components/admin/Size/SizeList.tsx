// components/admin/Size/SizeList.tsx
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";
import { deleteSize, getAllSizes } from "@/redux/thunk/size.thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function SizeList({handleEditSize}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, sizes, error} = useSelector((state: RootState)=> state.size)

  useEffect(()=> {
    dispatch(getAllSizes())
  },[dispatch])
  
  const handleDeleteSize = (id: string)=>{
    dispatch(deleteSize(id))
  }

  if (isLoading) {
    return <p>Loading sizes...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load sizes</p>;
  }
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Size
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((s) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="p-2 border">{s.code}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border space-x-2">
                <button onClick={()=>handleEditSize(s)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={()=>handleDeleteSize(s._id)} className="bg-red-500 text-white px-3 py-1 rounded">
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
