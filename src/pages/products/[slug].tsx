import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart.slice";

interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  priceRange?: {
    min: number;
    max: number;
  };
  mainImages: string[];
}

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Example API call
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  const price = product.priceRange?.min ?? product.basePrice;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div>
        <img
          src={product.mainImages?.[0]}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-xl text-gray-700 mt-2">
          ₹ {price}
        </p>

        <p className="mt-4 text-gray-600">
          {product.description}
        </p>

        <button
          onClick={() =>
            dispatch(
              addToCart({
                productId: product.id,
                name: product.name,
                price,
                image: product.mainImages?.[0],
                quantity: 1,
              })
            )
          }
          className="mt-6 bg-black text-white px-6 py-3 rounded hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
