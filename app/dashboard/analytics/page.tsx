"use client"

import { useState } from "react"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"

export default function AnalyticsPage() {
  const { t } = useTranslation()
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("analytics")}</h1>
        <p className="text-muted-foreground">{t("trackYourPerformanceAndGrowth")}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="students">{t("students")}</TabsTrigger>
            <TabsTrigger value="revenue">{t("revenue")}</TabsTrigger>
            <TabsTrigger value="courses">{t("courses")}</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : t("last30Days")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalRevenue")}</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalStudents")}</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("activeCourses")}</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M15 6H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
              <path d="M17 2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("completionRate")}</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground">+5.1% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
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
                <CardTitle>{t("topCourses")}</CardTitle>
                <CardDescription>{t("bestPerformingCourses")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { name: "Web Development Masterclass", students: 845, revenue: 42250 },
                    { name: "Digital Marketing Fundamentals", students: 632, revenue: 31600 },
                    { name: "UI/UX Design Principles", students: 543, revenue: 27150 },
                    { name: "Data Science Bootcamp", students: 498, revenue: 24900 },
                    { name: "Mobile App Development", students: 387, revenue: 19350 },
                  ].map((course, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{course.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.students} {t("students")}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">${(course.revenue / 100).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("studentEngagement")}</CardTitle>
                <CardDescription>{t("studentActivityOverTime")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <EngagementChart />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("enrollmentTrends")}</CardTitle>
                <CardDescription>{t("newStudentsOverTime")}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <EnrollmentChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("studentDemographics")}</CardTitle>
              <CardDescription>{t("studentDistributionByRegion")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <DemographicsChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("revenueBreakdown")}</CardTitle>
              <CardDescription>{t("revenueBySourceAndTime")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <RevenueBreakdownChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("coursePerformance")}</CardTitle>
              <CardDescription>{t("completionRatesAndRatings")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <CoursePerformanceChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
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
        <path
          d="M0,300 L0,200 C50,180 100,170 150,160 C200,150 250,145 300,150 C350,155 400,170 450,160 C500,150 550,120 600,110 C650,100 700,110 750,120 L800,120 L800,300 Z"
          fill="rgba(16, 185, 129, 0.1)"
        />
        <path
          d="M0,200 C50,180 100,170 150,160 C200,150 250,145 300,150 C350,155 400,170 450,160 C500,150 550,120 600,110 C650,100 700,110 750,120 L800,120"
          fill="none"
          stroke="rgb(16, 185, 129)"
          strokeWidth="2"
        />
        <g>
          <circle cx="150" cy="160" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="300" cy="150" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="450" cy="160" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="600" cy="110" r="4" fill="rgb(16, 185, 129)" />
          <circle cx="750" cy="120" r="4" fill="rgb(16, 185, 129)" />
        </g>
      </svg>
    </div>
  )
}

function EnrollmentChart() {
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

function DemographicsChart() {
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
        <g transform="translate(400, 200)">
          <path d="M0,-150 A150,150 0 0,1 129.9,75 L0,0 Z" fill="#3b82f6" />
          <path d="M129.9,75 A150,150 0 0,1 -129.9,75 L0,0 Z" fill="#10b981" />
          <path d="M-129.9,75 A150,150 0 0,1 0,-150 L0,0 Z" fill="#f59e0b" />
          <text x="60" y="-60" fill="white" fontSize="16" fontWeight="bold">
            35%
          </text>
          <text x="0" y="100" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
            40%
          </text>
          <text x="-60" y="-60" fill="white" fontSize="16" fontWeight="bold">
            25%
          </text>
        </g>
      </svg>
    </div>
  )
}

function RevenueBreakdownChart() {
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
        <g>
          <rect x="100" y="50" width="100" height="300" fill="rgba(59, 130, 246, 0.6)" rx="4" />
          <rect x="250" y="100" width="100" height="250" fill="rgba(16, 185, 129, 0.6)" rx="4" />
          <rect x="400" y="150" width="100" height="200" fill="rgba(245, 158, 11, 0.6)" rx="4" />
          <rect x="550" y="200" width="100" height="150" fill="rgba(124, 58, 237, 0.6)" rx="4" />
        </g>
        <g>
          <text x="150" y="370" fill="currentColor" fontSize="14" textAnchor="middle">
            Q1
          </text>
          <text x="300" y="370" fill="currentColor" fontSize="14" textAnchor="middle">
            Q2
          </text>
          <text x="450" y="370" fill="currentColor" fontSize="14" textAnchor="middle">
            Q3
          </text>
          <text x="600" y="370" fill="currentColor" fontSize="14" textAnchor="middle">
            Q4
          </text>
        </g>
      </svg>
    </div>
  )
}

function CoursePerformanceChart() {
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
        <g>
          <line x1="50" y1="350" x2="750" y2="350" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="50" x2="50" y2="350" stroke="currentColor" strokeWidth="1" />
        </g>
        <g>
          <circle cx="150" cy="150" r="40" fill="rgba(59, 130, 246, 0.6)" />
          <circle cx="300" cy="200" r="30" fill="rgba(16, 185, 129, 0.6)" />
          <circle cx="450" cy="100" r="50" fill="rgba(245, 158, 11, 0.6)" />
          <circle cx="600" cy="250" r="25" fill="rgba(124, 58, 237, 0.6)" />
        </g>
        <g>
          <text x="150" y="150" fill="white" fontSize="14" textAnchor="middle">
            4.8
          </text>
          <text x="300" y="200" fill="white" fontSize="14" textAnchor="middle">
            4.5
          </text>
          <text x="450" y="100" fill="white" fontSize="14" textAnchor="middle">
            4.9
          </text>
          <text x="600" y="250" fill="white" fontSize="14" textAnchor="middle">
            4.2
          </text>
        </g>
      </svg>
    </div>
  )
}
