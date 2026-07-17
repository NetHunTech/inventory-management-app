import { createClient } from "@/lib/supabase/server";

export default async function Inventory() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("id, sku, name, unit, min_stock")
    .order("name")

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load products.
      </p>
    )
  }

  return (
    <div>

      <h1 className="text-2xl font-semibold text-gray-900">
        Inventory
      </h1>
    </div>
  )
}