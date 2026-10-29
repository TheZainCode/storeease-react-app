import { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/common/ProductCard";
import { getProducts } from "../services/productService";

function Products() {
    const controller=new AbortController();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch]=useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
    return()=>controller.abort();
  }, []);

 const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  const result = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(query);

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === "price-low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "name-desc") {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }

  return result;
}, [products, search, category, sortBy]);
const totalPages = Math.ceil(
  filteredProducts.length / PRODUCTS_PER_PAGE
);

const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

const paginatedProducts = filteredProducts.slice(
  startIndex,
  startIndex + PRODUCTS_PER_PAGE
);
useEffect(() => {
  setCurrentPage(1);
}, [search, category, sortBy]);
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-3 text-3xl font-bold text-gray-900">
        All Products
      </h1>

      <p className="mb-8 text-gray-600">
        Explore our product collection.
      </p>

      <div className="mb-8">
  <label
    htmlFor="product-search"
    className="mb-2 block font-medium text-gray-700"
  >
    Search products
  </label>

  <input
    id="product-search"
    type="search"
    value={search}
    onChange={(event) => setSearch(event.target.value)}
    placeholder="Search by product name..."
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  />
  <label
  htmlFor="product-category"
  className="mb-2 mt-4 block font-medium text-gray-700"
>
  Filter by category
</label>

<select
  id="product-category"
  value={category}
  onChange={(event) => setCategory(event.target.value)}
  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none sm:max-w-sm"
>
  <option value="all">All Categories</option>

  {[...new Set(products.map((product) => product.category))]
    .sort()
    .map((item) => (
      <option key={item} value={item}>
        {item
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </option>
    ))}
</select>
<label
  htmlFor="product-sort"
  className="mb-2 mt-4 block font-medium text-gray-700"
>
  Sort products
</label>

<select
  id="product-sort"
  value={sortBy}
  onChange={(event) => setSortBy(event.target.value)}
  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none sm:max-w-sm"
>
  <option value="default">Default Order</option>
  <option value="price-low">Price: Low to High</option>
  <option value="price-high">Price: High to Low</option>
  <option value="name-asc">Name: A to Z</option>
  <option value="name-desc">Name: Z to A</option>
</select>
{!loading && !error && totalPages > 1 && (
  <nav
    aria-label="Product pagination"
    className="mt-10 flex flex-wrap items-center justify-center gap-4"
  >
    <button
      type="button"
      onClick={() =>
        setCurrentPage((page) => Math.max(1, page - 1))
      }
      disabled={currentPage === 1}
      className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Previous
    </button>

    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>

    <button
      type="button"
      onClick={() =>
        setCurrentPage((page) => Math.min(totalPages, page + 1))
      }
      disabled={currentPage === totalPages}
      className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
    </button>
  </nav>
)}
</div>

      {loading && (
        <p className="text-gray-600">Loading products...</p>
      )}

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
  <p className="text-gray-600">
    {search.trim()
      ? "No products match your search."
      : "No products found."}
  </p>
)}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;