import Link from "next/link"
import { BookOpen, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function CoursesPage() {
  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Web Development Masterclass",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
      students: 1245,
      lessons: 42,
      status: "published",
      image: "/placeholder.svg?height=200&width=300&text=Web+Dev",
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      description: "Master SEO, social media marketing, and content strategy",
      students: 876,
      lessons: 36,
      status: "published",
      image: "/placeholder.svg?height=200&width=300&text=Marketing",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Create beautiful user interfaces and experiences",
      students: 543,
      lessons: 28,
      status: "published",
      image: "/placeholder.svg?height=200&width=300&text=UI/UX",
    },
    {
      id: 4,
      title: "Data Science Bootcamp",
      description: "Python, statistics, machine learning and data visualization",
      students: 321,
      lessons: 45,
      status: "draft",
      image: "/placeholder.svg?height=200&width=300&text=Data+Science",
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Build iOS and Android apps with React Native",
      students: 654,
      lessons: 38,
      status: "published",
      image: "/placeholder.svg?height=200&width=300&text=Mobile+Dev",
    },
    {
      id: 6,
      title: "Blockchain Fundamentals",
      description: "Understanding cryptocurrency and blockchain technology",
      students: 210,
      lessons: 32,
      status: "draft",
      image: "/placeholder.svg?height=200&width=300&text=Blockchain",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Manage your courses and track their performance.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search courses..." className="w-full pl-8" />
        </div>
        <Link href="/dashboard/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-1 text-xl">{course.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Analytics</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <Badge variant={course.status === "published" ? "default" : "outline"}>
                {course.status === "published" ? "Published" : "Draft"}
              </Badge>
              <Link href={`/dashboard/courses/${course.id}`}>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
