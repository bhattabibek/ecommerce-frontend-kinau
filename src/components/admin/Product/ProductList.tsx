// components/admin/Product/ProductList.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, getAllProductsWithPagination } from "@/redux/thunk/product.thunk";
import type { AppDispatch } from "@/redux/store";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function ProductList({ handleEditProduct }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAllProductsWithPagination({ page, limit }));
        if (getAllProductsWithPagination.fulfilled.match(result)) {
          setProducts(result.payload.data);
          setPagination(result.payload.pagination);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, page]);

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  if (loading) {
    return <p className="text-center py-12 text-gray-500 text-lg">Loading products...</p>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-xl shadow-lg font-medium transition-all">
          <FiPlus size={18} />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="p-3 text-sm font-semibold rounded-tl-xl">Name</th>
              <th className="p-3 text-sm font-semibold">Price</th>
              <th className="p-3 text-sm font-semibold">Category</th>
              <th className="p-3 text-sm font-semibold">Stock</th>
              <th className="p-3 text-sm font-semibold">Status</th>
              <th className="p-3 text-sm font-semibold rounded-tr-xl">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-all">
                <td className="p-3 text-gray-800 font-medium">{p.name}</td>
                <td className="p-3 text-gray-700">NPR {p.price}</td>
                <td className="p-3 text-gray-700">{p.category?.name}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium shadow-inner">
                    {p.totalStock}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                    p.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEditProduct(p)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow transition"
                    title="Edit Product"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow transition"
                    title="Delete Product"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-3">
          <p className="text-gray-500 text-sm">
            Page {pagination.page} of {pagination.pages}
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-1 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Prev
            </button>

            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-1 rounded-lg border text-sm font-medium transition ${
                  page === i + 1
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-1 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
