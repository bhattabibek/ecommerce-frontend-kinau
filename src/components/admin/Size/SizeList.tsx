// components/admin/Size/SizeList.tsx
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";
import { deleteSize, getAllSizes } from "@/redux/thunk/size.thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function SizeList({ handleEditSize }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, sizes, error } = useSelector((state: RootState) => state.size);

  useEffect(() => {
    dispatch(getAllSizes());
  }, [dispatch]);

  const handleDeleteSize = (id: string) => {
    dispatch(deleteSize(id));
  };

  if (isLoading) {
    return <p className="text-center py-8 text-gray-500 text-lg">Loading sizes...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-8 text-lg">Failed to load sizes</p>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Sizes</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-xl shadow-lg font-medium transition-all">
          <FiPlus size={18} />
          Add Size
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="p-3 text-sm font-semibold rounded-tl-xl">Code</th>
              <th className="p-3 text-sm font-semibold">Name</th>
              <th className="p-3 text-sm font-semibold rounded-tr-xl">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {sizes.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50 transition-all">
                <td className="p-3 text-gray-800 font-medium">{s.code}</td>
                <td className="p-3 text-gray-700">{s.name}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEditSize(s)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow transition"
                    title="Edit Size"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSize(s._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow transition"
                    title="Delete Size"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
