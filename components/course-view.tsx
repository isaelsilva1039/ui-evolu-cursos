"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileText,
  PlayCircle,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Pause,
  Play,
  List,
  X,
  Expand,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useTranslation } from "@/hooks/use-translation"
import { toast } from "@/components/ui/use-toast"

export function CourseViewPage() {
  const { t } = useTranslation()
  const params = useParams()
  const courseId = params.id || params.courseId

  const [showSidebar, setShowSidebar] = useState(true)
  const [currentModule, setCurrentModule] = useState(0)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true })
  const [completedLessons, setCompletedLessons] = useState<Record<number, boolean>>({})
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoSize, setVideoSize] = useState<"normal" | "fullWidth">("normal")

  // Sample course data
  const course = {
    id: courseId,
    title: "Web Development Masterclass",
    progress: 35,
    modules: [
      {
        id: 1,
        title: "Introduction to Web Development",
        lessons: [
          {
            id: 1,
            title: "Welcome to the Course",
            type: "video",
            completed: true,
            duration: "5:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 2,
            title: "How the Web Works",
            type: "video",
            completed: true,
            duration: "12:45",
            videoUrl: "https://www.youtube.com/embed/3JluqTojuME",
          },
          {
            id: 3,
            title: "Setting Up Your Development Environment",
            type: "video",
            completed: false,
            duration: "18:30",
            videoUrl: "https://www.youtube.com/embed/ZxKM3DCV2kE",
          },
        ],
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        lessons: [
          {
            id: 4,
            title: "HTML Document Structure",
            type: "video",
            completed: false,
            duration: "14:15",
            videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
          },
          {
            id: 5,
            title: "Working with Text Elements",
            type: "video",
            completed: false,
            duration: "10:50",
            videoUrl: "https://www.youtube.com/embed/yTHTo28hwTQ",
          },
          {
            id: 6,
            title: "HTML Forms and Inputs",
            type: "video",
            completed: false,
            duration: "16:20",
            videoUrl: "https://www.youtube.com/embed/fNcJuPIZ2WE",
          },
          {
            id: 7,
            title: "HTML Quiz",
            type: "quiz",
            completed: false,
            duration: "15 mins",
          },
        ],
      },
      {
        id: 3,
        title: "CSS Basics",
        lessons: [
          {
            id: 8,
            title: "Introduction to CSS",
            type: "video",
            completed: false,
            duration: "11:40",
            videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
          },
          {
            id: 9,
            title: "Selectors and Properties",
            type: "video",
            completed: false,
            duration: "15:25",
            videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc",
          },
          {
            id: 10,
            title: "Box Model and Layout",
            type: "video",
            completed: false,
            duration: "18:10",
            videoUrl: "https://www.youtube.com/embed/rIO5326FgPE",
          },
          {
            id: 11,
            title: "CSS Assignment",
            type: "assignment",
            completed: false,
            duration: "1 hour",
          },
        ],
      },
    ],
  }

  const currentModuleData = course.modules[currentModule]
  const currentLessonData = currentModuleData.lessons[currentLesson]

  // Efeito para lidar com eventos de tela cheia
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const toggleVideoSize = () => {
    setVideoSize(videoSize === "normal" ? "fullWidth" : "normal")
  }

  const toggleModule = (moduleIndex: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex],
    }))
  }

  const expandAllModules = () => {
    const allExpanded: Record<number, boolean> = {}
    course.modules.forEach((_, index) => {
      allExpanded[index] = true
    })
    setExpandedModules(allExpanded)
  }

  const collapseAllModules = () => {
    setExpandedModules({})
  }

  const goToNextLesson = () => {
    if (currentLesson < currentModuleData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    } else if (currentModule < course.modules.length - 1) {
      setCurrentModule(currentModule + 1)
      setCurrentLesson(0)
      // Expand the next module

      setExpandedModules((prev) => ({
        ...prev,
        [currentModule + 1]: true,
      }))
    }
  }

  const goToPrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1)
      setCurrentLesson(course.modules[currentModule - 1].lessons.length - 1)
      // Expand the previous module
      setExpandedModules((prev) => ({
        ...prev,
        [currentModule - 1]: true,
      }))
    }
  }

  const selectLesson = (moduleIndex: number, lessonIndex: number) => {
    setCurrentModule(moduleIndex)
    setCurrentLesson(lessonIndex)
    // Ensure the module is expanded when selecting a lesson
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: true,
    }))
  }

  const markLessonAsCompleted = () => {
    const lessonId = currentModuleData.lessons[currentLesson].id
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: true,
    }))

    // Update the progress
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
    const completedCount = Object.keys(completedLessons).length + 1 // +1 for the current lesson
    const newProgress = Math.round((completedCount / totalLessons) * 100)

    // In a real app, you would save this to the server
    toast({
      title: t("lessonCompleted"),
      description: t("yourProgressHasBeenUpdated"),
    })
  }

  const isLessonCompleted = (lessonId: number) => {
    return completedLessons[lessonId] || currentModuleData.lessons.find((l) => l.id === lessonId)?.completed || false
  }

  const toggleFullscreen = () => {
    const videoContainer = document.getElementById("video-container")
    if (!videoContainer) return

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Note: In a real implementation, you would use the YouTube API to control the video
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // Note: In a real implementation, you would use the YouTube API to control the video
  }

  // Construir a URL do vídeo com parâmetros para esconder controles do YouTube
  const getVideoUrl = (url: string) => {
    // Adicionar parâmetros para esconder controles, informações e links relacionados
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}controls=0&rel=0&showinfo=0&modestbranding=1${isMuted ? "&mute=1" : ""}`
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-[#0f172a] text-white rounded-lg overflow-hidden border border-[#1e293b]">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
          <h2 className="text-lg font-bold">{course.title}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleVideoSize}
              className="border-[#1e293b] text-gray-300 hover:text-white hover:bg-[#1e293b]"
            >
              {videoSize === "fullWidth" ? <Minimize className="h-4 w-4 mr-2" /> : <Expand className="h-4 w-4 mr-2" />}
              {videoSize === "fullWidth" ? t("normalSize") : t("fullWidth")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSidebar}
              className="border-[#1e293b] text-gray-300 hover:text-white hover:bg-[#1e293b]"
            >
              {showSidebar ? <X className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
              {showSidebar ? t("hideCurriculum") : t("showCurriculum")}
            </Button>
          </div>
        </div>

        <div className={`flex-1 overflow-auto ${videoSize === "fullWidth" ? "px-0" : ""}`}>
          <div
            className={`${videoSize === "fullWidth" ? "w-full" : "max-w-[1000px] mx-auto"} ${videoSize === "fullWidth" ? "px-0" : "p-6"}`}
          >
            {/* Video Player */}
            {currentLessonData.type === "video" ? (
              <div id="video-container" className="relative bg-black w-full rounded-lg overflow-hidden">
                <div className="w-full">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      id="video-frame"
                      src={getVideoUrl(currentLessonData.videoUrl)}
                      title={currentLessonData.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <div className="flex items-center gap-1">
                        <Progress value={35} className="h-1 w-[200px] bg-gray-700" />
                        <span className="text-xs text-white">1:45 / 5:20</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={toggleFullscreen}
                        title={t("fullscreen")}
                      >
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentLessonData.type === "quiz" ? (
              <div className="space-y-6 border border-[#1e293b] rounded-lg p-6 bg-[#0a0f1c]">
                <h3 className="text-xl font-semibold">HTML Quiz</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium">1. {t("whatDoesHTMLStandFor")}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q1-a" name="q1" className="h-4 w-4" />
                        <label htmlFor="q1-a">Hyper Text Markup Language</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q1-b" name="q1" className="h-4 w-4" />
                        <label htmlFor="q1-b">High Tech Modern Language</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q1-c" name="q1" className="h-4 w-4" />
                        <label htmlFor="q1-c">Hyperlinks and Text Markup Language</label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">2. {t("whichTagIsUsedToCreateHyperlink")}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q2-a" name="q2" className="h-4 w-4" />
                        <label htmlFor="q2-a">&lt;link&gt;</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q2-b" name="q2" className="h-4 w-4" />
                        <label htmlFor="q2-b">&lt;a&gt;</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q2-c" name="q2" className="h-4 w-4" />
                        <label htmlFor="q2-c">&lt;href&gt;</label>
                      </div>
                    </div>
                  </div>

                  <Button onClick={markLessonAsCompleted} className="bg-blue-600 hover:bg-blue-700">
                    {t("submitQuiz")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 border border-[#1e293b] rounded-lg p-6 bg-[#0a0f1c]">
                <h3 className="text-xl font-semibold">CSS Assignment</h3>
                <p>{t("createResponsiveNavMenu")}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("displayHorizontallyOnDesktop")}</li>
                  <li>{t("stackVerticallyOnMobile")}</li>
                  <li>{t("includeHoverEffects")}</li>
                  <li>{t("haveHighlightedActiveState")}</li>
                </ul>
                <div className="space-y-2">
                  <p className="font-medium">{t("uploadYourSolution")}:</p>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="assignment"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#1e293b] rounded-lg cursor-pointer bg-[#0a0f1c] hover:bg-[#1e293b]"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">{t("clickToUpload")}</span> {t("orDragAndDrop")}
                        </p>
                        <p className="text-xs text-gray-500">HTML, CSS, {t("orZIPFiles")}</p>
                      </div>
                      <input id="assignment" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <Button onClick={markLessonAsCompleted} className="bg-blue-600 hover:bg-blue-700">
                  {t("submitAssignment")}
                </Button>
              </div>
            )}

            {/* Lesson Title */}
            {videoSize !== "fullWidth" && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold">{currentLessonData.title}</h2>
                <p className="text-gray-400 mt-1">
                  {t("module")} {currentModule + 1}: {currentModuleData.title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Navigation Footer */}
        <footer className="border-t border-[#1e293b] p-4 flex items-center justify-between bg-[#0a0f1c] sticky bottom-0 left-0 right-0 z-10">
          <Button
            variant="outline"
            onClick={goToPrevLesson}
            disabled={currentModule === 0 && currentLesson === 0}
            className="border-[#1e293b] text-gray-300 hover:text-white hover:bg-[#1e293b]"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t("previousLesson")}
          </Button>
          <div className="flex-1 text-center">
            {videoSize === "fullWidth" && (
              <div className="text-sm text-gray-400">
                {currentLessonData.title} - {t("module")} {currentModule + 1}: {currentModuleData.title}
              </div>
            )}
          </div>
          <Button
            variant="default"
            onClick={goToNextLesson}
            disabled={
              currentModule === course.modules.length - 1 &&
              currentLesson === course.modules[course.modules.length - 1].lessons.length - 1
            }
            className="bg-blue-600 hover:bg-blue-700"
          >
            {t("nextLesson")}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </footer>
      </div>

      {/* Course Content Sidebar (now on the right) */}
      {showSidebar && (
        <div className="w-[320px] bg-[#0a0f1c] border-l border-[#1e293b] flex flex-col">
          <div className="p-4 border-b border-[#1e293b]">
            <h2 className="text-lg font-bold">{course.title}</h2>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">
                  {course.progress}% {t("complete")}
                </span>
                <span className="text-xs text-gray-400">
                  {course.modules.reduce(
                    (acc, module) => acc + module.lessons.filter((l) => l.completed || isLessonCompleted(l.id)).length,
                    0,
                  )}
                  /{course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} {t("lessons")}
                </span>
              </div>
              <Progress value={course.progress} className="h-1 bg-gray-700" />
            </div>
          </div>

          <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
            <h3 className="font-medium">Course Content</h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={expandAllModules}
                title={t("expandAll")}
                className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-[#1e293b]"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={collapseAllModules}
                title={t("collapseAll")}
                className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-[#1e293b]"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {course.modules.map((module, moduleIndex) => (
                <Collapsible
                  key={module.id}
                  open={expandedModules[moduleIndex]}
                  onOpenChange={() => toggleModule(moduleIndex)}
                  className="overflow-hidden"
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#1e293b] rounded-md w-full text-left">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        <h3 className="font-medium text-sm">{module.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {module.lessons.length} {t("lessons")}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform flex-shrink-0 text-gray-400 ${
                            expandedModules[moduleIndex] ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-10 pr-2 py-1 space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          className={`flex items-center gap-2 w-full rounded-md p-2 text-left text-sm transition-colors ${
                            moduleIndex === currentModule && lessonIndex === currentLesson
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-[#1e293b]"
                          }`}
                          onClick={() => selectLesson(moduleIndex, lessonIndex)}
                        >
                          {lesson.completed || isLessonCompleted(lesson.id) ? (
                            <CheckCircle className="h-4 w-4 flex-shrink-0" />
                          ) : lesson.type === "video" ? (
                            <PlayCircle className="h-4 w-4 flex-shrink-0" />
                          ) : lesson.type === "quiz" ? (
                            <FileText className="h-4 w-4 flex-shrink-0" />
                          ) : (
                            <FileText className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="flex-1 break-words text-xs">{lesson.title}</span>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{lesson.duration}</span>
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
