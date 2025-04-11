"use client"

import { useState } from "react"
import { CalendarIcon, Download, Filter, Search } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"

export default function SalesPage() {
  const { t } = useTranslation()
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")

  // Sample sales data
  const sales = [
    {
      id: "INV-001",
      course: "Web Development Masterclass",
      customer: "John Doe",
      email: "john@example.com",
      amount: 49.99,
      date: "2023-04-15",
      status: "completed",
    },
    {
      id: "INV-002",
      course: "Digital Marketing Fundamentals",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      amount: 39.99,
      date: "2023-04-14",
      status: "completed",
    },
    {
      id: "INV-003",
      course: "UI/UX Design Principles",
      customer: "Michael Brown",
      email: "michael@example.com",
      amount: 59.99,
      date: "2023-04-13",
      status: "completed",
    },
    {
      id: "INV-004",
      course: "Data Science Bootcamp",
      customer: "Emily Davis",
      email: "emily@example.com",
      amount: 79.99,
      date: "2023-04-12",
      status: "pending",
    },
    {
      id: "INV-005",
      course: "Mobile App Development",
      customer: "David Wilson",
      email: "david@example.com",
      amount: 69.99,
      date: "2023-04-11",
      status: "completed",
    },
    {
      id: "INV-006",
      course: "Blockchain Fundamentals",
      customer: "Jessica Taylor",
      email: "jessica@example.com",
      amount: 49.99,
      date: "2023-04-10",
      status: "refunded",
    },
    {
      id: "INV-007",
      course: "Photography Masterclass",
      customer: "Robert Martinez",
      email: "robert@example.com",
      amount: 39.99,
      date: "2023-04-09",
      status: "completed",
    },
    {
      id: "INV-008",
      course: "Business Analytics",
      customer: "Jennifer Anderson",
      email: "jennifer@example.com",
      amount: 59.99,
      date: "2023-04-08",
      status: "pending",
    },
  ]

  // Filter sales based on search query and tab
  const filterSales = (status: string) => {
    return sales
      .filter((sale) => sale.status === status || status === "all")
      .filter(
        (sale) =>
          sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sale.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sale.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sale.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
  }

  const completedSales = filterSales("completed")
  const pendingSales = filterSales("pending")
  const refundedSales = filterSales("refunded")
  const allSales = filterSales("all")

  // Calculate totals
  const calculateTotal = (salesArray: typeof sales) => {
    return salesArray.reduce((total, sale) => total + sale.amount, 0).toFixed(2)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("sales")}</h1>
        <p className="text-muted-foreground">{t("manageSalesAndTransactions")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalSales")}</CardTitle>
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
            <div className="text-2xl font-bold">${calculateTotal(sales)}</div>
            <p className="text-xs text-muted-foreground">+20.1% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("completedSales")}</CardTitle>
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${calculateTotal(completedSales)}</div>
            <p className="text-xs text-muted-foreground">+10.5% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("pendingSales")}</CardTitle>
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${calculateTotal(pendingSales)}</div>
            <p className="text-xs text-muted-foreground">+12.3% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("refundedSales")}</CardTitle>
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
            <div className="text-2xl font-bold">${calculateTotal(refundedSales)}</div>
            <p className="text-xs text-muted-foreground">-2.5% {t("fromLastMonth")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchTransactions")}
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : t("pickADate")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">{t("allSales")}</TabsTrigger>
          <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
          <TabsTrigger value="pending">{t("pending")}</TabsTrigger>
          <TabsTrigger value="refunded">{t("refunded")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("allTransactions")}</CardTitle>
              <CardDescription>
                {t("totalTransactions")}: {allSales.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("invoice")}</TableHead>
                    <TableHead>{t("course")}</TableHead>
                    <TableHead>{t("customer")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.course}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.customer}</div>
                          <div className="text-sm text-muted-foreground">{sale.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>${sale.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sale.status === "completed"
                              ? "default"
                              : sale.status === "pending"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {sale.status}
                        </Badge>
                      </TableCell>
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

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("completedTransactions")}</CardTitle>
              <CardDescription>
                {t("totalCompletedTransactions")}: {completedSales.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("invoice")}</TableHead>
                    <TableHead>{t("course")}</TableHead>
                    <TableHead>{t("customer")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.course}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.customer}</div>
                          <div className="text-sm text-muted-foreground">{sale.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>${sale.amount.toFixed(2)}</TableCell>
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

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("pendingTransactions")}</CardTitle>
              <CardDescription>
                {t("totalPendingTransactions")}: {pendingSales.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("invoice")}</TableHead>
                    <TableHead>{t("course")}</TableHead>
                    <TableHead>{t("customer")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.course}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.customer}</div>
                          <div className="text-sm text-muted-foreground">{sale.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>${sale.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            {t("approve")}
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

        <TabsContent value="refunded" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("refundedTransactions")}</CardTitle>
              <CardDescription>
                {t("totalRefundedTransactions")}: {refundedSales.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("invoice")}</TableHead>
                    <TableHead>{t("course")}</TableHead>
                    <TableHead>{t("customer")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refundedSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.course}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.customer}</div>
                          <div className="text-sm text-muted-foreground">{sale.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>${sale.amount.toFixed(2)}</TableCell>
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
    </div>
  )
}
