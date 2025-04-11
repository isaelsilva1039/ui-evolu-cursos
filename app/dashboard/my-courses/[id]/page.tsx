"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Play, CheckCircle, Clock, Download, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation } from "@/hooks/use-translation"

// Dados de exemplo para o curso
const courseSample = {
  id: "1",
  title: "Introduction to Web Development",
  description:
    "Learn the basics of HTML, CSS, and JavaScript to build your first website. This comprehensive course covers everything from setting up your development environment to deploying your first web application.",
  instructor: "Sarah Johnson",
  totalModules: 5,
  totalLessons: 24,
  totalDuration: "12h 30m",
  progress: 65,
  modules: [
    {
      id: "m1",
      title: "Getting Started with Web Development",
      description: "Learn the basics and set up your development environment",
      lessons: [
        {
          id: "l1",
          title: "Introduction to the Course",
          duration: "10:30",
          completed: true,
          type: "video",
        },
        {
          id: "l2",
          title: "Setting Up Your Development Environment",
          duration: "15:45",
          completed: true,
          type: "video",
        },
        {
          id: "l3",
          title: "Web Development Overview",
          duration: "12:20",
          completed: true,
          type: "video",
        },
        {
          id: "l4",
          title: "Module Quiz",
          duration: "10:00",
          completed: true,
          type: "quiz",
        },
      ],
    },
    {
      id: "m2",
      title: "HTML Fundamentals",
      description: "Learn the structure of web pages with HTML",
      lessons: [
        {
          id: "l5",
          title: "HTML Document Structure",
          duration: "14:20",
          completed: true,
          type: "video",
        },
        {
          id: "l6",
          title: "HTML Elements and Attributes",
          duration: "18:30",
          completed: true,
          type: "video",
        },
        {
          id: "l7",
          title: "Forms and Input Elements",
          duration: "20:15",
          completed: true,
          type: "video",
        },
        {
          id: "l8",
          title: "Semantic HTML",
          duration: "16:40",
          completed: false,
          type: "video",
        },
        {
          id: "l9",
          title: "HTML Practice Project",
          duration: "30:00",
          completed: false,
          type: "project",
        },
        {
          id: "l10",
          title: "Module Quiz",
          duration: "15:00",
          completed: false,
          type: "quiz",
        },
      ],
    },
    {
      id: "m3",
      title: "CSS Styling",
      description: "Learn how to style your web pages with CSS",
      lessons: [
        {
          id: "l11",
          title: "Introduction to CSS",
          duration: "12:45",
          completed: false,
          type: "video",
        },
        {
          id: "l12",
          title: "Selectors and Properties",
          duration: "18:20",
          completed: false,
          type: "video",
        },
        {
          id: "l13",
          title: "Box Model and Layout",
          duration: "22:10",
          completed: false,
          type: "video",
        },
        {
          id: "l14",
          title: "Responsive Design",
          duration: "25:30",
          completed: false,
          type: "video",
        },
        {
          id: "l15",
          title: "CSS Practice Project",
          duration: "45:00",
          completed: false,
          type: "project",
        },
      ],
    },
    {
      id: "m4",
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript programming",
      lessons: [
        {
          id: "l16",
          title: "Introduction to JavaScript",
          duration: "15:20",
          completed: false,
          type: "video",
        },
        {
          id: "l17",
          title: "Variables and Data Types",
          duration: "18:45",
          completed: false,
          type: "video",
        },
        {
          id: "l18",
          title: "Functions and Control Flow",
          duration: "22:30",
          completed: false,
          type: "video",
        },
        {
          id: "l19",
          title: "DOM Manipulation",
          duration: "28:15",
          completed: false,
          type: "video",
        },
        {
          id: "l20",
          title: "JavaScript Practice Project",
          duration: "50:00",
          completed: false,
          type: "project",
        },
      ],
    },
    {
      id: "m5",
      title: "Building Your First Website",
      description: "Apply everything you've learned to build a complete website",
      lessons: [
        {
          id: "l21",
          title: "Project Planning",
          duration: "20:10",
          completed: false,
          type: "video",
        },
        {
          id: "l22",
          title: "Building the HTML Structure",
          duration: "35:20",
          completed: false,
          type: "video",
        },
        {
          id: "l23",
          title: "Styling with CSS",
          duration: "40:15",
          completed: false,
          type: "video",
        },
        {
          id: "l24",
          title: "Adding Interactivity with JavaScript",
          duration: "45:30",
          completed: false,
          type: "video",
        },
      ],
    },
  ],
}

export default function CoursePage() {
  const { t } = useTranslation()
  const params = useParams()
  const id = params.id as string

  // Estado para controlar a lição atual
  const [currentLessonId, setCurrentLessonId] = useState("l1")
  // Estado para controlar o modo de tela cheia
  const [isFullscreen, setIsFullscreen] = useState(false)
  // Estado para controlar a visibilidade do menu lateral
  const [sidebarVisible, setSidebarVisible] = useState(true)

  // Encontrar a lição atual
  const currentModule = courseSample.modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === currentLessonId),
  )

  const currentLesson = currentModule?.lessons.find((lesson) => lesson.id === currentLessonId)

  // Função para alternar o modo de tela cheia
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  // Função para alternar a visibilidade do menu lateral
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarVisible ? "w-80" : "w-0"
        } transition-all duration-300 ease-in-out bg-card border-r overflow-hidden`}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">{courseSample.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Progresso: {courseSample.progress}%</span>
            <Progress value={courseSample.progress} className="w-24" />
          </div>
        </div>
        <Accordion type="single" collapsible className="px-4">
          {courseSample.modules.map((module) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  <span>{module.title}</span>
                  <span className="text-xs text-muted-foreground">
                    ({module.lessons.filter((l) => l.completed).length}/{module.lessons.length})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonId(lesson.id)}
                      className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${
                        currentLessonId === lesson.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span className="text-sm">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{lesson.duration}</span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <Play className="w-16 h-16 mx-auto mb-4" />
              <p>Clique para iniciar a lição</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{currentLesson?.title}</h2>
                <p className="text-muted-foreground">
                  Módulo: {currentModule?.title} • Duração: {currentLesson?.duration}
                </p>
              </div>
              <Button variant="outline" size="icon" onClick={toggleSidebar}>
                {sidebarVisible ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Baixar Material
              </Button>
              <Button>
                <CheckCircle className="w-4 h-4 mr-2" />
                Marcar como Concluído
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
