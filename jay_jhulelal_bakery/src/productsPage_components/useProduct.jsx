import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getProducts() {
      console.log('API URL:', import.meta.env.VITE_API_URL);
// If this prints "undefined", the env var is missing
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product/allProducts`,
          { signal: controller.signal }
        );
        setProducts(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err) || err.code === 'ERR_CANCELED') return;
        console.error('Products fetch failed:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
    return () => controller.abort(); // cancel on unmount
  }, []);

  return { products, loading, error };
};

export default useProducts;