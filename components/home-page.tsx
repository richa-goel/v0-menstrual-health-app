"use client"

import { useState } from "react"
import HomeHeroCard from "./home-hero-card"
import HomeTipsForDay from "./home-tips-for-day"
import HomeTestimonials from "./home-testimonials"
import DailyLogModal from "./daily-log-modal"
import FuturePredictionModal from "./future-prediction-modal"

interface HomePageProps {
  user: any
  onNavigate: (page: string) => void
}

export default function HomePage({ user, onNavigate }: HomePageProps) {
  const [showDailyLog, setShowDailyLog] = useState(false)
  const [showFuturePrediction, setShowFuturePrediction] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleDateClick = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const clickedDate = new Date(date)
    clickedDate.setHours(0, 0, 0, 0)

    setSelectedDate(date)

    if (clickedDate <= today) {
      // Past or today - show daily log modal
      setShowDailyLog(true)
    } else {
      // Future - show prediction modal
      setShowFuturePrediction(true)
    }
  }

  return (
    <div className="max-w-md mx-auto pb-24">
      <HomeHeroCard
        user={user}
        onLogClick={() => {
          setSelectedDate(new Date())
          setShowDailyLog(true)
        }}
        onNavigate={onNavigate}
        onDateClick={handleDateClick}
      />

      <HomeTipsForDay user={user} />

      <HomeTestimonials />

      {showDailyLog && (
        <DailyLogModal
          selectedDate={selectedDate}
          user={user}
          onClose={() => setShowDailyLog(false)}
          onSave={() => {
            setShowDailyLog(false)
            // Trigger refresh of data if needed
          }}
        />
      )}

      {showFuturePrediction && (
        <FuturePredictionModal selectedDate={selectedDate} user={user} onClose={() => setShowFuturePrediction(false)} />
      )}
    </div>
  )
}
