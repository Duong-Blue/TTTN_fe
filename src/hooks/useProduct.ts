"use client";

import { fetchProductsAPI, searchProductsAPI } from '@/services/productFetch';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

export default function useProduct(limit = 5){
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState<string>('');

   const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      if (search.trim() !== '') {
        const { products, total } = await searchProductsAPI(search.trim());
        setProduct(products);
        setTotal(total);
      } else {
        const skip = page * limit;
        const { products, total } = await fetchProductsAPI(skip, limit);
        setProduct(products);
        setTotal(total);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [page, limit, search]);

  return {
    product,
    loading,
    error,
    page,
    setPage,
    total,
    limit,
    search,
    setSearch,
  };
}