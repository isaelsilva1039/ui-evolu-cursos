"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, DollarSign, ShoppingCart } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function DashboardPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
        <p className="text-muted-foreground">{t("welcomeBack")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalRevenue")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("students")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("activeCourses")}</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("affiliateSales")}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
          <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("revenueOverview")}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <RevenueChart />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("recentSales")}</CardTitle>
                <CardDescription>{t("youMadeSalesThisMonth", { count: 265 })}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36&text=U${i}`} alt="Avatar" />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">User {i}</p>
                        <p className="text-sm text-muted-foreground">user{i}@example.com</p>
                      </div>
                      <div className="ml-auto font-medium">+${(Math.random() * 100).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("popularCourses")}</CardTitle>
                <CardDescription>{t("topPerformingCourses")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    "Web Development",
                    "Digital Marketing",
                    "UI/UX Design",
                    "Data Science",
                    "Mobile App Development",
                  ].map((course, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{course}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 1000)} {t("students")}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">${(Math.random() * 100).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("studentEngagement")}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <EngagementChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("advancedAnalytics")}</CardTitle>
              <CardDescription>{t("detailedMetrics")}</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px] w-full">
                <AdvancedAnalyticsChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("reports")}</CardTitle>
              <CardDescription>{t("generateReports")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">{t("monthlySalesReport")}</h3>
                      <p className="text-sm text-muted-foreground">{t("salesBreakdown")}</p>
                    </div>
                    <Button>{t("generate")}</Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">{t("studentProgressReport")}</h3>
                      <p className="text-sm text-muted-foreground">{t("studentEngagementOverview")}</p>
                    </div>
                    <Button>{t("generate")}</Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">{t("affiliatePerformance")}</h3>
                      <p className="text-sm text-muted-foreground">{t("affiliateAnalysis")}</p>
                    </div>
                    <Button>{t("generate")}</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
}

function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return <img className="aspect-square h-full w-full" src={src || "/placeholder.svg"} alt={alt} />
}

function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">{children}</div>
}

// Componentes de gráficos simulados
function RevenueChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 800 300"
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" width="800" height="300" fill="none" />
        <path
          d="M0,300 L0,150 C50,120 100,100 150,90 C200,80 250,85 300,100 C350,115 400,140 450,130 C500,120 550,80 600,70 C650,60 700,80 750,90 L800,90 L800,300 Z"
          fill="rgba(59, 130, 246, 0.1)"
        />
        <path
          d="M0,150 C50,120 100,100 150,90 C200,80 250,85 300,100 C350,115 400,140 450,130 C500,120 550,80 600,70 C650,60 700,80 750,90 L800,90"
          fill="none"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2"
        />
        <g>
          <circle cx="150" cy="90" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="300" cy="100" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="450" cy="130" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="600" cy="70" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="750" cy="90" r="4" fill="rgb(59, 130, 246)" />
        </g>
      </svg>
    </div>
  )
}

function EngagementChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 800 300"
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" width="800" height="300" fill="none" />
        <g>
          <rect x="50" y="100" width="60" height="200" fill="rgba(124, 58, 237, 0.6)" rx="4" />
          <rect x="150" y="80" width="60" height="220" fill="rgba(124, 58, 237, 0.6)" rx="4" />
          <rect x="250" y="120" width="60" height="180" fill="rgba(124, 58, 237, 0.6)" rx="4" />
          <rect x="350" y="60" width="60" height="240" fill="rgba(124, 58, 237, 0.6)" rx="4" />
          <rect x="450" y="40" width="60" height="260" fill="rgba(124, 58, 237, 0.6)" rx="4" />
          <rect x="550" y="90" width="60" height="210" fill="rgba(124, 58, 237, 0.6)" rx="4" />
          <rect x="650" y="70" width="60" height="230" fill="rgba(124, 58, 237, 0.6)" rx="4" />
        </g>
      </svg>
    </div>
  )
}

function AdvancedAnalyticsChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" width="800" height="400" fill="none" />
        <path
          d="M0,400 L0,200 C50,180 100,170 150,160 C200,150 250,145 300,150 C350,155 400,170 450,160 C500,150 550,120 600,110 C650,100 700,110 750,120 L800,120 L800,400 Z"
          fill="rgba(16, 185, 129, 0.1)"
        />
        <path
          d="M0,200 C50,180 100,170 150,160 C200,150 250,145 300,150 C350,155 400,170 450,160 C500,150 550,120 600,110 C650,100 700,110 750,120 L800,120"
          fill="none"
          stroke="rgb(16, 185, 129)"
          strokeWidth="2"
        />
        <path
          d="M0,300 L0,250 C50,240 100,230 150,220 C200,210 250,205 300,210 C350,215 400,230 450,220 C500,210 550,180 600,170 C650,160 700,170 750,180 L800,180 L800,400 Z"
          fill="rgba(59, 130, 246, 0.1)"
        />
        <path
          d="M0,250 C50,240 100,230 150,220 C200,210 250,205 300,210 C350,215 400,230 450,220 C500,210 550,180 600,170 C650,160 700,170 750,180 L800,180"
          fill="none"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2"
        />
        <g>
          <circle cx="150" cy="160" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="300" cy="150" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="450" cy="160" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="600" cy="110" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="750" cy="120" r="4" fill="rgb(16, 185, 129)" />
        </g>
        <g>
          <circle cx="150" cy="220" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="300" cy="210" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="450" cy="220" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="600" cy="170" r="4" fill="rgb(59, 130, 246)" />
          <circle cx="750" cy="180" r="4" fill="rgb(59, 130, 246)" />
        </g>
      </svg>
    </div>
  )
}
