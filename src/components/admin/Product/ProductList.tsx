// components/admin/Product/ProductList.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, getAllProductsWithPagination } from "@/redux/thunk/product.thunk";
import type { AppDispatch } from "@/redux/store";

export default function ProductList({handleEditProduct}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
const [limit] = useState(10);
const [pagination, setPagination] = useState<any>(null);
const [products, setProducts] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
  // const { products, isLoading, error } = useSelector(
  //   (state: RootState) => state.product
  // );

  useEffect(() => {
    (async()=>{
      try {
        setLoading(true)
      const result = await dispatch(getAllProductsWithPagination({
      page,
      limit
      }))
      if(getAllProductsWithPagination.fulfilled.match(result)){
        setProducts(result.payload.data)
        setPagination(result.payload.pagination)
      }
      } catch (error) {
         console.error(error);
      }finally{
        setLoading(false)
      }
    })()
  }, [dispatch, page]);

  const handleDeleteProduct = (id: string)=>{
      dispatch(deleteProduct(id))
    }

  if (loading) {
    return <p>Loading products...</p>;
  }


  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border">Name</th>
            <th className="p-2 text-left border">Price</th>
            <th className="p-2 text-left border">Category</th>
            <th className="p-3 text-left border">Stock</th>
            <th className="p-3 text-left border">Status</th>
            <th className="p-2 text-left border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">NPR {p.price}</td>
              <td className="p-2 border">{p.category?.name}</td>
              <td className="p-3">{p.totalStock}</td>
              <td className="p-3">
                {p.isActive ? "Active" : "Inactive"}
              </td>
              <td className="p-2 border space-x-2">
                <button onClick={()=>handleEditProduct(p)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={()=>handleDeleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
  <div className="flex items-center justify-between mt-4">
    <p className="text-sm text-gray-600">
      Page {pagination.page} of {pagination.pages}
    </p>

    <div className="flex gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(pagination.pages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 border rounded ${
            page === i + 1
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === pagination.pages}
        onClick={() => setPage((p) => p + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
)}

    </div>
  );
}
