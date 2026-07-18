"use client";

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

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">
          Increase Stock
        </h2>

        <p className="mb-4 text-gray-600">
          {product?.name}
        </p>
        
        <div className="space-y-4">
          <div>
            <label>Quantity</label>
            <input
              type="number"
              className="mt-1 w-full rounded border p-2"
            />
          </div>

          <div>
            <label>Note</label>
            <textarea
              className="mt-1 w-full rounded border p-2 resize-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>

          <button
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}