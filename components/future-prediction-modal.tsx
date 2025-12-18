"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Droplet, Activity, Apple, Brain } from "lucide-react"

interface FuturePredictionModalProps {
  selectedDate: Date
  user: any
  onClose: () => void
}

export default function FuturePredictionModal({ selectedDate, user, onClose }: FuturePredictionModalProps) {
  // Calculate predicted cycle phase for the selected future date
  const getPredictedPhase = () => {
    if (!user?.lastPeriodDate || !user?.cycleLength) return "Unknown"

    const lastPeriod = new Date(user.lastPeriodDate)
    const daysSince = Math.floor((selectedDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24))
    const cycleDay = (daysSince % user.cycleLength) + 1

    if (cycleDay <= user.periodDuration) return "Menstruation"
    if (cycleDay <= 13) return "Follicular"
    if (cycleDay <= 16) return "Ovulation"
    return "Luteal"
  }

  const phase = getPredictedPhase()

  const getPredictedSymptoms = () => {
    switch (phase) {
      case "Menstruation":
        return ["Cramps", "Fatigue", "Lower back pain", "Bloating"]
      case "Follicular":
        return ["Increased energy", "Better mood", "Clearer skin"]
      case "Ovulation":
        return ["Peak energy", "Increased libido", "Mild cramping"]
      case "Luteal":
        return ["Mood changes", "Breast tenderness", "Food cravings", "Fatigue"]
      default:
        return []
    }
  }

  const getSuggestedWorkout = () => {
    switch (phase) {
      case "Menstruation":
        return "Gentle yoga, stretching, walking"
      case "Follicular":
        return "HIIT, strength training, cardio"
      case "Ovulation":
        return "High-intensity workouts, running, cycling"
      case "Luteal":
        return "Moderate cardio, pilates, swimming"
      default:
        return "Listen to your body"
    }
  }

  const getSuggestedDiet = () => {
    switch (phase) {
      case "Menstruation":
        return "Iron-rich foods (spinach, lentils), magnesium (dark chocolate, nuts), omega-3 (fish, chia seeds)"
      case "Follicular":
        return "Protein-rich foods, fresh vegetables, whole grains, fermented foods"
      case "Ovulation":
        return "Antioxidant-rich fruits, leafy greens, healthy fats (avocado, olive oil)"
      case "Luteal":
        return "Complex carbs, B-vitamins, calcium-rich foods, reduce salt and caffeine"
      default:
        return "Balanced, nutritious meals"
    }
  }

  const getSuggestedMeditation = () => {
    switch (phase) {
      case "Menstruation":
        return "Gentle body scan meditation, rest and restore practice"
      case "Follicular":
        return "Energizing breath work, gratitude meditation"
      case "Ovulation":
        return "Confidence-building visualization, power meditation"
      case "Luteal":
        return "Calming breathwork, anxiety-relief meditation, self-compassion practice"
      default:
        return "Mindfulness meditation"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-3xl border-none card-shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Future Prediction</h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-8 h-8 p-0 hover:bg-gray-100">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Predicted Phase */}
        <div className="bg-gradient-green text-white rounded-2xl p-6 mb-6 text-center">
          <p className="text-sm mb-2 text-white/80">Predicted Phase</p>
          <h3 className="text-3xl font-bold">{phase}</h3>
        </div>

        <div className="space-y-5">
          {/* Predicted Symptoms */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="w-5 h-5 text-[#b4141c]" />
              <h4 className="font-semibold text-gray-900">Expected Symptoms</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {getPredictedSymptoms().map((symptom) => (
                <span key={symptom} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Workout */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-[#368241]" />
              <h4 className="font-semibold text-gray-900">Suggested Workout</h4>
            </div>
            <p className="text-sm text-gray-700 bg-[#55a363]/10 p-4 rounded-xl">{getSuggestedWorkout()}</p>
          </div>

          {/* Suggested Diet */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Apple className="w-5 h-5 text-[#c15824]" />
              <h4 className="font-semibold text-gray-900">Suggested Diet</h4>
            </div>
            <p className="text-sm text-gray-700 bg-[#c15824]/10 p-4 rounded-xl">{getSuggestedDiet()}</p>
          </div>

          {/* Meditation Module */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-[#722062]" />
              <h4 className="font-semibold text-gray-900">Meditation Practice</h4>
            </div>
            <p className="text-sm text-gray-700 bg-[#722062]/10 p-4 rounded-xl">{getSuggestedMeditation()}</p>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-green text-white border-none rounded-full py-6 font-semibold hover:opacity-90"
        >
          Close
        </Button>
      </Card>
    </div>
  )
}
