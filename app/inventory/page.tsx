import { createClient } from "@/lib/supabase/server";
import ProductTable from "@/components/ProductTable";
import Sidebar from "@/components/SideBar";

export default async function Inventory() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("inventory")
    .select(`
      quantity,
      products (
        id,
        sku,
        name,
        unit,
        min_stock
      )
    `)
    .order("product_id")

  const products =
    data?.map((item) => ({
      id: item.products.id,
      sku: item.products.sku,
      name: item.products.name,
      unit: item.products.unit,
      min_stock: item.products.min_stock,
      quantity: item.quantity,
    })) ?? []

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load products.
      </p>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currenPath="/inventory"/>
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Inventory
              </h1>

              <ProductTable products={products}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}