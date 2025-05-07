import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WeBuildAwareness',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/brain.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
