import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResourceCardProps {
  title: string
  description: string
  link: string
}

export function ResourceCard({ title, description, link }: ResourceCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Read More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
