import { Link } from "react-router-dom";
function ProductCard({ product }) {
  return (
    <article className="rounded-xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 h-40 w-full rounded-lg object-cover"
      />

      <h3 className="font-semibold text-gray-900">
        <Link to={`products/${product.id}`} className="hover:text-blue-600">
        {product.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
        {product.description}
      </p>

      <p className="mt-3 text-lg font-bold text-gray-900">
        ${Number(product.price).toFixed(2)}
      </p>
      <Link to={`products/${product.id}`} className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-800">View Details →</Link>
    </article>
  );
}

export default ProductCard;