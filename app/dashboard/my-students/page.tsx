"use client"

import { useState } from "react"
import { Search, Filter, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/hooks/use-translation"

export default function MyStudentsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  // Sample student data
  const students = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      enrolledCourses: ["Web Development Masterclass", "JavaScript Fundamentals"],
      lastActive: "2023-04-15",
      progress: 68,
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      enrolledCourses: ["Web Development Masterclass"],
      lastActive: "2023-04-16",
      progress: 42,
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      enrolledCourses: ["Web Development Masterclass", "React Advanced", "Node.js Basics"],
      lastActive: "2023-04-10",
      progress: 91,
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      enrolledCourses: ["JavaScript Fundamentals"],
      lastActive: "2023-04-05",
      progress: 15,
      status: "inactive",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      enrolledCourses: ["Web Development Masterclass", "JavaScript Fundamentals"],
      lastActive: "2023-04-14",
      progress: 73,
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
    },
    {
      id: 6,
      name: "Jessica Taylor",
      email: "jessica@example.com",
      enrolledCourses: ["React Advanced"],
      lastActive: "2023-03-25",
      progress: 50,
      status: "inactive",
      avatar: "/placeholder.svg?height=40&width=40&text=JT",
    },
  ]

  // Filter students based on search query and tab
  const filterStudents = (status: string) => {
    return students
      .filter((student) => student.status === status || status === "all")
      .filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.enrolledCourses.some((course) => course.toLowerCase().includes(searchQuery.toLowerCase())),
      )
  }

  const activeStudents = filterStudents("active")
  const inactiveStudents = filterStudents("inactive")
  const allStudents = filterStudents("all")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("myStudents")}</h1>
        <p className="text-muted-foreground">{t("manageYourStudents")}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchStudents")}
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            {t("contactAll")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">{t("allStudents")}</TabsTrigger>
          <TabsTrigger value="active">{t("active")}</TabsTrigger>
          <TabsTrigger value="inactive">{t("inactive")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("allStudents")}</CardTitle>
              <CardDescription>
                {t("totalStudents")}: {allStudents.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("email")}</TableHead>
                    <TableHead>{t("enrolledCourses")}</TableHead>
                    <TableHead>{t("lastActive")}</TableHead>
                    <TableHead>{t("progress")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {student.enrolledCourses.map((course, index) => (
                            <span key={index} className="text-sm">
                              {course}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            {t("view")}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("activeStudents")}</CardTitle>
              <CardDescription>
                {t("totalActiveStudents")}: {activeStudents.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("email")}</TableHead>
                    <TableHead>{t("enrolledCourses")}</TableHead>
                    <TableHead>{t("lastActive")}</TableHead>
                    <TableHead>{t("progress")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {student.enrolledCourses.map((course, index) => (
                            <span key={index} className="text-sm">
                              {course}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            {t("view")}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("inactiveStudents")}</CardTitle>
              <CardDescription>
                {t("totalInactiveStudents")}: {inactiveStudents.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("email")}</TableHead>
                    <TableHead>{t("enrolledCourses")}</TableHead>
                    <TableHead>{t("lastActive")}</TableHead>
                    <TableHead>{t("progress")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inactiveStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {student.enrolledCourses.map((course, index) => (
                            <span key={index} className="text-sm">
                              {course}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            {t("view")}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
