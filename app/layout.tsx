import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Orbitron, Inter, VT323 } from "next/font/google"
import { cn } from "@/lib/utils"
import { SoundProvider } from "@/components/sound-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { ExtensionProvider } from "@/contexts/extension-context"
import { LayoutWithNavigation } from "@/components/layout-with-navigation"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "800", "900"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
})

export const metadata: Metadata = {
  title: "KusamaHub - stop behaving. start blockraving.",
  description: "A chaotic collection of Kusama-native dapps that embrace the network's experimental spirit. Built with anarchic competence and zero corporate polish.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${orbitron.variable} ${inter.variable} ${vt323.variable}`,
          "min-h-screen bg-background font-inter antialiased",
        )}
      >
        <SoundProvider>
          <ExtensionProvider>
            <CustomCursor />
            <LayoutWithNavigation>
              {children}
            </LayoutWithNavigation>
          </ExtensionProvider>
        </SoundProvider>
      </body>
    </html>
  )
}
