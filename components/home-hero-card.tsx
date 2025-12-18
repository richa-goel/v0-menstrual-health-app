"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface HomeHeroCardProps {
  user: any
  onLogClick: () => void
  onNavigate: (page: string) => void
  onDateClick: (date: Date) => void
}

export default function HomeHeroCard({ user, onLogClick, onNavigate, onDateClick }: HomeHeroCardProps) {
  const [cycleDay, setCycleDay] = useState(1)
  const [phase, setPhase] = useState("Follicular")
  const [daysUntilNext, setDaysUntilNext] = useState(0)

  useEffect(() => {
    if (user?.lastPeriodDate && user?.cycleLength) {
      const lastPeriod = new Date(user.lastPeriodDate)
      const today = new Date()
      const daysSince = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24))
      const currentDay = (daysSince % user.cycleLength) + 1
      setCycleDay(currentDay)

      const daysUntil = user.cycleLength - currentDay
      setDaysUntilNext(daysUntil)

      if (currentDay <= user.periodDuration) {
        setPhase("Menstruation")
      } else if (currentDay <= 13) {
        setPhase("Follicular")
      } else if (currentDay <= 16) {
        setPhase("Ovulation")
      } else {
        setPhase("Luteal")
      }
    }
  }, [user])

  const getWeekDates = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const dates = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - dayOfWeek + i)
      dates.push(date)
    }

    return dates
  }

  const weekDates = getWeekDates()
  const todayIndex = new Date().getDay()

  return (
    <Card className="m-4 overflow-hidden border-none card-shadow-lg">
      <div className="bg-gradient-green p-6 pb-20 text-white relative">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-1">Hey, {user?.name || "Sarah"}</h1>
          <p className="text-white/80 text-sm">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Cycle Status Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
          Day {cycleDay}
        </div>

        <div className="flex justify-between items-center mb-6 text-white/90 text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => {
            const date = weekDates[idx]
            const isToday = idx === todayIndex

            return (
              <button
                key={idx}
                onClick={() => onDateClick(date)}
                className="text-center transition-transform active:scale-95"
              >
                <div className="mb-1">{day}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isToday ? "bg-white text-pink-500 font-bold" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {date.getDate()}
                </div>
              </button>
            )
          })}
        </div>

        {/* Prediction Card */}
        <div className="bg-white/95 rounded-3xl p-6 text-center shadow-xl absolute left-4 right-4 -bottom-10">
          <p className="text-sm text-gray-600 mb-1">Prediction:</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {phase === "Menstruation" ? "Period" : `Day of ${phase.toLowerCase()}`}
          </h2>
          <Button
            onClick={onLogClick}
            className="bg-gradient-green text-white border-none rounded-full px-6 py-2 text-sm font-medium hover:opacity-90"
          >
            Log period
          </Button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="pt-16 px-4 pb-4">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <p className="text-gray-500 mb-1">Period in</p>
            <p className="font-bold text-gray-900">{daysUntilNext} days</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Fertile window</p>
            <p className="font-bold text-gray-900">{phase === "Ovulation" ? "Today" : "2 days"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Ovulation in</p>
            <p className="font-bold text-gray-900">{phase === "Ovulation" ? "Today" : "2 days"}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
