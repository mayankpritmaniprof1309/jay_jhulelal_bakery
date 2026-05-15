import { useState, useEffect } from 'react';
import axios  from 'axios'

const useProducts = () => {
  console.log(import.meta.env.VITE_API_URL);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    async function getProducts(){
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/product/allProducts`)
    await setLoading(false)
    setProducts(response.data)
   }
   getProducts()
  }, []);

  return { products, loading, error };
};

export default useProducts;