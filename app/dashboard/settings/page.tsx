"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/hooks/use-translation"

export default function SettingsPage() {
  const { t } = useTranslation()
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")

  // Estado para os formulários
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Frontend developer and educator with a passion for teaching web technologies.",
    website: "https://johndoe.com",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    social: true,
    security: true,
    courseUpdates: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
        <p className="text-muted-foreground">{t("manageYourAccountSettings")}</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
          <TabsTrigger value="account">{t("account")}</TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("profileInformation")}</CardTitle>
              <CardDescription>{t("updateYourProfileDetails")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center gap-1.5">
                    <Label htmlFor="picture" className="cursor-pointer text-sm font-medium text-primary">
                      {t("changePicture")}
                    </Label>
                    <Input id="picture" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t("fullName")}</Label>
                    <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t("emailAddress")}</Label>
                    <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">{t("bio")}</Label>
                <Textarea id="bio" name="bio" rows={4} value={profile.bio} onChange={handleProfileChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="website">{t("website")}</Label>
                <Input id="website" name="website" type="url" value={profile.website} onChange={handleProfileChange} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>{t("saveChanges")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("notificationPreferences")}</CardTitle>
              <CardDescription>{t("manageHowWeContactYou")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex-1">
                  {t("emailNotifications")}
                  <p className="text-sm text-muted-foreground">{t("receiveEmailsAboutActivity")}</p>
                </Label>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing-emails" className="flex-1">
                  {t("marketingEmails")}
                  <p className="text-sm text-muted-foreground">{t("receiveMarketingEmails")}</p>
                </Label>
                <Switch
                  id="marketing-emails"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="social-notifications" className="flex-1">
                  {t("socialNotifications")}
                  <p className="text-sm text-muted-foreground">{t("receiveSocialNotifications")}</p>
                </Label>
                <Switch
                  id="social-notifications"
                  checked={notifications.social}
                  onCheckedChange={(checked) => handleNotificationChange("social", checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="security-notifications" className="flex-1">
                  {t("securityNotifications")}
                  <p className="text-sm text-muted-foreground">{t("receiveSecurityNotifications")}</p>
                </Label>
                <Switch
                  id="security-notifications"
                  checked={notifications.security}
                  onCheckedChange={(checked) => handleNotificationChange("security", checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="course-updates" className="flex-1">
                  {t("courseUpdates")}
                  <p className="text-sm text-muted-foreground">{t("receiveCourseUpdates")}</p>
                </Label>
                <Switch
                  id="course-updates"
                  checked={notifications.courseUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("courseUpdates", checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>{t("savePreferences")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Conta */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("accountSettings")}</CardTitle>
              <CardDescription>{t("manageYourAccountDetails")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="language">{t("language")}</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder={t("selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="pt">Português (PT)</SelectItem>
                    <SelectItem value="br">Português (BR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timezone">{t("timezone")}</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder={t("selectTimezone")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input id="password" type="password" value="••••••••" disabled />
                <Button variant="link" className="justify-start px-0 text-sm">
                  {t("changePassword")}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                {t("deleteAccount")}
              </Button>
              <Button>{t("saveSettings")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
