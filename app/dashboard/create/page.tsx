"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  File,
  FilePlus,
  ImageIcon,
  Link,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"

// Tipo para módulo
interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

// Tipo para lição
interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "quiz" | "assignment"
  content: string
  videoUrl?: string
  duration: string
  description: string
}

export default function CreateCoursePage() {
  const { t } = useTranslation()
  const router = useRouter()

  // Estado para o curso
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [courseImage, setCourseImage] = useState<string | null>(null)
  const [courseCategory, setCourseCategory] = useState("")
  const [courseLevel, setCourseLevel] = useState("beginner")
  const [coursePrice, setCoursePrice] = useState("0")
  const [isPublished, setIsPublished] = useState(false)

  // Estado para módulos e lições
  const [modules, setModules] = useState<Module[]>([
    {
      id: "m1",
      title: "",
      description: "",
      lessons: [
        {
          id: "l1",
          title: "",
          type: "video",
          content: "",
          videoUrl: "",
          duration: "",
          description: "",
        },
      ],
    },
  ])

  // Estado para o módulo e lição atualmente selecionados
  const [activeModuleId, setActiveModuleId] = useState("m1")
  const [activeLessonId, setActiveLessonId] = useState("l1")

  // Encontrar o módulo e lição ativos
  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0]
  const activeLesson = activeModule?.lessons.find((l) => l.id === activeLessonId) || activeModule?.lessons[0]

  // Adicionar um novo módulo
  const addModule = () => {
    const newModuleId = `m${modules.length + 1}`
    const newLessonId = `l${new Date().getTime()}`

    const newModule: Module = {
      id: newModuleId,
      title: "",
      description: "",
      lessons: [
        {
          id: newLessonId,
          title: "",
          type: "video",
          content: "",
          videoUrl: "",
          duration: "",
          description: "",
        },
      ],
    }

    setModules([...modules, newModule])
    setActiveModuleId(newModuleId)
    setActiveLessonId(newLessonId)
  }

  // Adicionar uma nova lição ao módulo ativo
  const addLesson = () => {
    const newLessonId = `l${new Date().getTime()}`

    const updatedModules = modules.map((module) => {
      if (module.id === activeModuleId) {
        return {
          ...module,
          lessons: [
            ...module.lessons,
            {
              id: newLessonId,
              title: "",
              type: "video",
              content: "",
              videoUrl: "",
              duration: "",
              description: "",
            },
          ],
        }
      }
      return module
    })

    setModules(updatedModules)
    setActiveLessonId(newLessonId)
  }

  // Remover um módulo
  const removeModule = (moduleId: string) => {
    if (modules.length <= 1) return

    const updatedModules = modules.filter((module) => module.id !== moduleId)
    setModules(updatedModules)

    // Atualizar o módulo ativo se necessário
    if (moduleId === activeModuleId) {
      setActiveModuleId(updatedModules[0].id)
      setActiveLessonId(updatedModules[0].lessons[0].id)
    }
  }

  // Remover uma lição
  const removeLesson = (moduleId: string, lessonId: string) => {
    const module = modules.find((m) => m.id === moduleId)
    if (!module || module.lessons.length <= 1) return

    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
        }
      }
      return module
    })

    setModules(updatedModules)

    // Atualizar a lição ativa se necessário
    if (moduleId === activeModuleId && lessonId === activeLessonId) {
      const updatedModule = updatedModules.find((m) => m.id === moduleId)
      if (updatedModule) {
        setActiveLessonId(updatedModule.lessons[0].id)
      }
    }
  }

  // Atualizar o título do módulo
  const updateModuleTitle = (moduleId: string, title: string) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return { ...module, title }
      }
      return module
    })
    setModules(updatedModules)
  }

  // Atualizar a descrição do módulo
  const updateModuleDescription = (moduleId: string, description: string) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return { ...module, description }
      }
      return module
    })
    setModules(updatedModules)
  }

  // Atualizar uma lição
  const updateLesson = (moduleId: string, lessonId: string, field: keyof Lesson, value: string) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              return { ...lesson, [field]: value }
            }
            return lesson
          }),
        }
      }
      return module
    })
    setModules(updatedModules)
  }

  // Manipular o upload de imagem do curso
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCourseImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Salvar o curso
  const saveCourse = () => {
    // Aqui você implementaria a lógica para salvar o curso no backend
    console.log({
      title: courseTitle,
      description: courseDescription,
      image: courseImage,
      category: courseCategory,
      level: courseLevel,
      price: coursePrice,
      isPublished,
      modules,
    })

    // Redirecionar para a página de cursos
    router.push("/dashboard/courses")
  }

  // Mover módulo para cima
  const moveModuleUp = (index: number) => {
    if (index <= 0) return
    const newModules = [...modules]
    const temp = newModules[index]
    newModules[index] = newModules[index - 1]
    newModules[index - 1] = temp
    setModules(newModules)
  }

  // Mover módulo para baixo
  const moveModuleDown = (index: number) => {
    if (index >= modules.length - 1) return
    const newModules = [...modules]
    const temp = newModules[index]
    newModules[index] = newModules[index + 1]
    newModules[index + 1] = temp
    setModules(newModules)
  }

  // Mover lição para cima
  const moveLessonUp = (moduleIndex: number, lessonIndex: number) => {
    if (lessonIndex <= 0) return
    const newModules = [...modules]
    const module = newModules[moduleIndex]
    const temp = module.lessons[lessonIndex]
    module.lessons[lessonIndex] = module.lessons[lessonIndex - 1]
    module.lessons[lessonIndex - 1] = temp
    setModules(newModules)
  }

  // Mover lição para baixo
  const moveLessonDown = (moduleIndex: number, lessonIndex: number) => {
    const module = modules[moduleIndex]
    if (lessonIndex >= module.lessons.length - 1) return
    const newModules = [...modules]
    const temp = module.lessons[lessonIndex]
    module.lessons[lessonIndex] = module.lessons[lessonIndex + 1]
    module.lessons[lessonIndex + 1] = temp
    setModules(newModules)
  }

  // Buscar imagem aleatória do Unsplash
  const fetchRandomImage = async () => {
    try {
      const response = await fetch("https://source.unsplash.com/random/1200x800/?course,education,learning,teaching")
      if (response.ok) {
        setCourseImage(response.url)
      }
    } catch (error) {
      console.error("Error fetching random image:", error)
    }
  }

  // Buscar vídeo do YouTube
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return ""

    // Extrair ID do vídeo do YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }

    return url
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("createCourse")}</h1>
          <p className="text-muted-foreground">{t("createAndPublishYourCourse")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/courses")}>
            {t("cancel")}
          </Button>
          <Button onClick={saveCourse}>
            <Save className="mr-2 h-4 w-4" />
            {t("saveCourse")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">{t("courseDetails")}</TabsTrigger>
          <TabsTrigger value="curriculum">{t("curriculum")}</TabsTrigger>
          <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
        </TabsList>

        {/* Detalhes do Curso */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("basicInformation")}</CardTitle>
              <CardDescription>{t("provideBasicCourseInformation")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">{t("courseTitle")}</Label>
                  <Input
                    id="title"
                    placeholder={t("enterCourseTitle")}
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">{t("courseDescription")}</Label>
                  <Textarea
                    id="description"
                    placeholder={t("enterCourseDescription")}
                    rows={5}
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">{t("category")}</Label>
                  <Select value={courseCategory} onValueChange={setCourseCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder={t("selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="level">{t("level")}</Label>
                  <Select value={courseLevel} onValueChange={setCourseLevel}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder={t("selectLevel")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{t("beginner")}</SelectItem>
                      <SelectItem value="intermediate">{t("intermediate")}</SelectItem>
                      <SelectItem value="advanced">{t("advanced")}</SelectItem>
                      <SelectItem value="all-levels">{t("allLevels")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">{t("price")}</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("courseImage")}</CardTitle>
              <CardDescription>{t("uploadCourseImage")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-dashed">
                  {courseImage ? (
                    <div className="relative h-full w-full">
                      <img
                        src={courseImage || "/placeholder.svg"}
                        alt={courseTitle}
                        className="h-full w-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => setCourseImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <ImageIcon className="mb-4 h-10 w-10 text-muted-foreground" />
                      <p className="mb-2 text-sm font-medium">{t("dragAndDropImage")}</p>
                      <p className="text-xs text-muted-foreground">{t("recommendedSize")}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Label
                    htmlFor="image-upload"
                    className="flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    <Upload className="h-4 w-4" />
                    {t("uploadImage")}
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button variant="outline" onClick={fetchRandomImage}>
                    {t("getRandomImage")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currículo do Curso */}
        <TabsContent value="curriculum" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
            {/* Sidebar com módulos e lições */}
            <Card className="h-[calc(100vh-250px)]">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{t("modules")}</CardTitle>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-350px)]">
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {modules.map((module, moduleIndex) => (
                      <div
                        key={module.id}
                        className={`rounded-md border p-3 ${module.id === activeModuleId ? "border-primary bg-muted/50" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="flex-1 cursor-pointer font-medium"
                            onClick={() => {
                              setActiveModuleId(module.id)
                              if (module.lessons.length > 0) {
                                setActiveLessonId(module.lessons[0].id)
                              }
                            }}
                          >
                            {module.title || t("untitledModule")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveModuleUp(moduleIndex)}
                              disabled={moduleIndex === 0}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveModuleDown(moduleIndex)}
                              disabled={moduleIndex === modules.length - 1}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => removeModule(module.id)}
                              disabled={modules.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Lições do módulo */}
                        <div className="mt-2 space-y-1 pl-4">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm ${
                                lesson.id === activeLessonId && module.id === activeModuleId
                                  ? "bg-primary/10 font-medium"
                                  : ""
                              }`}
                              onClick={() => {
                                setActiveModuleId(module.id)
                                setActiveLessonId(lesson.id)
                              }}
                            >
                              {lesson.type === "video" && <Video className="h-3 w-3" />}
                              {lesson.type === "text" && <File className="h-3 w-3" />}
                              {lesson.type === "quiz" && <BookOpen className="h-3 w-3" />}
                              {lesson.type === "assignment" && <FilePlus className="h-3 w-3" />}
                              <span className="flex-1 truncate">{lesson.title || t("untitledLesson")}</span>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    moveLessonUp(moduleIndex, lessonIndex)
                                  }}
                                  disabled={lessonIndex === 0}
                                >
                                  <ChevronUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    moveLessonDown(moduleIndex, lessonIndex)
                                  }}
                                  disabled={lessonIndex === module.lessons.length - 1}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 text-destructive hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeLesson(module.id, lesson.id)
                                  }}
                                  disabled={module.lessons.length <= 1}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}

                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 w-full justify-start text-xs"
                            onClick={() => {
                              setActiveModuleId(module.id)
                              addLesson()
                            }}
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            {t("addLesson")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full" onClick={addModule}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("addModule")}
                </Button>
              </CardFooter>
            </Card>

            {/* Editor de módulo/lição */}
            <div className="space-y-6">
              {/* Editor de módulo */}
              {activeModule && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("moduleDetails")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="module-title">{t("moduleTitle")}</Label>
                      <Input
                        id="module-title"
                        placeholder={t("enterModuleTitle")}
                        value={activeModule.title}
                        onChange={(e) => updateModuleTitle(activeModule.id, e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="module-description">{t("moduleDescription")}</Label>
                      <Textarea
                        id="module-description"
                        placeholder={t("enterModuleDescription")}
                        rows={3}
                        value={activeModule.description}
                        onChange={(e) => updateModuleDescription(activeModule.id, e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Editor de lição */}
              {activeLesson && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("lessonDetails")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="lesson-title">{t("lessonTitle")}</Label>
                      <Input
                        id="lesson-title"
                        placeholder={t("enterLessonTitle")}
                        value={activeLesson.title}
                        onChange={(e) => updateLesson(activeModuleId, activeLesson.id, "title", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="lesson-type">{t("lessonType")}</Label>
                      <Select
                        value={activeLesson.type}
                        onValueChange={(value) =>
                          updateLesson(
                            activeModuleId,
                            activeLesson.id,
                            "type",
                            value as "video" | "text" | "quiz" | "assignment",
                          )
                        }
                      >
                        <SelectTrigger id="lesson-type">
                          <SelectValue placeholder={t("selectLessonType")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">{t("video")}</SelectItem>
                          <SelectItem value="text">{t("text")}</SelectItem>
                          <SelectItem value="quiz">{t("quiz")}</SelectItem>
                          <SelectItem value="assignment">{t("assignment")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {activeLesson.type === "video" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="video-url">{t("videoUrl")}</Label>
                          <div className="flex gap-2">
                            <Input
                              id="video-url"
                              placeholder="https://www.youtube.com/watch?v=..."
                              value={activeLesson.videoUrl || ""}
                              onChange={(e) =>
                                updateLesson(activeModuleId, activeLesson.id, "videoUrl", e.target.value)
                              }
                              className="flex-1"
                            />
                            <Button variant="outline" size="icon">
                              <Link className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">{t("supportedPlatforms")}</p>
                        </div>

                        {activeLesson.videoUrl && (
                          <div className="mt-4">
                            <Label>{t("videoPreview")}</Label>
                            <div className="mt-2 aspect-video w-full overflow-hidden rounded-md border">
                              <iframe
                                src={getYouTubeEmbedUrl(activeLesson.videoUrl)}
                                className="h-full w-full"
                                allowFullScreen
                                title={activeLesson.title || "Video preview"}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="lesson-duration">{t("duration")}</Label>
                      <Input
                        id="lesson-duration"
                        placeholder="HH:MM:SS"
                        value={activeLesson.duration}
                        onChange={(e) => updateLesson(activeModuleId, activeLesson.id, "duration", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="lesson-description">{t("lessonDescription")}</Label>
                      <Textarea
                        id="lesson-description"
                        placeholder={t("enterLessonDescription")}
                        rows={5}
                        value={activeLesson.description}
                        onChange={(e) => updateLesson(activeModuleId, activeLesson.id, "description", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="lesson-content">{t("lessonContent")}</Label>
                      <Textarea
                        id="lesson-content"
                        placeholder={t("enterLessonContent")}
                        rows={8}
                        value={activeLesson.content}
                        onChange={(e) => updateLesson(activeModuleId, activeLesson.id, "content", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Configurações do Curso */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("courseSettings")}</CardTitle>
              <CardDescription>{t("configureYourCourseSettings")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="published" className="flex flex-col space-y-1">
                  <span>{t("publishCourse")}</span>
                  <span className="font-normal text-sm text-muted-foreground">{t("publishCourseDescription")}</span>
                </Label>
                <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t("requirements")}</h3>
                <div className="rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${courseTitle ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-sm">{t("courseTitle")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${courseDescription ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-sm">{t("courseDescription")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${courseImage ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-sm">{t("courseImage")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${courseCategory ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-sm">{t("category")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          modules.some((m) => m.title && m.lessons.some((l) => l.title)) ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm">{t("atLeastOneModule")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard/courses")}>
                {t("cancel")}
              </Button>
              <Button onClick={saveCourse}>
                <Save className="mr-2 h-4 w-4" />
                {t("saveCourse")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
