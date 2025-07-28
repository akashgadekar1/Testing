
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  company: string;
  rating: number;
  featured: boolean;
  createdAt: string;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://backend-product-tu2m.onrender.com/api/products"
      );
      if (res.data && res.data.Products) {
        setProducts(res.data.Products);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h2 className="text-center text-xl p-4">Loading...</h2>;

  if (products.length === 0)
    return <h2 className="text-center text-xl p-4">No products found</h2>;

  return (
 
 <div className="min-h-screen  py-8 px-4 flex justify-center">
  <div className="max-w-7xl w-full">
    <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">📦 Product List</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => {
        const createdAt = new Date(product.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={product._id}
            className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
              
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">₹ {product.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Company: {product.company}</p>
              <p className="text-sm text-gray-600">Featured: {product.featured ? "✅ Yes" : "❌ No"}</p>
              <p className="text-xs text-gray-500 mt-3">🕒 Created: {createdAt}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>



  );
};

export default App;
