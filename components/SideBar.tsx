import Image from "next/image"
import Link from "next/link"
import { it } from "node:test"

export default function Sidebar({
  currenPath = "/dashboard"
}:{
  currenPath: string
}) {

  const navigation = [
    {
      name: "Dashboard", 
      href: "/dashboard", 
      icon: (
        <Image
          src="/icon.png"
          width={500}
          height={300}
          alt="Dashboard icon"
          className="rounded-2xl w-15 h-15"
        />
      )
    },
    {
      name: "Inventory", 
      href: "/inventory", 
      icon: (
        <Image
          src="/package.png"
          width={500}
          height={300}
          alt="Inventory icon"
          className="rounded-2xl w-15 h-15"
        />
      )
    },
    {
      name: "Plus", 
      href: "/add-product", 
      icon: (
        <Image
          src="/icon.png"
          width={500}
          height={300}
          alt="Plus icon"
          className="rounded-2xl w-15 h-15"
        />
      )
    },
    {
      name: "Settings", 
      href: "/settings", 
      icon: (
        <Image
          src="/settings.png"
          width={500}
          height={300}
          alt="Settings icon"
          className="rounded-2xl w-15 h-15"
        />
      )
    },

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

          return (
            <Link 
              href={item.href} 
              key={key} 
              className="flex items-center space-x-3"
            >
              {item.icon}
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}