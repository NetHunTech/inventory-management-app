import ProductForm from "@/components/ProductForm";
import Sidebar from "@/components/SideBar";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {<Sidebar currenPath="/add-product"/>}
      <main className="ml-64 p-8">
        <div className="mb-8">

          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Add Product
          </h1>

          <ProductForm />
        </div>
      </main>

    </div>
  );
}