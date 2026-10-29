import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProducts } from "../services/productService";
import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";

const features = [
    {
        number: "01",
        title: "Secure Route Structure",
        description:
        "Organize public and protected pages using React Router.",
    },
    {
        number: "02",
        title: "Validated Forms",
        description: 
        "Build forms with React Hook Form and Zod validation.",
    },
    {
        number: "03",
        title: "Reusable Architecture",
        description:
        "Keep components, services, hooks, and application state organized.",
    },
];
function Home(){
    const { isAuthenticated }=useAuth();
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");
    const [products, setProducts]=useState([]);
    useEffect(() => {
      const controller = new AbortController();

      async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
       } catch (err) {
        if (err.name !== "AbortError") {
        setError(err.message || "Failed to load products.");
       }
       } finally {
         setLoading(false);
        }
    }

    loadProducts();

    return () => controller.abort();
}, []);
    return(
        <div className="space-y-20 py-8">
            <section className="grid items-center gap-10 md:grid-cols-2 md:py-12">
                <div>
                   <p className="mb-4 inline-flex px-3 py-1 text-sm bg-indigo-500 text-indigo-700 font-semibold rounded-full">Production-Style React Project</p> 
                   <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                    Build better workflows with modern React.
                   </h1>
                   <p className="mt-6 max-w-xl leading-7 text-slate-600">
                    Expolre a modern application architecture featuring reusable components, validated forms, autentication flows, and responsive design.
                   </p>
                   <div className="mt-8 flex flex-wrap gap-4">
                    <Link to={isAuthenticated ? "/dashboard" : "/register"} className="rounded-lg px-5 py-3  font-semibold text-white bg-indigo-600 hover:bg-indigo-700">
                    {isAuthenticated ? "Open Dashboard" : "Get Started"}</Link>
                    {!isAuthenticated && (
                        <Link to="/login" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100">Sign In</Link>
                    )}
                   </div>
                </div>
                <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-10">
                  <p className="text-sm font-medium text-indigo-300">PROJECT OVERVIEW</p>
                  <h2 className="mt-5 text-2xl font-bold">
                    One application. A maintainable architecture.  
                  </h2>

                  <ul className="mt-8 space-y-5">
                    {[
                        "Reusable React components",
                        "Centralized authentication state",
                        "Form validation and error feedback",
                        "Responsive Tailwind CSS layout",
                    ].map((item)=>(
                        <li key={item} className="flex items-start gap-3">
                            <span aria-hidden="true" className="mt-1 text-indigo-300">✓</span>
                            <span className="text-slate-200">{item}</span>
                        </li>
                    ))
                    }
                    </ul>  
                </div>
            </section>
            <section>
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight">Designed with modern React patterns</h2>
                    <p className="mt-3 leading-7 text-slate-600">
                        Build on a clean foundation that can grow as the application gains more features.
                    </p>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {features.map((feature)=>(
                        <article key={feature.number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-bold text-indigo-600">{feature.number}</p>
                            <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-6 py-12">
  <h2 className="mb-6 text-3xl font-bold">
    Featured Products
  </h2>

  {loading && (
    <p className="text-gray-600">Loading products...</p>
  )}

  {error && (
    <p role="alert" className="text-red-600">
      {error}
    </p>
  )}

  {!loading && !error && products.length === 0 && (
    <p className="text-gray-600">No products found.</p>
  )}

  {!loading && !error && products.length > 0 && (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )}
</section>
        </div>
    );
}
export default Home;