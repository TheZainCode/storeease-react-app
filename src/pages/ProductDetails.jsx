import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="p-8 text-gray-600">Loading product...</p>;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl p-8">
        <p role="alert" className="text-red-600">{error}</p>
        <Link to="/products" className="mt-4 inline-block text-blue-600">
          Back to Products
        </Link>
      </main>
    );
  }

  if (!product) {
    return <p className="p-8">Product not found.</p>;
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full rounded-xl object-cover"
      />

      <section>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <p className="mt-4 text-gray-600">{product.description}</p>

        <p className="mt-6 text-2xl font-bold">
          ${Number(product.price).toFixed(2)}
        </p>

        {product.category && (
          <p className="mt-3 text-sm text-gray-500">
            Category: {product.category}
          </p>
        )}

        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </section>
    </main>
  );
}

export default ProductDetails;