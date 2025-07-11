

import { Product } from '@/types/product';
import Image from 'next/image';
import React from 'react';

export default function ProductList({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-400">No products found</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 shadow bg-black text-white">
      <table className="min-w-full divide-gray-700">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Id</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">thumbnail</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">title</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">discountPercentage</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">rating</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">brand</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">category</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-900 transition-colors">
              <td className="px-4 py-2 text-sm">{product.id}</td>
              <td className="px-4 py-2">
                <Image
                  src={product.thumbnail}
                  alt={product.description}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="px-4 py-2 text-sm font-medium">
                 {product.title}
              </td>
              <td className="px-4 py-2 text-sm">{product.discountPercentage}</td>
              <td className="px-4 py-2 text-sm">{product.rating}</td>
              <td className="px-4 py-2 text-sm">
                <span className="text-gray-400">{product.brand}</span>
              </td>
              <td className="px-4 py-2 text-sm">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}