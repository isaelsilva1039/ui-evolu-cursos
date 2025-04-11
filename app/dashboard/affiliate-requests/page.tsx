"use client"

import { useState } from "react"
import { Search, Check, X, ExternalLink } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/hooks/use-translation"

export default function AffiliateRequestsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  // Sample affiliate request data
  const affiliateRequests = [
    {
      id: 1,
      user: {
        name: "John Smith",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
        website: "https://johnsmith.com",
        social: {
          twitter: "@johnsmith",
          instagram: "@johnsmith",
        },
      },
      course: {
        id: 1,
        title: "Web Development Masterclass",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      },
      date: "2023-06-15",
      status: "pending",
      reason:
        "I have a large audience of web developers on my blog and YouTube channel. I believe your course would be valuable to my audience and I'd like to promote it.",
      promotionPlan:
        "I plan to create a review video on YouTube, write a blog post, and share on my social media channels.",
    },
    {
      id: 2,
      user: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
        website: "https://sarahjohnson.com",
        social: {
          twitter: "@sarahjohnson",
          instagram: "@sarahjohnson",
        },
      },
      course: {
        id: 2,
        title: "Digital Marketing Fundamentals",
        image:
          "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      },
      date: "2023-06-12",
      status: "approved",
      reason:
        "I run a marketing blog with over 50,000 monthly visitors. Your course aligns perfectly with my audience's interests.",
      promotionPlan: "I'll feature your course in my weekly newsletter and create a dedicated review post.",
    },
    {
      id: 3,
      user: {
        name: "Michael Brown",
        email: "michael@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=MB",
        website: "https://michaelbrown.com",
        social: {
          twitter: "@michaelbrown",
          instagram: "@michaelbrown",
        },
      },
      course: {
        id: 3,
        title: "UI/UX Design Principles",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dWklMjB1eHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      },
      date: "2023-06-10",
      status: "rejected",
      reason: "I'm a UX designer with a growing Instagram following. I'd like to promote your course to my audience.",
      promotionPlan: "I'll create Instagram stories and posts featuring your course content and benefits.",
    },
    {
      id: 4,
      user: {
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=ED",
        website: "https://emilydavis.com",
        social: {
          twitter: "@emilydavis",
          instagram: "@emilydavis",
        },
      },
      course: {
        id: 4,
        title: "Data Science Bootcamp",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      },
      date: "2023-06-08",
      status: "pending",
      reason:
        "I run a data science newsletter with 10,000+ subscribers. Your course would be a great fit for my audience.",
      promotionPlan: "I'll feature your course in my newsletter and create a special discount code for my subscribers.",
    },
  ]

  // Filter requests based on search query and tab
  const filterRequests = () => {
    return affiliateRequests
      .filter((request) => request.status === activeTab || activeTab === "all")
      .filter(
        (request) =>
          request.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.course.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
  }

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request)
    setShowDetailsDialog(true)
  }

  const handleApprove = (requestId: number) => {
    toast.success(t("affiliateRequestApproved"))
    // In a real app, you would update the request status in the backend
  }

  const handleReject = (requestId: number) => {
    toast.success(t("affiliateRequestRejected"))
    // In a real app, you would update the request status in the backend
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("affiliateRequests")}</h1>
        <p className="text-muted-foreground">{t("manageAffiliateRequests")}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchRequests")}
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            {t("all")}
          </TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setActiveTab("pending")}>
            {t("pending")}
          </TabsTrigger>
          <TabsTrigger value="approved" onClick={() => setActiveTab("approved")}>
            {t("approved")}
          </TabsTrigger>
          <TabsTrigger value="rejected" onClick={() => setActiveTab("rejected")}>
            {t("rejected")}
          </TabsTrigger>
        </TabsList>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{activeTab === "all" ? t("allRequests") : t(activeTab + "Requests")}</CardTitle>
          <CardDescription>
            {t("totalRequests")}: {filterRequests().length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("affiliate")}</TableHead>
                <TableHead>{t("course")}</TableHead>
                <TableHead>{t("requestDate")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterRequests().map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={request.user.avatar} alt={request.user.name} />
                        <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.user.name}</div>
                        <div className="text-sm text-muted-foreground">{request.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={request.course.image || "/placeholder.svg"}
                        alt={request.course.title}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span className="font-medium">{request.course.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "approved"
                          ? "default"
                          : request.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                        {t("details")}
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button variant="default" size="sm" onClick={() => handleApprove(request.id)}>
                            <Check className="h-4 w-4 mr-1" />
                            {t("approve")}
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleReject(request.id)}>
                            <X className="h-4 w-4 mr-1" />
                            {t("reject")}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t("affiliateRequestDetails")}</DialogTitle>
            <DialogDescription>{t("reviewAffiliateRequestDetails")}</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t("affiliateInformation")}</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedRequest.user.avatar} alt={selectedRequest.user.name} />
                      <AvatarFallback>{selectedRequest.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-lg">{selectedRequest.user.name}</div>
                      <div className="text-muted-foreground">{selectedRequest.user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t("website")}:</span>
                      <a
                        href={selectedRequest.user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary flex items-center gap-1"
                      >
                        {selectedRequest.user.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Twitter:</span>
                      <span>{selectedRequest.user.social.twitter}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Instagram:</span>
                      <span>{selectedRequest.user.social.instagram}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t("courseInformation")}</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedRequest.course.image || "/placeholder.svg"}
                      alt={selectedRequest.course.title}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="font-medium">{selectedRequest.course.title}</div>
                  </div>
                  <div>
                    <div className="font-medium">{t("requestDate")}:</div>
                    <div>{selectedRequest.date}</div>
                  </div>
                  <div>
                    <div className="font-medium">{t("status")}:</div>
                    <Badge
                      variant={
                        selectedRequest.status === "approved"
                          ? "default"
                          : selectedRequest.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("requestDetails")}</h3>
                <div>
                  <div className="font-medium">{t("reasonForRequest")}:</div>
                  <p className="mt-1 text-muted-foreground">{selectedRequest.reason}</p>
                </div>
                <div>
                  <div className="font-medium">{t("promotionPlan")}:</div>
                  <p className="mt-1 text-muted-foreground">{selectedRequest.promotionPlan}</p>
                </div>
              </div>
              {selectedRequest.status === "pending" && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                    {t("cancel")}
                  </Button>
                  <Button variant="destructive" onClick={() => handleReject(selectedRequest.id)}>
                    <X className="h-4 w-4 mr-1" />
                    {t("reject")}
                  </Button>
                  <Button onClick={() => handleApprove(selectedRequest.id)}>
                    <Check className="h-4 w-4 mr-1" />
                    {t("approve")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
