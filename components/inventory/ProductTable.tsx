"use client";

import { useMemo, useState } from "react";
import IncreaseStockModal from "./IncreaseStockModal";

type Product = {
  id: string
  sku: string
  name: string
  unit: string
  min_stock: number
  quantity: number
}

type Props = {
  products: Product[]
}

export default function ProductTable({ products }: Props) {
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded border p-2"
        placeholder="Search by name or SKU..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-lg border">
        <table>

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Minimum</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => {
              const status = product.quantity === 0
                ? "Out of Stock"
                : product.quantity <= product.min_stock
                ? "Low Stock"
                : "In Stock";

              return(
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.sku}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3">{product.min_stock}</td>
                  <td className="p-3">
                    {status === "In Stock" && (
                      <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                        In Stock
                      </span>
                    )}
                    {status === "Low Stock" && (
                      <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-700">
                        Low Stock
                      </span>
                    )}
                    {status === "Out of Stock" && (
                      <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="mr-2 rounded bg-green-600 px-2 py-1 text-white"
                    >
                      +
                    </button>
                    <button className="rounded bg-red-600 px-2 py-1 text-white">
                      -
                    </button>
                  </td>
                </tr>
              )
            })}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>

        </table>

        <IncreaseStockModal
          open={selectedProduct !== null}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  )
}