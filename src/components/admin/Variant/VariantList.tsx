// components/admin/Variant/VariantList.tsx
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVariant, getAllVariantByProduct } from "@/redux/thunk/variant.thunk";

interface Props {
  handleEditVariant: (variant: any) => void;
}

export default function VariantList({ handleEditVariant }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { products, isLoading: productLoading } = useSelector(
    (state: RootState) => state.product
  );

  const { variants, isLoading, error } = useSelector(
    (state: RootState) => state.variant
  );

  const [selectedProduct, setSelectedProduct] = useState<any>("");

  useEffect(() => {
    if (selectedProduct) {
      dispatch(getAllVariantByProduct(selectedProduct));
    }
  }, [selectedProduct, dispatch]);

  const handleDeleteVariant = (id: string)=>{
    dispatch(deleteVariant(id))
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Variant
        </button>
      </div>

      <select
        className="w-full border p-2 rounded mb-4"
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">Select Product</option>
        {products.map((p: any) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {productLoading && <p>Loading products...</p>}
      {isLoading && <p>Loading variants...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {variants.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Color</th>
              <th className="p-2 border">Size</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v: any) => (
              <tr key={v._id} className="hover:bg-gray-50">
                <td className="p-2 border">{v.product?.name}</td>
                <td className="p-2 border">{v.color?.name}</td>
                <td className="p-2 border">{v.size?.name}</td>
                <td className="p-2 border">{v.stock}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditVariant(v)}
                  >
                    Edit
                  </button>
                  <button onClick={()=>handleDeleteVariant(v._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedProduct && variants.length === 0 && !isLoading && (
        <p>No variants found for this product</p>
      )}
    </div>
  );
}
