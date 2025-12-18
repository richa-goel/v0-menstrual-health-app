"use client"

import { Home, Calendar, Activity, Users } from "lucide-react"

interface BottomNavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function BottomNavigation({ currentPage, setCurrentPage }: BottomNavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Today", icon: Home },
    { id: "consultation", label: "Consult", icon: Calendar },
    { id: "health-tools", label: "Health", icon: Activity },
    { id: "community", label: "Community", icon: Users },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 max-w-7xl mx-auto w-full relative">
        {navItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                currentPage === item.id ? "text-[#368241]" : "text-gray-500"
              } ${idx === 2 ? "ml-16" : ""}`}
            >
              <Icon className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          )
        })}

        <button
          onClick={() => setCurrentPage("log")}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-[#4c555a] text-white shadow-2xl flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="text-2xl font-light">+</span>
        </button>
      </div>
    </nav>
  )
}
