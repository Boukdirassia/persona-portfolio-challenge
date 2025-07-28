import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Ali Alaoui - Portfolio | Project Manager & Full Stack Developer",
  description:
    "Passionate IT Project Manager and Full Stack Developer from Casablanca, Morocco. Bridging technology and tradition to create innovative solutions.",
  keywords: "Ali Alaoui, Project Manager, Full Stack Developer, Morocco, Casablanca, React, Laravel, IT",
  authors: [{ name: "Ali Alaoui" }],
  openGraph: {
    title: "Ali Alaoui - Portfolio",
    description: "Project Manager & Full Stack Developer from Casablanca, Morocco",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
