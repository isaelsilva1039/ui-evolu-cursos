"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

// Dados de exemplo para cursos
const sampleCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    image: "/placeholder.svg?height=180&width=320",
    progress: 65,
    instructor: "Sarah Johnson",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and patterns",
    image: "/placeholder.svg?height=180&width=320",
    progress: 30,
    instructor: "Michael Chen",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Full Stack Development with Next.js",
    description: "Build complete applications with Next.js",
    image: "/placeholder.svg?height=180&width=320",
    progress: 10,
    instructor: "Emma Rodriguez",
    rating: 4.7,
  },
  {
    id: "4",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of effective UI/UX design",
    image: "/placeholder.svg?height=180&width=320",
    progress: 90,
    instructor: "David Kim",
    rating: 4.6,
  },
  {
    id: "5",
    title: "Data Science Essentials",
    description: "Introduction to data analysis and visualization",
    image: "/placeholder.svg?height=180&width=320",
    progress: 45,
    instructor: "Priya Patel",
    rating: 4.5,
  },
  {
    id: "6",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps",
    image: "/placeholder.svg?height=180&width=320",
    progress: 20,
    instructor: "Carlos Mendez",
    rating: 4.7,
  },
]

export default function MyCoursesPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all")

  // Filtrar cursos com base no estado atual
  const filteredCourses = sampleCourses.filter((course) => {
    if (filter === "all") return true
    if (filter === "in-progress") return course.progress > 0 && course.progress < 100
    if (filter === "completed") return course.progress === 100
    return true
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("myCourses")}</h1>
        <p className="text-muted-foreground">{t("continueYourLearningJourney")}</p>
      </div>

      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          {t("allCourses")}
        </Button>
        <Button variant={filter === "in-progress" ? "default" : "outline"} onClick={() => setFilter("in-progress")}>
          {t("inProgress")}
        </Button>
        <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
          {t("completed")}
        </Button>
      </div>

      {/* Seção de cursos em andamento */}
      {filteredCourses.some((course) => course.progress > 0 && course.progress < 100) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("continueWatching")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter((course) => course.progress > 0 && course.progress < 100)
              .map((course) => (
                <Link href={`/dashboard/my-courses/${course.id}`} key={course.id}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                        <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">{course.instructor}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{course.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Todos os cursos */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{t("allCourses")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link href={`/dashboard/my-courses/${course.id}`} key={course.id}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-video">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  {course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">{course.instructor}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
