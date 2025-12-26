import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import type { RootState } from "@/redux/root-reducer";
import { getAllProducts } from "@/redux/thunk/product.thunk";
import { Card, CardContent } from "@/components/ui/Card";
import { getAllCategory } from "@/redux/thunk/category.thunk";
import ProductCard from "@/components/ui/card/product-card";

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector((state: RootState) => state.product);
    const{isLoading: categoryLoading, categories} = useSelector((state:RootState)=>state.categories);
  // Filters mapped directly to backend query params
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  // Fetch from backend whenever filters change
  useEffect(() => {
    dispatch(
      getAllProducts({
        page,
        limit,
        search: search || undefined,
        category,
        minPrice,
        maxPrice,
        sort,
      })
    );
  }, [dispatch, page, limit, search, category, minPrice, maxPrice, sort]);
  useEffect(() => {
  dispatch(getAllCategory());
}, [dispatch]);


    const isOutOfStock = (product: any) => product.totalStock <= 0;

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category */}
        <Select
  value={category ?? "all"}
  onValueChange={(v) => {
    setPage(1);
    setCategory(v === "all" ? undefined : v);
  }}
>
  <SelectTrigger>
    <SelectValue placeholder="Category" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="all">All</SelectItem>

    {categoryLoading ? (
      <SelectItem value="loading" disabled>
        Loading...
      </SelectItem>
    ) : (
      categories.map((cat) => (
        <SelectItem key={cat.id} value={cat.id}>
          {cat.name}
        </SelectItem>
      ))
    )}
  </SelectContent>
</Select>


        {/* Sort By */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low-high">Price: Low to High</SelectItem>
            <SelectItem value="high-low">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Range */}
        <Input
          type="number"
          placeholder="Min Price"
          onChange={(e) => {
            setPage(1);
            setMinPrice(e.target.value ? Number(e.target.value) : undefined);
          }}
        />
        <Input
          type="number"
          placeholder="Max Price"
          onChange={(e) => {
            setPage(1);
            setMaxPrice(e.target.value ? Number(e.target.value) : undefined);
          }}
        />
      </div>

      {/* Product List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <>
            <ProductCard product ={ product} />
            </>
  
))}

        </div>
      )}
    </div>
  );
}
