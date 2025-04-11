"use client"

import { useState } from "react"
import { BarChart2, Copy, DollarSign, ExternalLink, Link2, Search, Users } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslation } from "@/hooks/use-translation"

export default function AffiliatesPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  // Sample affiliate data
  const affiliates = [
    { id: 1, name: "John Smith", email: "john@example.com", sales: 42, commission: 1260, status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", sales: 38, commission: 1140, status: "active" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", sales: 27, commission: 810, status: "active" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", sales: 19, commission: 570, status: "pending" },
    { id: 5, name: "David Wilson", email: "david@example.com", sales: 15, commission: 450, status: "active" },
    { id: 6, name: "Jessica Taylor", email: "jessica@example.com", sales: 12, commission: 360, status: "inactive" },
    { id: 7, name: "Robert Martinez", email: "robert@example.com", sales: 8, commission: 240, status: "active" },
    { id: 8, name: "Jennifer Anderson", email: "jennifer@example.com", sales: 5, commission: 150, status: "pending" },
  ]

  // Sample courses for affiliate requests
  const availableCourses = [
    {
      id: 1,
      title: "Web Development Masterclass",
      instructor: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      commission: "30%",
      status: "approved",
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      instructor: "Michael Brown",
      image:
        "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      commission: "25%",
      status: "pending",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dWklMjB1eHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      commission: "35%",
      status: null,
    },
    {
      id: 4,
      title: "Data Science Bootcamp",
      instructor: "David Wilson",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      commission: "40%",
      status: "approved",
    },
  ]

  // Sample affiliate links
  const affiliateLinks = [
    {
      id: 1,
      courseId: 1,
      courseTitle: "Web Development Masterclass",
      link: "https://coursehub.com/course/1?ref=aff123456",
      clicks: 342,
      conversions: 28,
      conversionRate: "8.2%",
      earnings: 840,
    },
    {
      id: 2,
      courseId: 4,
      courseTitle: "Data Science Bootcamp",
      link: "https://coursehub.com/course/4?ref=aff123456",
      clicks: 215,
      conversions: 14,
      conversionRate: "6.5%",
      earnings: 560,
    },
  ]

  // Filter affiliates based on search query and tab
  const filterAffiliates = () => {
    return affiliates
      .filter((affiliate) => affiliate.status === activeTab || activeTab === "all")
      .filter(
        (affiliate) =>
          affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          affiliate.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
  }

  // Filter courses based on search query
  const filterCourses = () => {
    return availableCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast.success(t("linkCopied"))
  }

  const handleRequestAffiliation = (course: any) => {
    setSelectedCourse(course)
    setShowRequestDialog(true)
  }

  const submitAffiliationRequest = () => {
    toast.success(t("affiliationRequestSubmitted"))
    setShowRequestDialog(false)
    // In a real app, you would send this request to the backend
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("affiliates")}</h1>
        <p className="text-muted-foreground">{t("manageAffiliateProgram")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalAffiliates")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("affiliateSales")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-muted-foreground">+18.2% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("commissionPaid")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,670</div>
            <p className="text-xs text-muted-foreground">+12.5% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("conversionRate")}</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="links" className="space-y-4">
        <TabsList>
          <TabsTrigger value="links">{t("affiliateLinks")}</TabsTrigger>
          <TabsTrigger value="courses">{t("availableCourses")}</TabsTrigger>
          <TabsTrigger value="partners">{t("affiliatePartners")}</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("searchLinks")}
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("yourAffiliateLinks")}</CardTitle>
              <CardDescription>{t("manageYourAffiliateLinks")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("course")}</TableHead>
                    <TableHead>{t("affiliateLink")}</TableHead>
                    <TableHead className="text-right">{t("clicks")}</TableHead>
                    <TableHead className="text-right">{t("conversions")}</TableHead>
                    <TableHead className="text-right">{t("conversionRate")}</TableHead>
                    <TableHead className="text-right">{t("earnings")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliateLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">{link.courseTitle}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{link.link}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{link.clicks}</TableCell>
                      <TableCell className="text-right">{link.conversions}</TableCell>
                      <TableCell className="text-right">{link.conversionRate}</TableCell>
                      <TableCell className="text-right">${link.earnings}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleCopyLink(link.link)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <a href={link.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
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

        <TabsContent value="courses" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("searchCourses")}
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterCourses().map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="line-clamp-1 text-xl">{course.title}</CardTitle>
                  <CardDescription>
                    {t("by")} {course.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {t("commission")}: {course.commission}
                      </span>
                    </div>
                    {course.status && (
                      <Badge variant={course.status === "approved" ? "default" : "outline"}>
                        {course.status === "approved" ? t("approved") : t("pending")}
                      </Badge>
                    )}
                  </div>
                  {course.status === "approved" ? (
                    <Button
                      className="w-full"
                      onClick={() => handleCopyLink(`https://coursehub.com/course/${course.id}?ref=aff123456`)}
                    >
                      {t("copyAffiliateLink")}
                    </Button>
                  ) : course.status === "pending" ? (
                    <Button variant="outline" className="w-full" disabled>
                      {t("pendingApproval")}
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => handleRequestAffiliation(course)}>
                      {t("requestAffiliation")}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("searchAffiliates")}
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                  {t("allAffiliates")}
                </TabsTrigger>
                <TabsTrigger value="active" onClick={() => setActiveTab("active")}>
                  {t("active")}
                </TabsTrigger>
                <TabsTrigger value="pending" onClick={() => setActiveTab("pending")}>
                  {t("pending")}
                </TabsTrigger>
                <TabsTrigger value="inactive" onClick={() => setActiveTab("inactive")}>
                  {t("inactive")}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{activeTab === "all" ? t("allAffiliates") : t(activeTab + "Affiliates")}</CardTitle>
              <CardDescription>
                {t("totalAffiliates")}: {filterAffiliates().length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("email")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead className="text-right">{t("sales")}</TableHead>
                    <TableHead className="text-right">{t("commission")} ($)</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterAffiliates().map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell className="font-medium">{affiliate.name}</TableCell>
                      <TableCell>{affiliate.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            affiliate.status === "active"
                              ? "default"
                              : affiliate.status === "pending"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {affiliate.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{affiliate.sales}</TableCell>
                      <TableCell className="text-right">${affiliate.commission}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          {t("view")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("requestAffiliation")}</DialogTitle>
            <DialogDescription>{t("requestAffiliationDescription")}</DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="flex items-center gap-4 py-4">
              <img
                src={selectedCourse.image || "/placeholder.svg"}
                alt={selectedCourse.title}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div>
                <h3 className="font-medium">{selectedCourse.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("by")} {selectedCourse.instructor}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">{t("commission")}:</span> {selectedCourse.commission}
                </p>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t("whyDoYouWantToPromote")}</h4>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder={t("explainWhyYouWantToPromote")}
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t("howWillYouPromote")}</h4>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder={t("explainHowYouWillPromote")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={submitAffiliationRequest}>{t("submitRequest")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
