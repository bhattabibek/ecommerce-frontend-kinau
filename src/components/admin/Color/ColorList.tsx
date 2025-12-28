// components/admin/Color/ColorList.tsx
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";
import { deleteColor, getAllColor } from "@/redux/thunk/color.thunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function ColorList({ handleEditColor }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, colors, error } = useSelector((state: RootState) => state.color);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllColor());
  }, [dispatch]);

  const handleDeleteColor = (id: string) => {
    dispatch(deleteColor(id));
  };

  if (isLoading) {
    return <p className="text-center py-8 text-gray-500 text-lg">Loading colors...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-8 text-lg">Failed to load colors</p>;
  }

  // Filter colors based on search input
  const filteredColors = colors.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.hexCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Colors</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search colors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-xl shadow-lg font-medium transition-all">
            <FiPlus size={18} />
            Add Color
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="p-3 text-sm font-semibold rounded-tl-xl">Name</th>
              <th className="p-3 text-sm font-semibold">Hex Code</th>
              <th className="p-3 text-sm font-semibold rounded-tr-xl">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredColors.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No colors found.
                </td>
              </tr>
            ) : (
              filteredColors.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-all">
                  <td className="p-3 text-gray-800 font-medium">{c.name}</td>
                  <td className="p-3 text-gray-700">{c.hexCode}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEditColor(c)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow transition"
                      title="Edit Color"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteColor(c._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow transition"
                      title="Delete Color"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
