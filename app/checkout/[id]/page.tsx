"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { BookOpen, CreditCard, Lock, ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"

export default function CheckoutPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const courseId = params?.id

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  // Sample course data
  const course = {
    id: courseId,
    title: "Web Development Masterclass",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course for beginners and intermediate developers.",
    instructor: "Jane Smith",
    price: 49.99,
    salePrice: 29.99,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    duration: "42 hours",
    lessons: 65,
    level: "All Levels",
  }

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount20") {
      setCouponApplied(true)
    }
  }

  const handleCompletePurchase = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      // Redirect to course after 2 seconds
      setTimeout(() => {
        router.push(`/dashboard/my-courses/${courseId}`)
      }, 2000)
    }, 1500)
  }

  // Calculate final price
  const discount = couponApplied ? course.salePrice * 0.2 : 0
  const finalPrice = course.salePrice - discount

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="w-full border-b">
          <div className="container flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>CourseHub</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 py-12">
          <div className="container max-w-md mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold">{t("purchaseComplete")}</h1>
              <p className="text-muted-foreground">{t("thankYouForYourPurchase")}</p>
              <div className="w-full p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="text-left">
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("by")} {course.instructor}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{t("redirectingToCourse")}</p>
              <Link href={`/dashboard/my-courses/${courseId}`}>
                <Button>{t("goToCourse")}</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b">
        <div className="container flex h-16 items-center">
          <Link href={`/course/${courseId}`} className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-medium">{t("backToCourse")}</span>
          </Link>
          <div className="ml-auto flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>CourseHub</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{t("checkout")}</h1>
                <p className="text-muted-foreground">{t("completeYourPurchase")}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">{t("paymentMethod")}</h2>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">{t("creditCard")}</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="other">{t("other")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="space-y-4 pt-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="card-number">{t("cardNumber")}</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">{t("expiryDate")}</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="name">{t("nameOnCard")}</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="space-y-4 pt-4">
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                      <div className="rounded-full bg-primary/10 p-3">
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
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2" />
                          <path d="M17 10.5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z" />
                          <path d="M11.5 15.5V19" />
                          <path d="M7.5 15.5V19" />
                          <path d="M15.5 15.5V19" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">{t("payWithPayPal")}</h3>
                        <p className="text-sm text-muted-foreground">{t("youWillBeRedirectedToPayPal")}</p>
                      </div>
                      <Button>{t("continueToPayPal")}</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="other" className="space-y-4 pt-4">
                    <RadioGroup defaultValue="bank-transfer">
                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                          <div className="font-medium">{t("bankTransfer")}</div>
                          <div className="text-sm text-muted-foreground">{t("payDirectlyFromBank")}</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                          <div className="font-medium">{t("cryptocurrency")}</div>
                          <div className="text-sm text-muted-foreground">{t("payWithCrypto")}</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">{t("billingInformation")}</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">{t("firstName")}</Label>
                      <Input id="first-name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">{t("lastName")}</Label>
                      <Input id="last-name" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">{t("address")}</Label>
                    <Input id="address" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">{t("city")}</Label>
                      <Input id="city" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">{t("state")}</Label>
                      <Input id="state" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip">{t("zipCode")}</Label>
                      <Input id="zip" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">{t("country")}</Label>
                    <Input id="country" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{t("orderSummary")}</CardTitle>
                <CardDescription>{t("reviewYourOrderDetails")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-24 overflow-hidden rounded-md">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("by")} {course.instructor}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>
                        {course.lessons} {t("lessons")}
                      </span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Input
                      placeholder={t("enterCouponCode")}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" className="ml-2" onClick={handleApplyCoupon} disabled={couponApplied}>
                      {couponApplied ? t("applied") : t("apply")}
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {t("couponApplied")}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("originalPrice")}</span>
                    <span>${course.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>{t("discount")}</span>
                    <span>-${(course.price - course.salePrice).toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>{t("couponDiscount")}</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>{t("total")}</span>
                    <span>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  {t("byCompletingYourPurchase")}{" "}
                  <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                    {t("termsOfService")}
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                    {t("privacyPolicy")}
                  </Link>
                  .
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCompletePurchase} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("processing")}
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      {t("completePurchase")}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 CourseHub. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>{t("securePayment")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
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
                className="h-5 w-5 text-muted-foreground"
              >
                <path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2" />
                <path d="M17 10.5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z" />
                <path d="M11.5 15.5V19" />
                <path d="M7.5 15.5V19" />
                <path d="M15.5 15.5V19" />
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
