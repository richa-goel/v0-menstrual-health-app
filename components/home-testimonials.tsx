"use client"

import { Card } from "@/components/ui/card"

export default function HomeTestimonials() {
  const testimonials = [
    {
      name: "Priya S.",
      text: "Switching to reusable cotton pads has been life-changing! My cramps reduced significantly, and I feel so much better about the environment. This app helped me track the difference.",
      product: "Reusable Cotton Pads",
    },
    {
      name: "Ananya M.",
      text: "I was hesitant about menstrual cups, but after tracking my symptoms, I noticed less bloating and irritation. Plus, it's so convenient! Highly recommend.",
      product: "Menstrual Cup",
    },
  ]

  return (
    <div className="mx-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">What Our Users Say</h3>
      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-4 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500">
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-2 italic">{`"${testimonial.text}"`}</p>
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{testimonial.name}</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{testimonial.product}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
