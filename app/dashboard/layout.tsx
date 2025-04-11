"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserNav } from "@/components/user-nav"
import { UserRoleSwitcher } from "@/components/user-role-switcher"
import { useTranslation } from "@/hooks/use-translation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex md:hidden">
          <DashboardSidebar />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <UserRoleSwitcher />
          <UserNav />
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[auto_1fr]">
        <aside className={`hidden border-r md:block ${sidebarCollapsed ? "md:w-[80px]" : "md:w-[240px]"}`}>
          <div className="flex h-full flex-col">
            <DashboardSidebar collapsed={sidebarCollapsed} />
            <div className="mt-auto border-t p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full"
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex flex-1 flex-col p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
