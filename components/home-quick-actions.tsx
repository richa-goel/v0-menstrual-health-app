"use client"

import { Droplet, Smile, Thermometer, Heart } from "lucide-react"

interface HomeQuickActionsProps {
  onNavigate: (page: string) => void
}

export default function HomeQuickActions({ onNavigate }: HomeQuickActionsProps) {
  const actions = [
    {
      id: "period-tracker",
      label: "Period",
      icon: Droplet,
      gradient: "bg-gradient-to-br from-[#b4141c]/10 to-[#b4141c]/5",
      iconBg: "bg-gradient-to-br from-[#b4141c] to-[#b4141c]/80",
    },
    {
      id: "symptoms",
      label: "Mood",
      icon: Smile,
      gradient: "bg-gradient-to-br from-[#722062]/10 to-[#722062]/5",
      iconBg: "bg-gradient-to-br from-[#722062] to-[#722062]/80",
    },
    {
      id: "symptoms",
      label: "Symptoms",
      icon: Thermometer,
      gradient: "bg-gradient-to-br from-[#c15824]/10 to-[#c15824]/5",
      iconBg: "bg-gradient-to-br from-[#c15824] to-[#c15824]/80",
    },
    {
      id: "health-tools",
      label: "Sex",
      icon: Heart,
      gradient: "bg-gradient-to-br from-[#368241]/10 to-[#368241]/5",
      iconBg: "bg-gradient-green",
    },
  ]

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-gray-900">Quick Log</h3>
        <button className="text-xs text-[#368241] font-medium">See all →</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id + action.label}
              onClick={() => onNavigate(action.id)}
              className={`${action.gradient} rounded-2xl p-3 transition-all active:scale-95 flex flex-col items-center gap-2 card-shadow`}
            >
              <div className={`${action.iconBg} w-12 h-12 rounded-full flex items-center justify-center shadow-md`}>
                <Icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
