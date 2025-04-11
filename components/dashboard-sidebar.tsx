"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  LayoutDashboard,
  BookOpenCheck,
  Users,
  DollarSign,
  Settings,
  BarChart2,
  ShoppingCart,
  FileText,
  Menu,
  X,
  Globe,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTranslation } from "@/hooks/use-translation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DashboardSidebarProps {
  collapsed?: boolean
}

export function DashboardSidebar({ collapsed = false }: DashboardSidebarProps) {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [userType, setUserType] = useState<"admin" | "instructor" | "student" | "affiliate">("admin")

  // Get user type from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as "admin" | "instructor" | "student" | "affiliate"
    if (storedRole) {
      setUserType(storedRole)
    }
  }, [])

  const adminRoutes = [
    { href: "/dashboard", label: "dashboard", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "courses", icon: BookOpen },
    { href: "/dashboard/students", label: "students", icon: Users },
    { href: "/dashboard/affiliates", label: "affiliates", icon: DollarSign },
    { href: "/dashboard/sales", label: "sales", icon: ShoppingCart },
    { href: "/dashboard/analytics", label: "analytics", icon: BarChart2 },
    { href: "/dashboard/marketplace", label: "marketplace", icon: Globe },
    { href: "/dashboard/settings", label: "settings", icon: Settings },
  ]

  const instructorRoutes = [
    { href: "/dashboard", label: "dashboard", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "myCourses", icon: BookOpen },
    { href: "/dashboard/create", label: "createCourse", icon: BookOpenCheck },
    { href: "/dashboard/publish", label: "publish", icon: Globe },
    { href: "/dashboard/students", label: "myStudents", icon: Users },
    { href: "/dashboard/sales", label: "sales", icon: ShoppingCart },
    { href: "/dashboard/analytics", label: "analytics", icon: BarChart2 },
    { href: "/dashboard/settings", label: "settings", icon: Settings },
  ]

  const studentRoutes = [
    { href: "/dashboard/my-courses", label: "myCourses", icon: BookOpen },
    { href: "/dashboard/marketplace", label: "marketplace", icon: Globe },
    { href: "/dashboard/certificates", label: "certificates", icon: FileText },
    { href: "/dashboard/settings", label: "settings", icon: Settings },
  ]

  const affiliateRoutes = [
    { href: "/dashboard", label: "dashboard", icon: LayoutDashboard },
    { href: "/dashboard/promotions", label: "promotions", icon: BookOpen },
    { href: "/dashboard/commissions", label: "commissions", icon: DollarSign },
    { href: "/dashboard/analytics", label: "analytics", icon: BarChart2 },
    { href: "/dashboard/marketplace", label: "marketplace", icon: Globe },
    { href: "/dashboard/settings", label: "settings", icon: Settings },
  ]

  let routes = adminRoutes

  switch (userType) {
    case "instructor":
      routes = instructorRoutes
      break
    case "student":
      routes = studentRoutes
      break
    case "affiliate":
      routes = affiliateRoutes
      break
    default:
      routes = adminRoutes
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6 text-primary" />
              <span>CourseHub</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
            <div className="px-6 py-4">
              <nav className="flex flex-col gap-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {t(route.label)}
                  </Link>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className={cn("flex items-center gap-2 font-bold", collapsed ? "justify-center" : "text-xl")}>
            <BookOpen className="h-6 w-6 text-primary" />
            {!collapsed && <span>CourseHub</span>}
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-3 py-2">
            <nav className="flex flex-col gap-1">
              {routes.map((route) => (
                <TooltipProvider key={route.href} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={route.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                          collapsed ? "justify-center" : "",
                        )}
                      >
                        <route.icon className="h-5 w-5" />
                        {!collapsed && <span>{t(route.label)}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">{t(route.label)}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </nav>
          </div>
        </ScrollArea>
        {!collapsed && (
          <div className="p-4 text-sm">
            <p className="text-muted-foreground">{t("loggedInAs")}:</p>
            <p className="font-medium capitalize">{userType}</p>
          </div>
        )}
      </div>
    </>
  )
}
