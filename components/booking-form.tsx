"use client"

import type React from "react"

import { useState } from "react"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function BookingForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would connect to a backend service
    console.log({ name, email, timeSlot, notes })

    toast({
      title: "Session booked!",
      description: `We've scheduled your session for ${timeSlot}. Check your email for confirmation.`,
    })

    // Reset form
    setName("")
    setEmail("")
    setTimeSlot("")
    setNotes("")
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-pink-500" />
        <h3 className="text-xl font-bold">Complete Your Booking</h3>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Select a Time Slot</Label>
          <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="flex flex-col space-y-1" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="9:00 AM" id="time-1" />
              <Label htmlFor="time-1" className="font-normal">
                9:00 AM
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="11:00 AM" id="time-2" />
              <Label htmlFor="time-2" className="font-normal">
                11:00 AM
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2:00 PM" id="time-3" />
              <Label htmlFor="time-3" className="font-normal">
                2:00 PM
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4:00 PM" id="time-4" />
              <Label htmlFor="time-4" className="font-normal">
                4:00 PM
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Tell us about your goals or any specific concerns"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Confirm Booking
        </Button>
      </form>
    </div>
  )
}
