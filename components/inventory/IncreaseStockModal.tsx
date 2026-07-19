"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation"
import { useState } from "react";

type Product = {
  id: string;
  sku: string;
  name: string;
  quantity: number;
};

type Props = {
  open: boolean
  product: Product | null
  onClose: () => void
}

export default function IncreaseStockModal({
  open,
  product,
  onClose,
}: Props) {

  const supabase = createClient()
  const router = useRouter()

  const [quantity, setQuantity] = useState<number>(1)
  const [note, setNote] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  if (!open || !product) return null

  const handleSave = async () => {
    setLoading(true)

    const { error } = await supabase.rpc("add_stock", {
      p_product_id: product.id,
      p_quantity: quantity,
      p_note: note,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setQuantity(1)
    setNote("")

    onClose()
    router.refresh()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">
          Increase Stock
        </h2>

        <p className="mb-4 text-gray-600">
          {product?.name} ({product?.sku})
        </p>
        
        <div className="space-y-4">
          <div>
            <label>Quantity</label>
            <input
              type="number"
              className="mt-1 w-full rounded border p-2"
              onChange={e => setQuantity(Number(e.target.value))}
              min={1}
              value={quantity}
            />
          </div>

          <div>
            <label>Note</label>
            <textarea
              className="mt-1 w-full rounded border p-2 resize-none"
              onChange={e => setNote(e.target.value)}
              value={note}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded cursor-pointer bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded cursor-pointer bg-green-600 px-4 py-2 text-white hover:bg-green-800"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}