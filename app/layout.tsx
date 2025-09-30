import type React from "react"
import type { Metadata } from "next"
import { Fira_Code, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const funnelDisplay = Fira_Code({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "VACTS - Conversation Dashboard",
  description: "Monitor AI chatbot conversations and performance",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${funnelDisplay.variable} ${lora.variable} antialiased`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
