"use client";

import Link from "next/link"
import { CalendarDays, ChevronRight, Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { BookingForm } from "@/components/booking-form"
import { ResourceCard } from "@/components/resource-card"
import { getCalendar } from "@/services/getCalendar";
import { useEffect, useState } from "react";

export default function Home() {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const data = await getCalendar();
        // Extract the start dates from the response
        const dates = data.map((item: { start: { dateTime: string } }) => new Date(item.start.dateTime));
        console.log("Available dates:", dates);
        setAvailableDates(dates);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchCalendarData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                WeBuild
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="/#book" className="transition-colors hover:text-foreground/80">
                Book a Session
              </Link>
              <Link href="/#resources" className="transition-colors hover:text-foreground/80">
                Resources
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="https://instagram.com/webuild"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="hidden sm:inline-block">@webuild</span>
            </Link>
            <Button asChild>
              <Link href="/#book">Book Now</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-pink-50 to-white dark:from-pink-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Build Your Self-Esteem, <span className="text-pink-500">Build Your Future</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our transformative sessions designed to help you develop lasting self-confidence and a positive
                  self-image.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/#book">
                      Book a Session
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/#about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                alt="Self-esteem coaching session"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width={550}
                height={550}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm dark:bg-pink-800/30">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Self-Esteem Matters</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  At WeBuild, we believe that healthy self-esteem is the foundation for a fulfilling life. Our sessions
                  are designed to help you recognize your worth, build confidence, and develop a positive relationship
                  with yourself.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Our Approach</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    We combine evidence-based techniques from cognitive behavioral therapy, positive psychology, and
                    mindfulness practices to create personalized sessions that address your unique needs.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Your Journey</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Each session builds upon the last, creating a progressive path toward stronger self-esteem. We focus
                    on practical skills you can apply in your daily life for lasting results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="book" className="w-full py-12 md:py-24 lg:py-32 bg-pink-50 dark:bg-pink-950/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Book Your Session</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Schedule your self-esteem improvement session in just a few clicks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-pink-500" />
                    <h3 className="text-xl font-bold">Select a Date</h3>
                  </div>
                  <div className="mt-4">
                    <Calendar
                      // onSelect={(date) => setSelectedDate(date || null)} // Handle undefined by converting it to null
                      availableDates={availableDates}
                      setSelectedDate={setSelectedDate}
                      mode="single"
                      className="rounded-md border"
                    />
                  </div>
                </div>
              </div>
              <BookingForm selectedDate={selectedDate} availableDates={availableDates} />
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Self-Esteem Resources</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore these valuable resources to learn more about the importance of self-esteem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <ResourceCard
                title="The Science of Self-Esteem"
                description="Research-backed insights into how self-esteem affects mental health and well-being."
                link="https://example.com/science-of-self-esteem"
              />
              <ResourceCard
                title="Daily Self-Esteem Practices"
                description="Simple exercises you can incorporate into your daily routine to build confidence."
                link="https://example.com/daily-practices"
              />
              <ResourceCard
                title="Overcoming Negative Self-Talk"
                description="Strategies to identify and challenge the inner critic that damages self-esteem."
                link="https://example.com/negative-self-talk"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 WeBuild. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="https://instagram.com/webuild"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
