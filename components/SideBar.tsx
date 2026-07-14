import Image from "next/image"
import Link from "next/link"
import { IoMdSettings } from "react-icons/io";
import { PiPackage } from "react-icons/pi";
import { TiPlus } from "react-icons/ti";
import { MdOutlineInventory } from "react-icons/md";

export default function Sidebar({
  currenPath = "/dashboard"
}:{
  currenPath: string
}) {

  const navigation = [
    {name: "Dashboard", href: "/dashboard", icon: <MdOutlineInventory />},
    {name: "Inventory", href: "/inventory", icon: <PiPackage />},
    {name: "Plus", href: "/add-product", icon: <TiPlus />},
    {name: "Settings", href: "/settings", icon: <IoMdSettings />},
  ]

  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Image
            src="/icon.png"
            width={500}
            height={300}
            alt="Inventory dashboard"
            className="rounded-2xl w-15 h-15"
          />
          <span className="text-lg font-semibold">Inventory App</span>
        </div>
      </div>

      <nav className="space-y-1">
        <div className="text-sm font-semibold text-gray-400 uppercase">
          Inventory
        </div>
        {navigation.map((item, key) => {
          const isActive = currenPath === item.href
          return (
            <Link 
              href={item.href} 
              key={key} 
              className={
                `flex items-center space-x-3 py-2 px-3 rounded-lg 
                ${isActive ? "bg-blue-100 text-gray-800" : "hover:bg-gray-800 text-gray-300"}`
              }
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottow-0 left-0 rigt-0 p-6 border-t border-gray-700">
        <div className="flex item-center justify-between">
          <span>User here</span>
        </div>
      </div>
    </div>
  )
}