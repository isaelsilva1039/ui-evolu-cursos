"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle, Clock, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function CoursePage({ params }: { params: { id: string } }) {
  const courseId = params.id

  // Sample course data
  const course = {
    id: courseId,
    title: "Web Development Masterclass",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive web development course. Build real-world projects and master modern web technologies.",
    price: 49.99,
    salePrice: 29.99,
    rating: 4.8,
    reviews: 342,
    students: 12543,
    lastUpdated: "March 2023",
    image: "/placeholder.svg?height=400&width=600&text=Web+Development+Masterclass",
    instructor: {
      name: "Jane Smith",
      title: "Senior Web Developer",
      bio: "Jane has over 10 years of experience in web development and has worked with companies like Google and Facebook. She's passionate about teaching and has helped thousands of students launch their web development careers.",
      image: "/placeholder.svg?height=100&width=100&text=JS",
    },
    modules: [
      {
        title: "Introduction to Web Development",
        lessons: [
          { title: "Welcome to the Course", duration: "5:20" },
          { title: "How the Web Works", duration: "12:45" },
          { title: "Setting Up Your Development Environment", duration: "18:30" },
        ],
      },
      {
        title: "HTML Fundamentals",
        lessons: [
          { title: "HTML Document Structure", duration: "14:15" },
          { title: "Working with Text Elements", duration: "10:50" },
          { title: "HTML Forms and Inputs", duration: "16:20" },
          { title: "HTML Quiz", duration: "15 mins" },
        ],
      },
      {
        title: "CSS Basics",
        lessons: [
          { title: "Introduction to CSS", duration: "11:40" },
          { title: "Selectors and Properties", duration: "15:25" },
          { title: "Box Model and Layout", duration: "18:10" },
          { title: "CSS Assignment", duration: "1 hour" },
        ],
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { title: "JavaScript Syntax and Variables", duration: "13:20" },
          { title: "Functions and Objects", duration: "17:45" },
          { title: "DOM Manipulation", duration: "20:30" },
          { title: "Event Handling", duration: "15:15" },
        ],
      },
    ],
    whatYouWillLearn: [
      "Build responsive websites using HTML, CSS, and JavaScript",
      "Create dynamic web applications with React",
      "Develop backend services with Node.js and Express",
      "Work with databases like MongoDB and MySQL",
      "Deploy your applications to the web",
      "Implement authentication and authorization",
      "Optimize your websites for performance",
      "Debug and troubleshoot common web development issues",
    ],
    requirements: [
      "Basic computer skills",
      "No prior programming experience required",
      "A computer with internet access",
      "Eagerness to learn and practice",
    ],
    reviewsList: [
      {
        id: 1,
        name: "John Doe",
        rating: 5,
        date: "2 months ago",
        comment:
          "This course is amazing! I went from knowing nothing about web development to building my own portfolio website in just a few weeks. The instructor explains everything clearly and the projects are really helpful for reinforcing what you learn.",
        image: "/placeholder.svg?height=40&width=40&text=JD",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great course with lots of practical examples. I especially enjoyed the React section. The only reason I'm giving 4 stars instead of 5 is that I wish there was more content on responsive design.",
        image: "/placeholder.svg?height=40&width=40&text=SJ",
      },
      {
        id: 3,
        name: "Michael Brown",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Jane is an excellent teacher! She breaks down complex concepts into easy-to-understand chunks. The course is well-structured and the pace is perfect for beginners.",
        image: "/placeholder.svg?height=40&width=40&text=MB",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>CourseHub</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{course.title}</h1>
                <p className="text-muted-foreground md:text-xl">{course.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{course.rating}</span>
                    <span className="ml-1 text-muted-foreground">({course.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last updated {course.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{course.instructor.name}</p>
                    <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                  </div>
                </div>
              </div>
              <div>
                <Card className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold">${course.salePrice}</span>
                      <span className="text-xl text-muted-foreground line-through">${course.price}</span>
                      <Badge className="ml-2">40% off</Badge>
                    </div>
                    <div className="space-y-4">
                      <Link href={`/checkout/${course.id}`}>
                        <Button className="w-full text-lg" size="lg">
                          Enroll Now
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">
                        Try for Free
                      </Button>
                      <div className="text-sm text-center text-muted-foreground">30-Day Money-Back Guarantee</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Full lifetime access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Access on mobile and TV</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Certificate of completion</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="curriculum"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="instructor"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Instructor
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">What You'll Learn</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {course.whatYouWillLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Requirements</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {course.requirements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Course Description</h2>
                  <div className="space-y-4">
                    <p>
                      This comprehensive Web Development Masterclass takes you on a journey from the very basics of HTML
                      and CSS to advanced concepts in JavaScript, React, and Node.js. Whether you're a complete beginner
                      or looking to enhance your existing skills, this course provides everything you need to become a
                      proficient web developer.
                    </p>
                    <p>
                      Throughout the course, you'll work on real-world projects that will help you build a strong
                      portfolio to showcase to potential employers. You'll learn how to create responsive websites,
                      dynamic web applications, and even how to deploy your projects to the web.
                    </p>
                    <p>
                      By the end of this course, you'll have the skills and confidence to build your own web
                      applications from scratch and pursue a career in web development.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Course Content</h2>
                    <div className="text-sm text-muted-foreground">
                      {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons •{" "}
                      {course.modules.reduce(
                        (acc, module) =>
                          acc +
                          module.lessons.reduce((sum, lesson) => {
                            const time = lesson.duration.split(":")
                            return time.length > 1
                              ? sum + Number.parseInt(time[0]) * 60 + Number.parseInt(time[1])
                              : sum
                          }, 0),
                        0,
                      ) / 60}{" "}
                      hours total
                    </div>
                  </div>

                  <div className="space-y-4">
                    {course.modules.map((module, i) => (
                      <Card key={i}>
                        <CardHeader className="p-4 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {module.lessons.length} lessons •{" "}
                              {module.lessons.reduce((acc, lesson) => {
                                const time = lesson.duration.split(":")
                                return time.length > 1
                                  ? acc + Number.parseInt(time[0]) * 60 + Number.parseInt(time[1])
                                  : acc
                              }, 0) / 60}{" "}
                              hours
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2">
                            {module.lessons.map((lesson, j) => (
                              <div key={j} className="flex items-center justify-between py-2 border-t">
                                <div className="flex items-center gap-2">
                                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-8">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                      <AvatarFallback className="text-2xl">{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">{course.instructor.name}</h2>
                      <p className="text-muted-foreground">{course.instructor.title}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span>4.8 Instructor Rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span>1,245 Reviews</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>24,500 Students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>12 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">About the Instructor</h3>
                    <p>{course.instructor.bio}</p>
                    <p>
                      Jane specializes in front-end development and has a knack for explaining complex programming
                      concepts in simple terms. Her teaching methodology focuses on practical, hands-on learning that
                      prepares students for real-world development scenarios.
                    </p>
                    <p>
                      When she's not teaching or coding, Jane contributes to open-source projects and speaks at web
                      development conferences around the world.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-8">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3 space-y-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold">{course.rating}</div>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(course.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Course Rating</div>
                      </div>

                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percentage =
                            rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1 : 1
                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="flex items-center gap-1 w-16">
                                <span>{rating}</span>
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <div className="w-12 text-right text-sm text-muted-foreground">{percentage}%</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-6">
                      {course.reviewsList.map((review) => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.image} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.name}</div>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p>{review.comment}</p>
                          <Separator />
                        </div>
                      ))}

                      <Button variant="outline" className="w-full">
                        See All Reviews
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Learning?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of students who have already taken this course and transformed their careers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={`/checkout/${course.id}`}>
                  <Button size="lg" className="gap-1.5">
                    Enroll Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 CourseHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PlayCircle({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}

function MessageSquare({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
