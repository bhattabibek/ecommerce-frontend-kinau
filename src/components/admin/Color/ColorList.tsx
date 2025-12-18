// components/admin/Color/ColorList.tsx
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";
import { deleteColor, getAllColor } from "@/redux/thunk/color.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ColorList({handleEditColor}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading,colors, error} = useSelector((state:RootState)=>state.color)
  useEffect(()=> {
    dispatch(getAllColor())
  },[dispatch])

  const handleDeleteColor = (id: string)=>{
    dispatch(deleteColor(id))
  }
  if (isLoading) {
    return <p>Loading colors...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load colors</p>;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Color
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">HexCode</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((c) => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.hexCode}</td>
              <td className="p-2 border space-x-2">
                <button onClick={()=>handleEditColor(c)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={()=>handleDeleteColor(c._id)} className="bg-red-500 text-white px-3 py-1 rounded">
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
