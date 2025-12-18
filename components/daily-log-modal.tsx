"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface DailyLogModalProps {
  selectedDate: Date
  user: any
  onClose: () => void
  onSave: () => void
}

export default function DailyLogModal({ selectedDate, user, onClose, onSave }: DailyLogModalProps) {
  const [formData, setFormData] = useState({
    date: selectedDate.toISOString().split("T")[0],
    isPeriod: false,
    flowIntensity: "medium",
    menstrualProduct: "", // Added menstrual product field
    symptoms: [] as string[],
    mood: "",
    energy: 5,
    painLevel: 0,
    exercise: "",
    diet: "",
    notes: "",
  })

  const symptomOptions = [
    "Cramps",
    "Bloating",
    "Headache",
    "Fatigue",
    "Acne",
    "Mood Swings",
    "Breast Tenderness",
    "Back Pain",
  ]
  const moodOptions = ["Happy", "Sad", "Anxious", "Calm", "Irritable", "Energetic"]

  const handleSave = () => {
    try {
      const logs = JSON.parse(localStorage.getItem("saukhya_daily_logs") || "[]")
      logs.push({ ...formData, timestamp: new Date().toISOString() })
      localStorage.setItem("saukhya_daily_logs", JSON.stringify(logs))

      if (formData.isPeriod) {
        const cycles = JSON.parse(localStorage.getItem("saukhya_cycles") || "[]")
        cycles.push({
          startDate: formData.date,
          flowIntensity: formData.flowIntensity,
          menstrualProduct: formData.menstrualProduct,
          notes: formData.notes,
        })
        localStorage.setItem("saukhya_cycles", JSON.stringify(cycles))
      }

      onSave()
    } catch (error) {
      console.error("[v0] Error saving daily log:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-3xl border-none card-shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Daily Log</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-8 h-8 p-0 hover:bg-gray-100">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-5">
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="rounded-xl border-gray-200"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#55a363]/10 rounded-xl">
            <input
              type="checkbox"
              checked={formData.isPeriod}
              onChange={(e) => setFormData({ ...formData, isPeriod: e.target.checked })}
              className="w-5 h-5 rounded accent-[#368241]"
            />
            <Label className="text-sm font-semibold text-gray-900">Period Day</Label>
          </div>

          {formData.isPeriod && (
            <>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Flow Intensity</Label>
                <select
                  value={formData.flowIntensity}
                  onChange={(e) => setFormData({ ...formData, flowIntensity: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm"
                >
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Menstrual Product Used</Label>
                <select
                  value={formData.menstrualProduct}
                  onChange={(e) => setFormData({ ...formData, menstrualProduct: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm"
                >
                  <option value="">Select product...</option>
                  <option value="disposable-pads">Disposable Pads</option>
                  <option value="tampons">Tampons</option>
                  <option value="reusable-pads">Reusable Cotton Pads</option>
                  <option value="menstrual-cup">Menstrual Cup</option>
                </select>
              </div>
            </>
          )}

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">Symptoms</Label>
            <div className="grid grid-cols-2 gap-2">
              {symptomOptions.map((symptom) => (
                <label
                  key={symptom}
                  className="flex items-center gap-2 text-sm p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.symptoms.includes(symptom)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, symptoms: [...formData.symptoms, symptom] })
                      } else {
                        setFormData({ ...formData, symptoms: formData.symptoms.filter((s) => s !== symptom) })
                      }
                    }}
                    className="w-4 h-4 rounded accent-[#368241]"
                  />
                  <span className="text-gray-700">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">Mood</Label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <Button
                  key={mood}
                  type="button"
                  variant={formData.mood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, mood })}
                  className={`rounded-full px-4 ${
                    formData.mood === mood ? "bg-gradient-green text-white border-none" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Energy Level: <span className="text-[#368241]">{formData.energy}/10</span>
            </Label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.energy}
              onChange={(e) => setFormData({ ...formData, energy: Number.parseInt(e.target.value) })}
              className="w-full accent-[#368241]"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Pain Level: <span className="text-[#b4141c]">{formData.painLevel}/10</span>
            </Label>
            <input
              type="range"
              min="0"
              max="10"
              value={formData.painLevel}
              onChange={(e) => setFormData({ ...formData, painLevel: Number.parseInt(e.target.value) })}
              className="w-full accent-[#b4141c]"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">Exercise</Label>
            <Input
              placeholder="e.g., 30 min yoga"
              value={formData.exercise}
              onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
              className="rounded-xl border-gray-200"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">Diet Notes</Label>
            <Textarea
              placeholder="What did you eat today?"
              value={formData.diet}
              onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
              className="rounded-xl border-gray-200 min-h-[80px]"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">Additional Notes</Label>
            <Textarea
              placeholder="Any other observations..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="rounded-xl border-gray-200 min-h-[80px]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-green text-white border-none rounded-full py-6 font-semibold hover:opacity-90"
            >
              Save Log
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-white rounded-full py-6 font-semibold hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
