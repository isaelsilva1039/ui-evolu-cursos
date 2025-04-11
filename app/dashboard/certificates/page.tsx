"use client"

import { useState } from "react"
import { Award, Download, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/hooks/use-translation"

// Dados de exemplo para certificados
const sampleCertificates = [
  {
    id: "cert1",
    courseTitle: "Introduction to Web Development",
    issueDate: "2023-12-15",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=320",
  },
  {
    id: "cert2",
    courseTitle: "Advanced React Patterns",
    issueDate: "2024-02-20",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=200&width=320",
  },
  {
    id: "cert3",
    courseTitle: "UI/UX Design Fundamentals",
    issueDate: "2024-01-10",
    instructor: "David Kim",
    image: "/placeholder.svg?height=200&width=320",
  },
]

export default function CertificatesPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrar certificados com base na pesquisa
  const filteredCertificates = sampleCertificates.filter((cert) =>
    cert.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("default", { dateStyle: "medium" }).format(date)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("certificates")}</h1>
        <p className="text-muted-foreground">{t("yourAchievements")}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchCertificates")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredCertificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Award className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">{t("noCertificatesFound")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("completeCourseToEarn")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-[1.4/1] bg-muted">
                  <img
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.courseTitle}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{certificate.courseTitle}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t("issueDate")}</span>
                    <span className="text-sm font-medium">{formatDate(certificate.issueDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t("instructor")}</span>
                    <span className="text-sm font-medium">{certificate.instructor}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  {t("view")}
                </Button>
                <Button size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  {t("download")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
