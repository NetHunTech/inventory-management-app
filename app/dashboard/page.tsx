import Sidebar from "@/components/SideBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currenPath="/dashboard"/>
    </div>
  )
}