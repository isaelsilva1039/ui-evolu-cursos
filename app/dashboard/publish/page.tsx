"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Globe,
  ImageIcon,
  Info,
  ListChecks,
  MessageSquare,
  Plus,
  Settings,
  Target,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PublishCoursePage() {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)
  const [courseData, setCourseData] = useState({
    title: "Advanced Web Development with React",
    description:
      "Master React, Redux, and Next.js in this comprehensive course for developers looking to build modern web applications.",
    price: 79.99,
    salePrice: 49.99,
    category: "development",
    level: "intermediate",
    language: "english",
    thumbnail: null,
    promo: null,
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with ES6+ syntax",
      "Understanding of web development concepts",
    ],
    outcomes: [
      "Build complex React applications from scratch",
      "Implement state management with Redux and Context API",
      "Create server-side rendered applications with Next.js",
      "Deploy applications to various hosting platforms",
    ],
    modules: [
      {
        id: 1,
        title: "React Fundamentals",
        lessons: [
          { id: 1, title: "Introduction to React", type: "video", duration: "15:20" },
          { id: 2, title: "Components and Props", type: "video", duration: "22:45" },
          { id: 3, title: "State and Lifecycle", type: "video", duration: "18:30" },
        ],
      },
      {
        id: 2,
        title: "Advanced React Patterns",
        lessons: [
          { id: 4, title: "Higher-Order Components", type: "video", duration: "20:15" },
          { id: 5, title: "Render Props", type: "video", duration: "17:50" },
          { id: 6, title: "Hooks Deep Dive", type: "video", duration: "25:20" },
          { id: 7, title: "React Patterns Quiz", type: "quiz", duration: "15 mins" },
        ],
      },
    ],
  })

  const handlePublish = () => {
    setIsPublishing(true)

    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false)
      router.push("/dashboard/courses")
    }, 2000)
  }

  const addRequirement = () => {
    setCourseData({
      ...courseData,
      requirements: [...courseData.requirements, ""],
    })
  }

  const updateRequirement = (index: number, value: string) => {
    const updatedRequirements = [...courseData.requirements]
    updatedRequirements[index] = value
    setCourseData({
      ...courseData,
      requirements: updatedRequirements,
    })
  }

  const removeRequirement = (index: number) => {
    const updatedRequirements = courseData.requirements.filter((_, i) => i !== index)
    setCourseData({
      ...courseData,
      requirements: updatedRequirements,
    })
  }

  const addOutcome = () => {
    setCourseData({
      ...courseData,
      outcomes: [...courseData.outcomes, ""],
    })
  }

  const updateOutcome = (index: number, value: string) => {
    const updatedOutcomes = [...courseData.outcomes]
    updatedOutcomes[index] = value
    setCourseData({
      ...courseData,
      outcomes: updatedOutcomes,
    })
  }

  const removeOutcome = (index: number) => {
    const updatedOutcomes = courseData.outcomes.filter((_, i) => i !== index)
    setCourseData({
      ...courseData,
      outcomes: updatedOutcomes,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Publish Course</h1>
        <p className="text-muted-foreground">Prepare your course for publication to the marketplace.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Courses
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
        <Button onClick={handlePublish} disabled={isPublishing}>
          {isPublishing ? (
            <>Publishing...</>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              Publish to Marketplace
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">
            <Info className="mr-2 h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="curriculum">
            <ListChecks className="mr-2 h-4 w-4" />
            Curriculum
          </TabsTrigger>
          <TabsTrigger value="requirements">
            <Target className="mr-2 h-4 w-4" />
            Requirements
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="mr-2 h-4 w-4" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide essential details about your course to help students understand what they'll learn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  A clear, specific title that describes what students will learn (60 characters max).
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  className="min-h-[120px]"
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Provide a detailed description of your course content, target audience, and learning outcomes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={courseData.category}
                    onValueChange={(value) => setCourseData({ ...courseData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={courseData.level}
                    onValueChange={(value) => setCourseData({ ...courseData, level: value })}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all-levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={courseData.language}
                  onValueChange={(value) => setCourseData({ ...courseData, language: value })}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Course Thumbnail</Label>
                <div className="flex items-center gap-4">
                  <div className="h-32 w-56 overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                    {courseData.thumbnail ? (
                      <img
                        src={courseData.thumbnail || "/placeholder.svg"}
                        alt="Course thumbnail"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mb-2" />
                        <span className="text-sm">No thumbnail</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Thumbnail
                    </Button>
                    <p className="text-xs text-muted-foreground">Recommended size: 1280x720px (16:9 ratio)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Promotional Video</Label>
                <div className="flex items-center gap-4">
                  <div className="h-32 w-56 overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                    {courseData.promo ? (
                      <video src={courseData.promo} controls className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground">
                        <FileText className="h-8 w-8 mb-2" />
                        <span className="text-sm">No promo video</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Promo Video
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      A 2-3 minute video introducing your course (optional but recommended)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>Organize your course content into modules and lessons.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="multiple" defaultValue={["module-1", "module-2"]}>
                {courseData.modules.map((module, moduleIndex) => (
                  <AccordionItem key={module.id} value={`module-${module.id}`}>
                    <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span>{module.title}</span>
                        <Badge variant="outline" className="ml-2">
                          {module.lessons.length} lessons
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 pb-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Input
                            value={module.title}
                            onChange={(e) => {
                              const updatedModules = [...courseData.modules]
                              updatedModules[moduleIndex].title = e.target.value
                              setCourseData({ ...courseData, modules: updatedModules })
                            }}
                            className="max-w-md"
                            placeholder="Module title"
                          />
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-3 w-3" />
                              Add Lesson
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Module Settings</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-md border bg-card"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.type === "video" ? (
                                  <PlayCircle className="h-5 w-5 text-primary" />
                                ) : lesson.type === "quiz" ? (
                                  <FileText className="h-5 w-5 text-primary" />
                                ) : (
                                  <BookOpen className="h-5 w-5 text-primary" />
                                )}
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-xs capitalize">
                                      {lesson.type}
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{lesson.duration}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Course Requirements & Outcomes</CardTitle>
              <CardDescription>
                Define what students need to know before starting and what they'll learn by the end.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Requirements</h3>
                  <Button variant="outline" size="sm" onClick={addRequirement}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Requirement
                  </Button>
                </div>
                <div className="space-y-2">
                  {courseData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder="Enter a requirement"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={() => removeRequirement(index)}
                      >
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
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">What Students Will Learn</h3>
                  <Button variant="outline" size="sm" onClick={addOutcome}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Learning Outcome
                  </Button>
                </div>
                <div className="space-y-2">
                  {courseData.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={outcome}
                        onChange={(e) => updateOutcome(index, e.target.value)}
                        placeholder="Enter a learning outcome"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={() => removeOutcome(index)}
                      >
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
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Course Pricing</CardTitle>
              <CardDescription>Set the pricing for your course and configure promotional offers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="free-course">Free Course</Label>
                  <p className="text-sm text-muted-foreground">Make this course available for free</p>
                </div>
                <Switch id="free-course" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Regular Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={courseData.price}
                  onChange={(e) => setCourseData({ ...courseData, price: Number.parseFloat(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">Set a price between $19.99 and $199.99</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sale">Sale Price</Label>
                  <p className="text-sm text-muted-foreground">Offer a discounted price</p>
                </div>
                <Switch id="sale" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sale-price">Sale Price ($)</Label>
                <Input
                  id="sale-price"
                  type="number"
                  value={courseData.salePrice}
                  onChange={(e) => setCourseData({ ...courseData, salePrice: Number.parseFloat(e.target.value) })}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    This is a {Math.round(100 - (courseData.salePrice / courseData.price) * 100)}% discount
                  </p>
                  <p className="text-xs font-medium text-green-600">
                    You earn ${(courseData.salePrice * 0.7).toFixed(2)} per sale
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Promotional Coupons</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-medium">New Coupon</h4>
                      <p className="text-sm text-muted-foreground">Create a limited-time discount coupon</p>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Coupon
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-medium">Affiliate Program</h3>
                    <p className="text-sm text-muted-foreground">
                      Allow others to promote your course and earn commission
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commission">Affiliate Commission (%)</Label>
                  <Input id="commission" type="number" defaultValue="30" />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 30-50%. Higher commission rates can attract more affiliates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
              <CardDescription>Configure additional settings for your course.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="drip-content">Drip Content</Label>
                  <p className="text-sm text-muted-foreground">Release content gradually over time</p>
                </div>
                <Switch id="drip-content" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="certificate">Course Certificate</Label>
                  <p className="text-sm text-muted-foreground">Issue certificates upon course completion</p>
                </div>
                <Switch id="certificate" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Course Tags</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                      React
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
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
                          className="h-3 w-3"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </Badge>
                    <Badge className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                      JavaScript
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
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
                          className="h-3 w-3"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </Badge>
                    <Badge className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                      Web Development
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
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
                          className="h-3 w-3"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </Badge>
                  </div>
                  <Input
                    placeholder="Add a tag..."
                    className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Add up to 5 tags to help students find your course</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Course Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="comments-enabled" name="comments" className="h-4 w-4" defaultChecked />
                    <label htmlFor="comments-enabled">Enable comments</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="comments-disabled" name="comments" className="h-4 w-4" />
                    <label htmlFor="comments-disabled">Disable comments</label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Allow students to comment on lessons and engage with each other
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured">Featured Course Request</Label>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-medium">Request Featured Status</h4>
                      <p className="text-sm text-muted-foreground">
                        Featured courses get more visibility on the marketplace
                      </p>
                    </div>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Request Review
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Save as Draft
        </Button>
        <Button onClick={handlePublish} disabled={isPublishing}>
          {isPublishing ? (
            <>Publishing...</>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              Publish to Marketplace
            </>
          )}
        </Button>
      </div>
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
