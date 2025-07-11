import { Product } from "@/types/product";

export const fetchProductsAPI = async (skip: number, limit: number): Promise<{ products: Product[]; total: number }> => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('failed to fetch products');
  const data = await res.json();
  return { products: data.products, total: data.total };
}

export const searchProductsAPI = async (query: string): Promise<{ products: Product[]; total: number }> => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('failed to search products');
  const data = await res.json();
  return { products: data.products, total: data.total || 0 };
};