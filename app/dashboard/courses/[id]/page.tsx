"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Settings, Users, BarChart, MessageSquare, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { CourseViewPage } from "@/components/course-view"

export default function CourseManagementPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [activeTab, setActiveTab] = useState("preview")

  // Sample course data
  const course = {
    id: courseId,
    title: "Web Development Masterclass",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course for beginners and intermediate developers.",
    students: 1245,
    lessons: 42,
    modules: 3,
    rating: 4.8,
    reviews: 342,
    revenue: 12450,
    status: "published",
    lastUpdated: "2023-05-15",
    image: "/placeholder.svg?height=200&width=300&text=Web+Dev",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1.5">
            <Edit className="h-4 w-4" />
            {t("editCourse")}
          </Button>
          <Button variant="outline" className="gap-1.5">
            <Settings className="h-4 w-4" />
            {t("settings")}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:w-[600px]">
          <TabsTrigger value="preview" className="gap-1.5">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">{t("preview")}</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-1.5">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">{t("analytics")}</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="gap-1.5">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{t("students")}</span>
          </TabsTrigger>
          <TabsTrigger value="discussions" className="gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">{t("discussions")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          {/* Reutilizando o componente de visualização do estudante */}
          <CourseViewPage />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("totalStudents")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.students}</div>
                <p className="text-xs text-muted-foreground">+12% {t("fromLastMonth")}</p>
              </CardContent>
            </Card>
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
                <div className="text-2xl font-bold">${course.revenue}</div>
                <p className="text-xs text-muted-foreground">+18% {t("fromLastMonth")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("rating")}</CardTitle>
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
                  <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.rating}</div>
                <p className="text-xs text-muted-foreground">
                  {course.reviews} {t("reviews")}
                </p>
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
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+5% {t("fromLastMonth")}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("studentEngagement")}</CardTitle>
              <CardDescription>{t("studentEngagementDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">{t("analyticsChartPlaceholder")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("enrolledStudents")}</CardTitle>
              <CardDescription>{t("totalEnrolledStudents", { count: course.students })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{t("enrolled")}: 2023-04-15</div>
                  <div className="text-sm">
                    <Badge variant="outline">75% {t("complete")}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    {t("viewProgress")}
                  </Button>
                </div>
                {/* More student entries would go here */}
                <div className="p-4 text-center text-sm text-muted-foreground">
                  {t("showingXofYStudents", { showing: 1, total: course.students })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("courseDiscussions")}</CardTitle>
              <CardDescription>{t("courseDiscussionsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 text-center">
                <p className="text-muted-foreground mb-4">{t("noDiscussionsYet")}</p>
                <Button>{t("createDiscussionTopic")}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Importação do Badge que estava faltando
function Badge({ variant, children }: { variant: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        variant === "outline" ? "border border-border text-foreground" : "bg-primary text-primary-foreground"
      }`}
    >
      {children}
    </span>
  )
}
