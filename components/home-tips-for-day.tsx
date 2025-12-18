"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Dumbbell, Brain, Apple } from "lucide-react"

interface HomeTipsForDayProps {
  user: any
}

export default function HomeTipsForDay({ user }: HomeTipsForDayProps) {
  const [tips, setTips] = useState({
    exercise: "Light yoga or walking",
    meditation: "5-minute breathing exercise",
    diet: "Stay hydrated and eat iron-rich foods",
    phase: "period", // Added phase for better context
  })

  useEffect(() => {
    if (user?.lastPeriodDate && user?.cycleLength) {
      const lastPeriod = new Date(user.lastPeriodDate)
      const today = new Date()
      const daysSince = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24))
      const currentDay = (daysSince % user.cycleLength) + 1

      if (currentDay <= user.periodDuration) {
        setTips({
          exercise: "Gentle stretching, light walking, or restorative yoga",
          meditation: "10-minute body scan meditation to ease discomfort",
          diet: "Iron-rich foods (spinach, lentils), magnesium (dark chocolate, nuts), and plenty of water",
          phase: "period", // Updated phase
        })
      } else if (currentDay <= 13) {
        setTips({
          exercise: "Cardio workouts, strength training, high-intensity exercises",
          meditation: "Energizing breathing exercises and positive affirmations",
          diet: "Lean proteins, whole grains, fermented foods for gut health",
          phase: "follicular", // Updated phase
        })
      } else if (currentDay <= 16) {
        setTips({
          exercise: "Peak performance workouts, running, cycling, HIIT",
          meditation: "Gratitude meditation and visualization exercises",
          diet: "Antioxidant-rich foods (berries, leafy greens), omega-3 fatty acids",
          phase: "ovulatory", // Updated phase
        })
      } else {
        setTips({
          exercise: "Moderate exercises like swimming, pilates, brisk walking",
          meditation: "Calming meditation, progressive muscle relaxation",
          diet: "Complex carbs (sweet potatoes, quinoa), magnesium-rich foods, reduce caffeine",
          phase: "luteal", // Updated phase
        })
      }
    }
  }, [user])

  return (
    <div className="px-4 mb-6">
      <h3 className="text-base font-bold text-gray-900 mb-3">For you • During {tips.phase || "period"}</h3>
      <div className="space-y-3">
        <Card className="p-4 bg-gradient-to-r from-[#55a363]/10 to-[#368241]/10 border-none card-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-green flex items-center justify-center flex-shrink-0">
              <Dumbbell className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1 text-sm">Exercise</p>
              <p className="text-xs text-gray-600 leading-relaxed">{tips.exercise}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-[#722062]/10 to-[#722062]/5 border-none card-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-purple-red flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1 text-sm">Meditation</p>
              <p className="text-xs text-gray-600 leading-relaxed">{tips.meditation}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-[#c15824]/10 to-[#c15824]/5 border-none card-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-green-orange flex items-center justify-center flex-shrink-0">
              <Apple className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1 text-sm">Diet</p>
              <p className="text-xs text-gray-600 leading-relaxed">{tips.diet}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
