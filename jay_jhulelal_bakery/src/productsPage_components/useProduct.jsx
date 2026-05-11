import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/product/allProducts')  // ← correct URL
      .then(res => res.json())
      .then(json => {

        if (json.success) setProducts(json.data);
        else setError('Could not load products');
      })
      .catch(() => setError('Server unreachable'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

export default useProducts;