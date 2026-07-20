"use client"

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Product = {
  id: string
  sku: string
  name: string
};

type Movement = {
  id: string
  movement_type: "IN" | "OUT"
  quantity: number
  note: string | null
  created_at: string
};

type Props = {
  open: boolean
  product: Product | null
  onClose: () => void
};

export default function StockHistoryModal({
  open,
  product,
  onClose,
}: Props) {
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [movements, setMovements] = useState<Movement[]>([])

  useEffect(() => {
    if (!open || !product) return

    async function loadHistory() {
      setLoading(true)

      const { data, error } = await supabase
        .from("stock_movements")
        .select("*")
        .eq("product_id", product?.id)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setMovements(data as Movement[])
      }

      setLoading(false)
    }

    loadHistory()
  }, [open, product, supabase])

  if (!open || !product) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="text-xl font-bold">
          Stock History
        </h2>

        <p className="mb-6 text-gray-600">
          {product.name} ({product.sku})
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : movements.length === 0 ? (
          <p>No stock movements found.</p>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Note</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {movements.map((movement) => (
                  <tr key={movement.id} className="border-b">
                    <td className="p-2">
                      {movement.movement_type === "IN"
                        ? "🟢 IN"
                        : "🔴 OUT"}
                    </td>
                    
                    <td className="p-2">
                      {movement.quantity}
                    </td>

                    <td className="p-2">
                      {movement.note || "-"}
                    </td>

                    <td className="p-2">
                      {new Date(movement.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded cursor-pointer bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}