"use client";

import { useMemo, useState } from "react";
import { Clock, Loader2, CheckCircle } from "lucide-react"; // Import CheckCircle for success icon
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { postEvent } from "@/services/postEvent";

type BookingFormProps = {
  availableDates: Date[];
  selectedDate: Date | null;
};

export function BookingForm({ availableDates, selectedDate }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; timeSlot?: string; selectedDate?: string }>({});
  const [loading, setLoading] = useState(false); // Track loading state
  const [success, setSuccess] = useState(false); // Track success state

  // Memoize the filtered dates and available times
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];

    // Filter availableDates to find matching dates
    const selectedDates = availableDates.filter((item) => {
      return (
        item.getDate() === selectedDate.getDate() &&
        item.getMonth() === selectedDate.getMonth() &&
        item.getFullYear() === selectedDate.getFullYear()
      );
    });
    console.log(selectedDates)
    // Map the selected dates to their time strings in HH:mm format
    return selectedDates.map((date) =>
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, [availableDates, selectedDate]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; timeSlot?: string; selectedDate?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is not valid.";
    }

    if (!timeSlot) {
      newErrors.timeSlot = "Please select a time slot.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!selectedDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedDate: "Please select a date.",
      }));
      setLoading(false);
      return;
    }
    
    setLoading(true); // Set loading to true while waiting for the API response

    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedNotes = DOMPurify.sanitize(notes);

    const eventData = {
      name: sanitizedName,
      email: sanitizedEmail,
      meetingStartTime: selectedDate,
      extraDetails: sanitizedNotes
    }

    postEvent(eventData).then((response) => {
      console.log("Event created successfully:", response);
      setLoading(false); // Set loading to false after the response
      setSuccess(true); // Set success to true
      toast({
        title: "Session booked!",
        description: `We've scheduled your session. Please check your confirmation email and RSVP to the meeting.`,
      });
    }
    ).catch((error) => {
      console.error("Error creating event:", error);
      setLoading(false);
      toast({
        title: "Error",
        description: "There was an error booking your session. Please try again.",
        variant: "destructive",
      });
    });

    setName("");
    setEmail("");
    setTimeSlot("");
    setNotes("");
    setErrors({});

    // Mock API call
    // setTimeout(() => {
    //   setLoading(false); // Set loading to false after the response
    //   setSuccess(true); // Set success to true
    //   toast({
    //     title: "Session booked!",
    //     description: `We've scheduled your session for ${timeSlot}. Check your email for confirmation.`,
    //   });

    // Reset form
    // setName("");
    // setEmail("");
    // setTimeSlot("");
    // setNotes("");
    // setErrors({});
  // }, 2000); // Simulate a 2-second API call
};

if (success) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
      <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
      <h3 className="text-xl font-bold mt-4">Booking Confirmed!</h3>
      <p className="text-sm text-gray-600 mt-2">
        Thank you! Your session has been booked. Please check your email and RSVP to the meeting.
      </p>
    </div>
  );
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
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
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
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label>Select a Time Slot</Label>
        <RadioGroup
          value={timeSlot}
          onValueChange={setTimeSlot}
          className="flex flex-col space-y-1"
          required
        >
          {availableTimes.length > 0 ? (
            availableTimes.map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <RadioGroupItem value={time} id={`time-${time}`} />
                <Label htmlFor={`time-${time}`} className="font-normal">
                  {time}
                </Label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No available time slots for the selected date.</p>
          )}
        </RadioGroup>
        {errors.timeSlot && <p className="text-sm text-red-500">{errors.timeSlot}</p>}
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
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          "Confirm Booking"
        )}
      </Button>
    </form>
  </div>
);
}
