"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string
  sku: string
  name: string
  unit: string
  min_stock: number
}

type Props = {
  products: Product[]
}

export default function ProductTable({ products }: Props) {
  const [search, setSearch] = useState("")

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
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">Minimum Stock</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{product.sku}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.unit}</td>
                <td className="p-3">{product.min_stock}</td>
              </tr>
            ))}

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
      </div>
    </div>
  )
}