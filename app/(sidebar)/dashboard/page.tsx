import Sidebar from "@/components/SideBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currenPath="/dashboard"/>
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back! Here is an overview of your inventory.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metric */}
      </main>
    </div>
  )
}