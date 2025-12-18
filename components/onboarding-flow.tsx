"use client"

import { useState } from "react"

interface OnboardingFlowProps {
  onComplete: (userData: any) => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    menstrualProducts: [] as string[],
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    bmi: "",
    unexplainedWeightGain: "",
    weightGainTiming: "",
    difficultLosingWeight: "",
    cycleLength: "28",
    periodDuration: "5",
    flowIntensity: "moderate",
    lastPeriodDate: "",
    conditions: [] as string[],
    symptoms: [] as string[],
    painLevel: "5",
    goals: [] as string[],
  })

  const conditions = [
    { id: "pcos", label: "PCOS", icon: "🔬" },
    { id: "endometriosis", label: "Endometriosis", icon: "⚕️" },
    { id: "pmdd", label: "PMDD", icon: "🧠" },
    { id: "fibroids", label: "Fibroids", icon: "💔" },
    { id: "adenomyosis", label: "Adenomyosis", icon: "🩺" },
    { id: "heavy-bleeding", label: "Heavy Bleeding", icon: "🩸" },
    { id: "irregular", label: "Irregular Cycles", icon: "📊" },
    { id: "none", label: "Not Diagnosed", icon: "❓" },
  ]

  const symptoms = [
    "Severe cramping",
    "Heavy bleeding",
    "Fatigue",
    "Mood changes",
    "Bloating",
    "Headaches",
    "Nausea",
    "Back pain",
    "Brain fog",
    "Acne",
  ]

  const goals = [
    "Track symptoms to discuss with doctor",
    "Manage pain better",
    "Understand my cycle patterns",
    "Find community support",
    "Learn about my condition",
    "Improve overall wellbeing",
  ]

  const menstrualProducts = [
    { id: "disposable-pads", label: "Disposable pads", icon: "🩲", description: "Single-use sanitary pads" },
    { id: "tampons", label: "Tampons", icon: "🔴", description: "Internal absorbent product" },
    { id: "reusable-pads", label: "Reusable cloth pads", icon: "♻️", description: "Washable and eco-friendly" },
    { id: "menstrual-cup", label: "Menstrual cup", icon: "🥤", description: "Reusable silicone cup" },
    { id: "menstrual-disc", label: "Menstrual disc", icon: "💿", description: "Disposable or reusable disc" },
    { id: "period-underwear", label: "Period underwear", icon: "👙", description: "Absorbent underwear" },
    { id: "other", label: "Other", icon: "➕", description: "Other products" },
    { id: "prefer-not-say", label: "Prefer not to say", icon: "🤐", description: "" },
  ]

  const handleConditionToggle = (conditionId: string) => {
    setUserData((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(conditionId)
        ? prev.conditions.filter((c) => c !== conditionId)
        : [...prev.conditions, conditionId],
    }))
  }

  const handleSymptomToggle = (symptom: string) => {
    setUserData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }))
  }

  const handleGoalToggle = (goal: string) => {
    setUserData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const handleProductToggle = (productId: string) => {
    setUserData((prev) => ({
      ...prev,
      menstrualProducts: prev.menstrualProducts.includes(productId)
        ? prev.menstrualProducts.filter((p) => p !== productId)
        : [...prev.menstrualProducts, productId],
    }))
  }

  const calculateBMI = () => {
    const weight = Number.parseFloat(userData.weight)
    const height = Number.parseFloat(userData.height)

    if (weight && height) {
      const weightInKg = userData.weightUnit === "lbs" ? weight * 0.453592 : weight
      const heightInM = userData.heightUnit === "cm" ? height / 100 : height * 0.3048

      const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1)
      setUserData((prev) => ({ ...prev, bmi }))
    }
  }

  const handleNext = () => {
    if (step < 9) {
      if (step === 4) {
        calculateBMI()
      }
      setStep(step + 1)
    } else {
      localStorage.setItem("saukhya_user", JSON.stringify(userData))
      localStorage.setItem("saukhya_onboarding_complete", "true")
      onComplete(userData)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const progressPercent = ((step + 1) / 10) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Welcome to Saukhya</h2>
            <span className="text-sm text-muted-foreground">Step {step + 1} of 10</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🌿</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Saukhya</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Your comprehensive companion for managing difficult menstrual health. Let's get to know you better.
            </p>
            <button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-smooth"
            >
              Get Started
            </button>
          </div>
        )}

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">What's your name?</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">How old are you?</label>
              <input
                type="number"
                value={userData.age}
                onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                placeholder="Enter your age"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* Step 2: Cycle Info */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Average cycle length (days)</label>
              <input
                type="number"
                value={userData.cycleLength}
                onChange={(e) => setUserData({ ...userData, cycleLength: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Average period duration (days)</label>
              <input
                type="number"
                value={userData.periodDuration}
                onChange={(e) => setUserData({ ...userData, periodDuration: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Last period start date</label>
              <input
                type="date"
                value={userData.lastPeriodDate}
                onChange={(e) => setUserData({ ...userData, lastPeriodDate: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Flow intensity</label>
              <div className="grid grid-cols-2 gap-3">
                {["light", "moderate", "heavy", "very-heavy"].map((intensity) => (
                  <button
                    key={intensity}
                    onClick={() => setUserData({ ...userData, flowIntensity: intensity })}
                    className={`py-3 px-4 rounded-lg font-medium transition-smooth ${
                      userData.flowIntensity === intensity
                        ? "bg-primary text-white"
                        : "bg-border text-foreground hover:bg-border/80"
                    }`}
                  >
                    {intensity.charAt(0).toUpperCase() + intensity.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Menstrual Products */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What menstrual products do you currently use?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">Select all that apply. You can select multiple.</p>
            </div>
            <div className="space-y-3">
              {menstrualProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductToggle(product.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-smooth text-left flex items-start gap-3 ${
                    userData.menstrualProducts.includes(product.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl mt-0.5">{product.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">{product.label}</div>
                    {product.description && (
                      <div className="text-xs text-muted-foreground mt-1">{product.description}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Body Metrics */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Body Metrics (Optional but recommended for PCOS)
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                This helps us provide personalized recommendations. Your data is private and secure.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={userData.weight}
                  onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                  placeholder="Enter weight"
                  className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={userData.weightUnit}
                  onChange={(e) => setUserData({ ...userData, weightUnit: e.target.value })}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={userData.height}
                  onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                  placeholder="Enter height"
                  className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={userData.heightUnit}
                  onChange={(e) => setUserData({ ...userData, heightUnit: e.target.value })}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>
            </div>

            {userData.weight && userData.height && (
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Your calculated BMI</div>
                <div className="text-3xl font-bold text-primary">{userData.bmi || "Calculating..."}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Based on Asian BMI cutoffs: Normal (18.5-22.9), Overweight (23-27.4)
                </div>
              </div>
            )}

            <div className="bg-muted rounded-lg p-4 text-xs text-muted-foreground">
              <strong>Note:</strong> BMI is one of many health indicators. We focus on health, not appearance. Consult
              your doctor for comprehensive assessment.
            </div>
          </div>
        )}

        {/* Step 5: PCOS-Specific Weight Questions */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Weight & PCOS (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-6">
                These questions help us understand PCOS-related symptoms better.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Have you experienced unexplained weight gain?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["yes", "no", "unsure"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setUserData({ ...userData, unexplainedWeightGain: option })}
                    className={`py-3 px-4 rounded-lg font-medium transition-smooth capitalize ${
                      userData.unexplainedWeightGain === option
                        ? "bg-primary text-white"
                        : "bg-border text-foreground hover:bg-border/80"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {userData.unexplainedWeightGain === "yes" && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  When did you first notice this?
                </label>
                <select
                  value={userData.weightGainTiming}
                  onChange={(e) => setUserData({ ...userData, weightGainTiming: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select timing</option>
                  <option value="past-3-months">Past 3 months</option>
                  <option value="past-6-months">Past 6 months</option>
                  <option value="past-year">Past year</option>
                  <option value="1-2-years">1-2 years ago</option>
                  <option value="more-than-2-years">More than 2 years ago</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Do you have difficulty losing weight despite diet/exercise?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["yes", "no", "not-applicable"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setUserData({ ...userData, difficultLosingWeight: option })}
                    className={`py-3 px-4 rounded-lg font-medium transition-smooth text-sm ${
                      userData.difficultLosingWeight === option
                        ? "bg-primary text-white"
                        : "bg-border text-foreground hover:bg-border/80"
                    }`}
                  >
                    {option === "not-applicable" ? "N/A" : option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 border border-primary rounded-lg p-4 text-sm">
              <strong className="text-primary">Why we ask:</strong>
              <p className="text-foreground mt-2">
                Weight changes are common with PCOS due to insulin resistance. Tracking this helps us provide better
                recommendations for diet and exercise.
              </p>
            </div>
          </div>
        )}

        {/* Step 6: Conditions */}
        {step === 6 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Do you have any diagnosed conditions?</h3>
              <p className="text-sm text-muted-foreground mb-6">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {conditions.map((condition) => (
                <button
                  key={condition.id}
                  onClick={() => handleConditionToggle(condition.id)}
                  className={`p-4 rounded-lg border-2 transition-smooth text-center ${
                    userData.conditions.includes(condition.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{condition.icon}</div>
                  <div className="text-sm font-medium text-foreground">{condition.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Symptoms */}
        {step === 7 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">What symptoms do you experience?</h3>
              <p className="text-sm text-muted-foreground mb-6">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {symptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`p-3 rounded-lg border-2 transition-smooth text-left ${
                    userData.symptoms.includes(symptom)
                      ? "border-accent-warm bg-accent-warm/10"
                      : "border-border hover:border-accent-warm/50"
                  }`}
                >
                  <div className="text-sm font-medium text-foreground">{symptom}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Pain Level */}
        {step === 8 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">What's your typical pain level?</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">No pain</span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={userData.painLevel}
                  onChange={(e) => setUserData({ ...userData, painLevel: e.target.value })}
                  className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-sm text-muted-foreground">Severe pain</span>
              </div>
              <div className="text-center mt-4">
                <div className="text-4xl font-bold text-primary">{userData.painLevel}</div>
                <div className="text-sm text-muted-foreground">out of 10</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Goals */}
        {step === 9 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">What are your goals?</h3>
              <p className="text-sm text-muted-foreground mb-6">Select all that apply</p>
            </div>
            <div className="space-y-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`w-full p-4 rounded-lg border-2 transition-smooth text-left ${
                    userData.goals.includes(goal)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm font-medium text-foreground">{goal}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-border hover:bg-border/80 text-foreground font-semibold py-3 px-4 rounded-lg transition-smooth"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-smooth"
          >
            {step === 9 ? "Complete Setup" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}
