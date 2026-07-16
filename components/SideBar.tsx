"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { IoMdSettings } from "react-icons/io";
import { PiPackage } from "react-icons/pi";
import { TiPlus } from "react-icons/ti";
import { MdOutlineInventory } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { PiSignOutLight } from "react-icons/pi";
import { createClient } from "@/lib/supabase/client";

export default function Sidebar({
  currenPath = "/dashboard"
}:{
  currenPath: string
}) {

  const supabase = createClient()
  const router = useRouter()
  
  const [user, setUser] = useState<any>(null)
  const [openProfile, setOpenProfile] = useState(false)

  useEffect(() => {
    async function getUser(){
      const { data } = await supabase.auth.getUser()

      if(data.user){
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  async function logout(){

    await supabase.auth.signOut()
    router.push("/")

  }

  const navigation = [
    {name: "Dashboard", href: "/dashboard", icon: <MdOutlineInventory />},
    {name: "Inventory", href: "/inventory", icon: <PiPackage />},
    {name: "Add product", href: "/add-product", icon: <TiPlus />},
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
              <span className="w-5">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div 
          onClick={() => setOpenProfile(!openProfile)}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
        >

          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">
              {user?.user_metadata?.name || "User"}
            </p>

            <p className="text-xs text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        {openProfile && (
            <div className="absolute bottom-20 left-6 w-52 bg-gray-800 rounded-xl shadow-lg p-3">
              <div className="flex items-center px-3 rounded-lg hover:bg-gray-700">
                <RiAccountCircleLine />
                <Link
                  href="/settings"
                  className="block px-3 py-2 text-sm"
                >
                  Account Settings
                </Link>
              </div>

              
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-700 text-red-400"
              >
                <PiSignOutLight />
                Sign out
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}