"use client"

import { GlobalNavigation } from "./global-navigation"

export function LayoutWithNavigation({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNavigation />
      <main className="pt-16">{children}</main>
    </>
  )
}