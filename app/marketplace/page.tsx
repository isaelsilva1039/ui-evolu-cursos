"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Star,
  BookOpen,
  Clock,
  Users,
  ChevronDown,
  Grid,
  List,
  Home,
  ShoppingCart,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useTranslation } from "@/hooks/use-translation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function MarketplacePage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Web Development Masterclass",
      description:
        "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course for beginners and intermediate developers.",
      instructor: "Jane Smith",
      price: 49.99,
      salePrice: 29.99,
      rating: 4.8,
      reviews: 342,
      students: 12543,
      level: "All Levels",
      lastUpdated: "March 2023",
      category: "Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      featured: true,
      bestseller: true,
      duration: "42 hours",
      language: "English",
      topics: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      description:
        "Master SEO, social media marketing, content strategy, and paid advertising to grow your business online.",
      instructor: "Michael Brown",
      price: 59.99,
      salePrice: 39.99,
      rating: 4.6,
      reviews: 215,
      students: 8765,
      level: "Beginner",
      lastUpdated: "February 2023",
      category: "Marketing",
      image:
        "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      featured: true,
      bestseller: false,
      duration: "36 hours",
      language: "English",
      topics: ["SEO", "Social Media", "Content Marketing", "Google Ads", "Analytics"],
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Create beautiful user interfaces and experiences that delight users and improve conversion rates.",
      instructor: "Sarah Johnson",
      price: 69.99,
      salePrice: 44.99,
      rating: 4.9,
      reviews: 178,
      students: 5432,
      level: "Intermediate",
      lastUpdated: "April 2023",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dWklMjB1eHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      featured: false,
      bestseller: true,
      duration: "28 hours",
      language: "English",
      topics: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Figma", "Adobe XD"],
    },
    {
      id: 4,
      title: "Data Science Bootcamp",
      description: "Python, statistics, machine learning and data visualization for aspiring data scientists.",
      instructor: "David Wilson",
      price: 79.99,
      salePrice: 49.99,
      rating: 4.7,
      reviews: 256,
      students: 7890,
      level: "Advanced",
      lastUpdated: "January 2023",
      category: "Data Science",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      featured: false,
      bestseller: false,
      duration: "45 hours",
      language: "English",
      topics: ["Python", "Statistics", "Machine Learning", "Data Visualization", "Pandas", "NumPy"],
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Build iOS and Android apps with React Native. Learn once, deploy everywhere.",
      instructor: "Robert Martinez",
      price: 69.99,
      salePrice: 39.99,
      rating: 4.5,
      reviews: 189,
      students: 6543,
      level: "Intermediate",
      lastUpdated: "May 2023",
      category: "Development",
      image:
        "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      featured: true,
      bestseller: false,
      duration: "38 hours",
      language: "English",
      topics: ["React Native", "JavaScript", "iOS", "Android", "Mobile UI"],
    },
    {
      id: 6,
      title: "Blockchain Fundamentals",
      description: "Understanding cryptocurrency and blockchain technology from the ground up.",
      instructor: "Emily Davis",
      price: 59.99,
      salePrice: 34.99,
      rating: 4.4,
      reviews: 132,
      students: 4321,
      level: "Beginner",
      lastUpdated: "June 2023",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmxvY2tjaGFpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      featured: false,
      bestseller: false,
      duration: "32 hours",
      language: "English",
      topics: ["Blockchain", "Cryptocurrency", "Smart Contracts", "Ethereum", "Bitcoin"],
    },
    {
      id: 7,
      title: "Photography Masterclass",
      description: "From beginner to professional photographer. Learn composition, lighting, editing and more.",
      instructor: "Jennifer Anderson",
      price: 49.99,
      salePrice: 29.99,
      rating: 4.8,
      reviews: 276,
      students: 9876,
      level: "All Levels",
      lastUpdated: "April 2023",
      category: "Photography",
      image:
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG9ncmFwaHl8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      featured: false,
      bestseller: true,
      duration: "24 hours",
      language: "English",
      topics: ["Photography", "Composition", "Lighting", "Editing", "Lightroom", "Photoshop"],
    },
    {
      id: 8,
      title: "Business Analytics",
      description: "Data-driven decision making for business growth. Learn Excel, SQL, Tableau and Power BI.",
      instructor: "Thomas Clark",
      price: 69.99,
      salePrice: 44.99,
      rating: 4.6,
      reviews: 198,
      students: 5678,
      level: "Intermediate",
      lastUpdated: "March 2023",
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3MlMjBhbmFseXRpY3N8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      featured: true,
      bestseller: false,
      duration: "30 hours",
      language: "English",
      topics: ["Excel", "SQL", "Tableau", "Power BI", "Data Analysis"],
    },
  ]

  // Filter and sort courses
  const filterCourses = (courses: typeof courses, tab: string) => {
    let filtered = [...courses]

    // Filter by tab
    if (tab === "featured") {
      filtered = filtered.filter((course) => course.featured)
    } else if (tab === "bestsellers") {
      filtered = filtered.filter((course) => course.bestseller)
    } else if (tab === "new") {
      // For demo purposes, just show the first 4 courses as "new"
      filtered = filtered.slice(0, 4)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel) {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    // Filter by price range
    filtered = filtered.filter((course) => course.salePrice >= priceRange[0] && course.salePrice <= priceRange[1])

    // Sort courses
    if (sortBy === "popular") {
      filtered.sort((a, b) => b.students - a.students)
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.salePrice - b.salePrice)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.salePrice - a.salePrice)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered
  }

  // Categories
  const categories = [
    "Development",
    "Business",
    "Marketing",
    "Design",
    "Photography",
    "Music",
    "Data Science",
    "Technology",
  ]

  // Levels
  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>CourseHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("home")}
            </Link>
            <Link href="/marketplace" className="text-primary font-medium">
              {t("courses")}
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("dashboard")}
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("about")}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Link href="/login">
              <Button variant="outline">{t("login")}</Button>
            </Link>
            <Link href="/signup" className="hidden md:block">
              <Button>{t("signUp")}</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="container py-3 space-y-1">
              <Link href="/" className="block py-2 px-3 rounded-md hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span>{t("home")}</span>
                </div>
              </Link>
              <Link href="/marketplace" className="block py-2 px-3 rounded-md bg-accent">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{t("courses")}</span>
                </div>
              </Link>
              <Link href="/dashboard" className="block py-2 px-3 rounded-md hover:bg-accent">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{t("dashboard")}</span>
                </div>
              </Link>
              <Link href="/cart" className="block py-2 px-3 rounded-md hover:bg-accent">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t("cart")}</span>
                </div>
              </Link>
              <div className="flex items-center gap-2 py-2 px-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  {t("expandYourKnowledge")}
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("discoverCourses")}</p>
              </div>
              <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t("searchCourses")}
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      <span>{t("filter")}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{t("filterBy")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs">{t("category")}</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                        {t("allCategories")}
                      </DropdownMenuItem>
                      {categories.map((category) => (
                        <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                          {category}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs">{t("level")}</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedLevel(null)}>{t("allLevels")}</DropdownMenuItem>
                      {levels.map((level) => (
                        <DropdownMenuItem key={level} onClick={() => setSelectedLevel(level)}>
                          {level}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs">{t("priceRange")}</DropdownMenuLabel>
                      <div className="px-2 py-4">
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("sortBy")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t("featured")}</SelectItem>
                    <SelectItem value="popular">{t("mostPopular")}</SelectItem>
                    <SelectItem value="newest">{t("newest")}</SelectItem>
                    <SelectItem value="price-low">{t("priceLowToHigh")}</SelectItem>
                    <SelectItem value="price-high">{t("priceHighToLow")}</SelectItem>
                    <SelectItem value="rating">{t("highestRated")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <TabsList className="h-auto p-1">
                  <TabsTrigger value="all" className="px-3 py-1.5">
                    {t("allCourses")}
                  </TabsTrigger>
                  <TabsTrigger value="featured" className="px-3 py-1.5">
                    {t("featured")}
                  </TabsTrigger>
                  <TabsTrigger value="bestsellers" className="px-3 py-1.5">
                    {t("bestsellers")}
                  </TabsTrigger>
                  <TabsTrigger value="new" className="px-3 py-1.5">
                    {t("new")}
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground mr-2">
                    {t("showing")} {filterCourses(courses, "all").length} {t("courses")}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === "grid" ? "bg-muted" : ""}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === "list" ? "bg-muted" : ""}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="space-y-8">
                {isLoading ? (
                  viewMode === "grid" ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <CourseCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CourseListItemSkeleton key={i} />
                      ))}
                    </div>
                  )
                ) : viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filterCourses(courses, "all").map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filterCourses(courses, "all").map((course) => (
                      <CourseListItem key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="featured" className="space-y-8">
                {isLoading ? (
                  viewMode === "grid" ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <CourseCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <CourseListItemSkeleton key={i} />
                      ))}
                    </div>
                  )
                ) : viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filterCourses(courses, "featured").map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filterCourses(courses, "featured").map((course) => (
                      <CourseListItem key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bestsellers" className="space-y-8">
                {isLoading ? (
                  viewMode === "grid" ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <CourseCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <CourseListItemSkeleton key={i} />
                      ))}
                    </div>
                  )
                ) : viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filterCourses(courses, "bestsellers").map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filterCourses(courses, "bestsellers").map((course) => (
                      <CourseListItem key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="new" className="space-y-8">
                {isLoading ? (
                  viewMode === "grid" ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <CourseCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <CourseListItemSkeleton key={i} />
                      ))}
                    </div>
                  )
                ) : viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filterCourses(courses, "new").map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filterCourses(courses, "new").map((course) => (
                      <CourseListItem key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button variant="outline" size="sm" className="w-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="w-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="w-8">
                  3
                </Button>
                <span className="mx-1">...</span>
                <Button variant="outline" size="sm" className="w-8">
                  10
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("becomeInstructor")}</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("shareKnowledge")}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup?role=instructor">
                  <Button size="lg" className="gap-1.5">
                    {t("startTeaching")}
                  </Button>
                </Link>
                <Link href="/instructor-faq">
                  <Button size="lg" variant="outline">
                    {t("learnMore")}
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
            © 2025 CourseHub. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              {t("terms")}
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  const { t } = useTranslation()

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="h-40 w-full object-cover" />
        {course.bestseller && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">{t("bestseller")}</Badge>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{course.instructor}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-3">{course.description}</p>
        <div className="flex items-center gap-1 mb-1">
          <span className="font-medium text-amber-500">{course.rating}</span>
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
          <span className="text-xs text-muted-foreground">({course.reviews})</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-auto">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">${course.salePrice}</span>
          <span className="text-sm text-muted-foreground line-through">${course.price}</span>
        </div>
        <Link href={`/course/${course.id}`}>
          <Button variant="outline" size="sm">
            {t("viewCourse")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function CourseListItem({ course }: { course: any }) {
  const { t } = useTranslation()

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5">
          <img src={course.image || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col md:flex-row flex-1 p-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{course.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {course.topics.slice(0, 3).map((topic: string) => (
                <Badge key={topic} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {course.topics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{course.topics.length - 3} more
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-medium text-amber-500">{course.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span>({course.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end mt-4 md:mt-0 md:ml-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${course.salePrice}</span>
              <span className="text-sm text-muted-foreground line-through">${course.price}</span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Link href={`/course/${course.id}`}>
                <Button className="w-full">{t("viewCourse")}</Button>
              </Link>
              <Link href={`/checkout/${course.id}`}>
                <Button variant="outline" className="w-full">
                  {t("buyNow")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-40 bg-muted animate-pulse" />
      <CardHeader className="p-4">
        <div className="h-6 bg-muted animate-pulse rounded-md mb-2" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-2/3" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="h-4 bg-muted animate-pulse rounded-md mb-2" />
        <div className="h-4 bg-muted animate-pulse rounded-md mb-3 w-5/6" />
        <div className="h-4 bg-muted animate-pulse rounded-md mb-3 w-1/3" />
        <div className="h-3 bg-muted animate-pulse rounded-md w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-auto">
        <div className="h-6 bg-muted animate-pulse rounded-md w-1/4" />
        <div className="h-8 bg-muted animate-pulse rounded-md w-1/3" />
      </CardFooter>
    </Card>
  )
}

function CourseListItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5 h-40 md:h-auto bg-muted animate-pulse" />
        <div className="flex flex-col md:flex-row flex-1 p-4">
          <div className="flex-1">
            <div className="h-6 bg-muted animate-pulse rounded-md mb-2" />
            <div className="h-4 bg-muted animate-pulse rounded-md w-1/3 mb-2" />
            <div className="h-4 bg-muted animate-pulse rounded-md mb-2" />
            <div className="h-4 bg-muted animate-pulse rounded-md w-5/6 mb-3" />
            <div className="flex gap-2 mb-2">
              <div className="h-6 bg-muted animate-pulse rounded-full w-16" />
              <div className="h-6 bg-muted animate-pulse rounded-full w-16" />
              <div className="h-6 bg-muted animate-pulse rounded-full w-16" />
            </div>
            <div className="h-3 bg-muted animate-pulse rounded-md w-1/2 mt-3" />
          </div>
          <div className="flex flex-col justify-between items-end mt-4 md:mt-0 md:ml-4">
            <div className="h-6 bg-muted animate-pulse rounded-md w-20" />
            <div className="flex flex-col gap-2 mt-4">
              <div className="h-9 bg-muted animate-pulse rounded-md w-24" />
              <div className="h-9 bg-muted animate-pulse rounded-md w-24" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
