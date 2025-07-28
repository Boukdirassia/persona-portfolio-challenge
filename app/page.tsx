"use client"

import React from "react"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Moon,
  Sun,
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  MapPin,
  Code,
  Database,
  Server,
  Smartphone,
  Users,
  Target,
  Star,
  Award,
  Briefcase,
  Globe,
  Zap,
  Heart,
  Eye,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"

// Enhanced translations with more content
const translations = {
  en: {
    hero: {
      greeting: "Hello, I'm",
      name: "Ali Alaoui",
      title: "I Build Smart Solutions with Code & Culture",
      subtitle: "Project Manager • Full Stack Developer • Digital Innovator",
      location: "Based in Casablanca, Morocco",
      cta: "Explore My Journey",
      stats: {
        projects: "15+ Projects",
        experience: "5+ Years",
        clients: "Happy Clients",
      },
    },
    nav: {
      about: "About",
      skills: "Skills",
      education: "Education",
      projects: "Projects",
      experience: "Experience",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    about: {
      title: "Crafting Digital Excellence",
      subtitle: "Where Tradition Meets Innovation",
      quote: "Technology rooted in tradition leads to timeless innovation",
      description:
        "I'm a passionate IT Project Manager and Full Stack Developer who bridges the gap between cutting-edge technology and rich cultural heritage. With over 5 years of experience leading digital transformation projects, I specialize in creating solutions that are not only technically excellent but also culturally meaningful and user-centric.",
      mission: "My Mission",
      missionText:
        "To leverage technology as a force for positive change, creating digital solutions that honor tradition while embracing innovation.",
    },
    skills: {
      title: "Skills & Expertise",
      subtitle: "Mastering the Art of Digital Creation",
      technical: "Technical Arsenal",
      soft: "Leadership Qualities",
      tools: "Favorite Tools",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Transforming Ideas into Digital Reality",
      viewAll: "View All Projects",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
      caseStudy: "Case Study",
    },
    contact: {
      title: "Let's Create Something Extraordinary",
      subtitle: "Ready to bring your vision to life?",
      name: "Full Name",
      email: "Email Address",
      subject: "Project Subject",
      message: "Tell me about your project",
      send: "Send Message",
      availability: "Available for new projects",
    },
  },
  fr: {
    hero: {
      greeting: "Bonjour, je suis",
      name: "Ali Alaoui",
      title: "Je Construis des Solutions Intelligentes avec Code et Culture",
      subtitle: "Chef de Projet • Développeur Full Stack • Innovateur Digital",
      location: "Basé à Casablanca, Maroc",
      cta: "Découvrir Mon Parcours",
      stats: {
        projects: "15+ Projets",
        experience: "5+ Années",
        clients: "Clients Satisfaits",
      },
    },
    nav: {
      about: "À Propos",
      skills: "Compétences",
      education: "Formation",
      projects: "Projets",
      experience: "Expérience",
      testimonials: "Témoignages",
      contact: "Contact",
    },
    about: {
      title: "Créer l'Excellence Numérique",
      subtitle: "Où la Tradition Rencontre l'Innovation",
      quote: "La technologie enracinée dans la tradition mène à l'innovation intemporelle",
      description:
        "Je suis un Chef de Projet IT passionné et Développeur Full Stack qui fait le pont entre la technologie de pointe et le riche patrimoine culturel. Avec plus de 5 ans d'expérience dans la direction de projets de transformation numérique, je me spécialise dans la création de solutions techniquement excellentes, culturellement significatives et centrées sur l'utilisateur.",
      mission: "Ma Mission",
      missionText:
        "Utiliser la technologie comme force de changement positif, créant des solutions numériques qui honorent la tradition tout en embrassant l'innovation.",
    },
    skills: {
      title: "Compétences & Expertise",
      subtitle: "Maîtriser l'Art de la Création Numérique",
      technical: "Arsenal Technique",
      soft: "Qualités de Leadership",
      tools: "Outils Favoris",
    },
    projects: {
      title: "Projets Phares",
      subtitle: "Transformer les Idées en Réalité Numérique",
      viewAll: "Voir Tous les Projets",
      liveDemo: "Démo Live",
      sourceCode: "Code Source",
      caseStudy: "Étude de Cas",
    },
    contact: {
      title: "Créons Quelque Chose d'Extraordinaire",
      subtitle: "Prêt à donner vie à votre vision ?",
      name: "Nom Complet",
      email: "Adresse Email",
      subject: "Sujet du Projet",
      message: "Parlez-moi de votre projet",
      send: "Envoyer le Message",
      availability: "Disponible pour nouveaux projets",
    },
  },
}

// Refined Moroccan pattern component
const MoroccanPattern = React.memo(({ className = "", variant = "geometric" }) => {
  const patterns = {
    geometric: (
      <div
        className={`absolute inset-0 opacity-[0.03] ${className}`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px),
            linear-gradient(45deg, transparent 48%, currentColor 49%, currentColor 51%, transparent 52%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 80px 80px",
          backgroundPosition: "0 0, 20px 20px, 0 0",
        }}
      />
    ),
    zellige: (
      <div
        className={`absolute inset-0 opacity-[0.02] ${className}`}
        style={{
          backgroundImage: `
            polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%),
            polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />
    ),
  }

  return patterns[variant] || patterns.geometric
})

MoroccanPattern.displayName = "MoroccanPattern"

// Refined floating elements
const FloatingElements = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, 
              ${i % 3 === 0 ? "#38B2AC" : i % 3 === 1 ? "#8BA178" : "#B7791F"}, 
              ${i % 3 === 0 ? "#319795" : i % 3 === 1 ? "#718E71" : "#D4A843"})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
})

FloatingElements.displayName = "FloatingElements"

// Enhanced magnetic button
const MagneticButton = React.memo(({ children, className = "", variant = "default", ...props }) => {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const button = ref.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    button.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const button = ref.current
    if (!button) return
    button.style.transform = "translate(0px, 0px)"
  }, [])

  const variants = {
    default:
      "bg-gradient-to-r from-moroccan-teal-500 to-moroccan-sage-500 hover:from-moroccan-teal-600 hover:to-moroccan-sage-600 text-white shadow-lg hover:shadow-xl",
    primary:
      "bg-gradient-to-r from-moroccan-teal-600 to-moroccan-teal-700 hover:from-moroccan-teal-700 hover:to-moroccan-teal-800 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-moroccan-terracotta-500 to-moroccan-gold-500 hover:from-moroccan-terracotta-600 hover:to-moroccan-gold-600 text-white shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-moroccan-teal-500 text-moroccan-teal-600 hover:bg-moroccan-teal-500 hover:text-white bg-transparent",
  }

  return (
    <Button
      ref={ref}
      className={`transition-all duration-200 ease-out ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Button>
  )
})

MagneticButton.displayName = "MagneticButton"

// Loading animation
const LoadingAnimation = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-moroccan-teal-900 via-moroccan-sage-900 to-moroccan-terracotta-900 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-moroccan-gold-400 border-t-transparent rounded-full mx-auto mb-6"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Ali Alaoui
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-moroccan-gold-300 text-sm"
        >
          Crafting Digital Excellence
        </motion.p>
      </div>
    </motion.div>
  )
})

LoadingAnimation.displayName = "LoadingAnimation"

export default function Portfolio() {
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [darkMode, setDarkMode] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])

  const t = translations[language]

  const skills = useMemo(
    () => ({
      technical: [
        { name: "React/Next.js", level: 95, icon: <Code className="w-5 h-5" />, color: "from-blue-600 to-cyan-600" },
        {
          name: "Laravel/PHP",
          level: 90,
          icon: <Server className="w-5 h-5" />,
          color: "from-moroccan-terracotta-500 to-moroccan-terracotta-600",
        },
        {
          name: "MySQL/MongoDB",
          level: 85,
          icon: <Database className="w-5 h-5" />,
          color: "from-moroccan-sage-500 to-moroccan-sage-600",
        },
        {
          name: "Project Management",
          level: 98,
          icon: <Target className="w-5 h-5" />,
          color: "from-moroccan-teal-500 to-moroccan-teal-600",
        },
        {
          name: "Jira/Agile",
          level: 92,
          icon: <Users className="w-5 h-5" />,
          color: "from-moroccan-gold-500 to-moroccan-gold-600",
        },
        {
          name: "Mobile Development",
          level: 80,
          icon: <Smartphone className="w-5 h-5" />,
          color: "from-moroccan-burgundy-500 to-moroccan-burgundy-600",
        },
      ],
      soft: [
        { name: "Team Leadership", icon: <Users className="w-4 h-4" /> },
        { name: "Problem Solving", icon: <Zap className="w-4 h-4" /> },
        { name: "Adaptability", icon: <Globe className="w-4 h-4" /> },
        { name: "Communication", icon: <Heart className="w-4 h-4" /> },
        { name: "Innovation", icon: <Star className="w-4 h-4" /> },
        { name: "Cultural Bridge", icon: <Award className="w-4 h-4" /> },
      ],
    }),
    [],
  )

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Digital Booking System",
        subtitle: "Borcelle Studio",
        period: "2025–2026",
        role: "Project Manager",
        tech: ["Laravel", "ReactJS", "MySQL", "Jira"],
        description:
          "Revolutionary clinic reservation platform with AI-powered scheduling and real-time availability tracking.",
        impact: "40% reduction in booking errors, 25% increase in appointments",
        image: "/placeholder.svg?height=300&width=500&text=Digital+Booking+System",
        color: "from-moroccan-teal-600 to-moroccan-teal-700",
        featured: true,
      },
      {
        id: 2,
        title: "e-Learning Platform",
        subtitle: "Fauget Studio",
        period: "2024–2025",
        role: "Product Owner",
        tech: ["ReactJS", "Node.js", "MongoDB"],
        description: "Comprehensive learning management system with gamification and progress tracking.",
        impact: "35% faster onboarding, seamless HR integration",
        image: "/placeholder.svg?height=300&width=500&text=e-Learning+Platform",
        color: "from-moroccan-sage-600 to-moroccan-sage-700",
        featured: true,
      },
      {
        id: 3,
        title: "IT Ticketing System",
        subtitle: "Enterprise Solution",
        period: "2023–2024",
        role: "Implementation Lead",
        tech: ["Jira", "Slack", "Zapier"],
        description: "Automated IT support workflow with intelligent ticket routing and SLA monitoring.",
        impact: "50% faster resolution, 30% reduced backlog",
        image: "/placeholder.svg?height=300&width=500&text=IT+Ticketing+System",
        color: "from-moroccan-gold-600 to-moroccan-gold-700",
        featured: false,
      },
      {
        id: 4,
        title: "AWS Cloud Migration",
        subtitle: "Infrastructure Modernization",
        period: "2022–2023",
        role: "Technical Coordinator",
        tech: ["AWS", "Docker", "CI/CD"],
        description: "Zero-downtime migration to cloud infrastructure with automated deployment pipelines.",
        impact: "30% cost reduction, improved scalability",
        image: "/placeholder.svg?height=300&width=500&text=AWS+Cloud+Migration",
        color: "from-moroccan-terracotta-600 to-moroccan-terracotta-700",
        featured: false,
      },
    ],
    [],
  )

  const testimonials = useMemo(
    () => [
      {
        name: "Sarah Johnson",
        role: "CTO, TechCorp",
        content:
          "Ali's ability to bridge technical complexity with business needs is exceptional. His project management skills transformed our development process.",
        avatar: "/placeholder.svg?height=60&width=60&text=SJ",
        rating: 5,
      },
      {
        name: "Mohamed Benali",
        role: "CEO, Digital Solutions",
        content:
          "Working with Ali was a game-changer. His cultural understanding combined with technical expertise delivered results beyond our expectations.",
        avatar: "/placeholder.svg?height=60&width=60&text=MB",
        rating: 5,
      },
    ],
    [],
  )

  const filteredProjects = useMemo(
    () =>
      selectedFilter === "all"
        ? projects
        : projects.filter((project) =>
            project.tech.some((tech) => tech.toLowerCase().includes(selectedFilter.toLowerCase())),
          ),
    [projects, selectedFilter],
  )

  const allTechs = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tech))), [projects])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <AnimatePresence mode="wait">
        <LoadingAnimation />
      </AnimatePresence>

      {/* Enhanced Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-moroccan-cream-50 via-moroccan-cream-100 to-moroccan-teal-50 dark:from-gray-900 dark:via-moroccan-teal-900 dark:to-moroccan-sage-900">
        <MoroccanPattern className="text-moroccan-teal-600 dark:text-moroccan-teal-400" variant="geometric" />
        <FloatingElements />
      </div>

      {/* Refined Navigation */}
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-moroccan-teal-100/50 dark:border-gray-700/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold bg-gradient-to-r from-moroccan-teal-700 via-moroccan-sage-600 to-moroccan-terracotta-600 bg-clip-text text-transparent"
            >
              Ali Alaoui
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <motion.a
                  key={key}
                  href={`#${key}`}
                  whileHover={{ y: -2 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-moroccan-teal-600 dark:hover:text-moroccan-teal-400 font-medium transition-colors relative group text-sm"
                >
                  {value}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-moroccan-teal-600 to-moroccan-sage-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <Button
                  variant={language === "en" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                  className="rounded-full text-xs px-3 py-1 h-8"
                >
                  🇺🇸 EN
                </Button>
                <Button
                  variant={language === "fr" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("fr")}
                  className="rounded-full text-xs px-3 py-1 h-8"
                >
                  🇫🇷 FR
                </Button>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              {/* Download CV */}
              <MagneticButton variant="primary" className="px-4 py-2 rounded-full font-medium text-sm">
                <Download className="w-3 h-3 mr-2" />
                CV
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <motion.div style={{ y, opacity }} className="absolute inset-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-moroccan-teal-600 dark:text-moroccan-teal-400 font-medium"
              >
                {t.hero.greeting}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                <span className="bg-gradient-to-r from-moroccan-teal-700 via-moroccan-sage-600 to-moroccan-terracotta-600 bg-clip-text text-transparent">
                  {t.hero.name}
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light leading-relaxed"
              >
                {t.hero.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center space-x-3 text-moroccan-gold-600 dark:text-moroccan-gold-400"
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium text-lg">{t.hero.location}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton variant="primary" className="px-8 py-4 rounded-full text-lg font-medium">
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </MagneticButton>

                <MagneticButton variant="outline" className="px-8 py-4 rounded-full text-lg font-medium">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </MagneticButton>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                {[
                  { label: t.hero.stats.projects, value: "15+" },
                  { label: t.hero.stats.experience, value: "5+" },
                  { label: t.hero.stats.clients, value: "50+" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced Profile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Main Profile Image */}
                <motion.div whileHover={{ scale: 1.02 }} className="relative z-10">
                  <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                    {/* Decorative Border */}
                    <div
                      className="absolute inset-0 rounded-full border-4 border-dashed border-moroccan-gold-400/30 animate-spin"
                      style={{ animationDuration: "30s" }}
                    />
                    <div
                      className="absolute inset-2 rounded-full border-2 border-moroccan-teal-400/20 animate-spin"
                      style={{ animationDuration: "20s", animationDirection: "reverse" }}
                    />

                    {/* Profile Image Container */}
                    <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gradient-to-br from-moroccan-teal-100 to-moroccan-gold-100 dark:from-moroccan-teal-900 dark:to-moroccan-gold-900">
                      <Image
                        src="/ali-profile.png"
                        alt="Ali Alaoui - Professional headshot of IT Project Manager and Full Stack Developer"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-center"
                        priority
                        onError={(e) => {
                          e.currentTarget.src = "/ali-profile.png"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-moroccan-teal-900/20 via-transparent to-transparent" />
                    </div>

                    {/* Floating Badges */}
                    <motion.div
                      animate={{ y: [-8, 8, -8] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl border border-moroccan-teal-200 dark:border-gray-700"
                    >
                      <Code className="w-6 h-6 text-moroccan-teal-600" />
                    </motion.div>

                    <motion.div
                      animate={{ y: [8, -8, 8] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl border border-moroccan-gold-200 dark:border-gray-700"
                    >
                      <Target className="w-6 h-6 text-moroccan-gold-600" />
                    </motion.div>

                    <motion.div
                      animate={{ x: [-6, 6, -6] }}
                      transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
                      className="absolute top-1/2 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl border border-moroccan-sage-200 dark:border-gray-700"
                    >
                      <Users className="w-6 h-6 text-moroccan-sage-600" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Refined Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-3"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-moroccan-teal-600 dark:border-moroccan-teal-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "easeInOut" }}
                className="w-1.5 h-3 bg-moroccan-teal-600 dark:bg-moroccan-teal-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced About Section */}
      <section ref={aboutRef} id="about" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-moroccan-teal-50/80 dark:from-gray-800/80 dark:to-moroccan-teal-900/80" />
        <MoroccanPattern className="text-moroccan-teal-600 dark:text-moroccan-teal-400" variant="zellige" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t.about.title}</h2>
            <p className="text-2xl text-moroccan-teal-600 dark:text-moroccan-teal-400 font-medium mb-8">
              {t.about.subtitle}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-moroccan-teal-600 via-moroccan-sage-500 to-moroccan-terracotta-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <blockquote className="text-2xl lg:text-3xl italic text-gray-700 dark:text-gray-300 font-light leading-relaxed border-l-4 border-moroccan-teal-600 pl-6">
                "{t.about.quote}"
              </blockquote>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{t.about.description}</p>

              <div className="bg-gradient-to-r from-moroccan-teal-50 to-moroccan-gold-50 dark:from-moroccan-teal-900/20 dark:to-moroccan-gold-900/20 p-8 rounded-2xl border border-moroccan-teal-200 dark:border-moroccan-teal-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Star className="w-6 h-6 text-moroccan-teal-500 mr-3" />
                  {t.about.mission}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{t.about.missionText}</p>
              </div>
            </motion.div>

            {/* Right Content - Achievement Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: <Award className="w-7 h-7" />,
                  title: "Project Excellence",
                  desc: "15+ successful projects delivered on time and within budget",
                  color: "from-moroccan-teal-600 to-moroccan-teal-700",
                },
                {
                  icon: <Users className="w-7 h-7" />,
                  title: "Team Leadership",
                  desc: "Led cross-functional teams of 10+ developers and designers",
                  color: "from-moroccan-sage-600 to-moroccan-sage-700",
                },
                {
                  icon: <Globe className="w-7 h-7" />,
                  title: "Cultural Bridge",
                  desc: "Bridging global technology with local Moroccan insights",
                  color: "from-moroccan-gold-600 to-moroccan-gold-700",
                },
                {
                  icon: <Zap className="w-7 h-7" />,
                  title: "Innovation Focus",
                  desc: "Driving digital transformation across multiple industries",
                  color: "from-moroccan-terracotta-600 to-moroccan-terracotta-700",
                },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} text-white shadow-md`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{achievement.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section ref={skillsRef} id="skills" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-moroccan-gold-50 dark:from-gray-900 dark:to-moroccan-gold-900" />
        <MoroccanPattern className="text-moroccan-gold-600 dark:text-moroccan-gold-400" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t.skills.title}</h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">{t.skills.subtitle}</p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-moroccan-gold-600 via-moroccan-terracotta-500 to-moroccan-teal-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                {t.skills.technical}
              </h3>

              <div className="space-y-8">
                {skills.technical.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {skill.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Expert Level</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{skill.level}%</div>
                    </div>

                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-sm`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Soft Skills & Tools */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Soft Skills */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">{t.skills.soft}</h3>

                <div className="grid grid-cols-2 gap-6">
                  {skills.soft.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-moroccan-teal-500 to-moroccan-gold-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{skill.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tools Section */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t.skills.tools}</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {["VS Code", "Figma", "Docker", "Git", "Postman", "Slack", "Jira", "AWS"].map((tool, index) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:from-moroccan-teal-100 hover:to-moroccan-gold-100 dark:hover:from-moroccan-teal-900 dark:hover:to-moroccan-gold-900 transition-all duration-300 shadow-md"
                    >
                      {tool}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-moroccan-teal-50 dark:from-gray-800 dark:to-moroccan-teal-900" />
        <MoroccanPattern className="text-moroccan-teal-600 dark:text-moroccan-teal-400" variant="geometric" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t.projects.title}</h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12">{t.projects.subtitle}</p>

            {/* Enhanced Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter("all")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === "all"
                    ? "bg-gradient-to-r from-moroccan-teal-600 to-moroccan-terracotta-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-moroccan-teal-300 dark:hover:border-moroccan-teal-600"
                }`}
              >
                All Projects
              </motion.button>
              {allTechs.map((tech) => (
                <motion.button
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(tech)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === tech
                      ? "bg-gradient-to-r from-moroccan-gold-600 to-moroccan-terracotta-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-moroccan-gold-300 dark:hover:border-moroccan-gold-600"
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800">
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} - ${project.description}`}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-80`} />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-moroccan-gold-500 text-white font-medium px-3 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <MagneticButton size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                        <Eye className="w-4 h-4 mr-2" />
                        {t.projects.liveDemo}
                      </MagneticButton>
                      <MagneticButton
                        size="sm"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-gray-900"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        {t.projects.sourceCode}
                      </MagneticButton>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-moroccan-teal-600 group-hover:to-moroccan-terracotta-600 group-hover:bg-clip-text transition-all duration-300">
                          {project.title}
                        </h3>
                        <p className="text-moroccan-teal-600 dark:text-moroccan-teal-400 font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                      <Badge variant="outline" className="font-medium">
                        {project.period}
                      </Badge>
                    </div>

                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {project.role}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                    {/* Impact Highlight */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl mb-6 border border-green-200 dark:border-green-800">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-green-800 dark:text-green-300 mb-1">Impact</h4>
                          <p className="text-green-700 dark:text-green-400 text-sm">{project.impact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-medium bg-gray-100 dark:bg-gray-700 hover:bg-moroccan-teal-100 dark:hover:bg-moroccan-teal-900 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <MagneticButton size="sm" variant="primary" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t.projects.caseStudy}
                      </MagneticButton>
                      <MagneticButton size="sm" variant="outline" className="px-4">
                        <Github className="w-4 h-4" />
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <MagneticButton variant="default" className="px-8 py-4 text-lg font-medium rounded-full">
              {t.projects.viewAll}
              <ArrowRight className="w-5 h-5 ml-2" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-moroccan-teal-900 via-moroccan-sage-900 to-moroccan-terracotta-900" />
        <FloatingElements />
        <MoroccanPattern className="text-moroccan-gold-400" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">Client Testimonials</h2>
            <p className="text-2xl text-moroccan-gold-200 mb-8">What people say about working with me</p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-moroccan-gold-400 to-moroccan-terracotta-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-moroccan-gold-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl text-white mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={`${testimonial.name} - ${testimonial.role}`}
                    width={60}
                    height={60}
                    className="rounded-full border-3 border-moroccan-gold-400 shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-moroccan-gold-200">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-moroccan-gold-50 dark:from-gray-900 dark:to-moroccan-gold-900" />
        <MoroccanPattern className="text-moroccan-gold-600 dark:text-moroccan-gold-400" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t.contact.title}</h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">{t.contact.subtitle}</p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-moroccan-teal-600 via-moroccan-sage-500 to-moroccan-terracotta-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h3>

                {[
                  {
                    icon: <Mail className="w-6 h-6" />,
                    label: "Email",
                    value: "ali.alaoui@example.com",
                    color: "from-moroccan-teal-600 to-moroccan-teal-700",
                  },
                  {
                    icon: <Phone className="w-6 h-6" />,
                    label: "Phone",
                    value: "+212 6XX XXX XXX",
                    color: "from-moroccan-sage-600 to-moroccan-sage-700",
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    label: "Location",
                    value: "Casablanca, Morocco",
                    color: "from-moroccan-terracotta-600 to-moroccan-terracotta-700",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${contact.color} text-white shadow-lg`}>
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{contact.label}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 text-green-600 dark:text-green-400 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">{t.contact.availability}</span>
                  </div>

                  <div className="flex space-x-4">
                    <MagneticButton
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </MagneticButton>
                    <MagneticButton
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.contact.name}
                      </label>
                      <Input
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-moroccan-teal-500 dark:focus:border-moroccan-teal-400 transition-colors bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.contact.email}
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-moroccan-teal-500 dark:focus:border-moroccan-teal-400 transition-colors bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.subject}
                    </label>
                    <Input
                      placeholder="Web Development Project"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-moroccan-teal-500 dark:focus:border-moroccan-teal-400 transition-colors bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.message}
                    </label>
                    <Textarea
                      placeholder="I'd love to discuss a project with you..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-moroccan-teal-500 dark:focus:border-moroccan-teal-400 transition-colors bg-gray-50 dark:bg-gray-700 resize-none"
                    />
                  </div>

                  <MagneticButton variant="primary" className="w-full py-4 text-lg font-medium rounded-xl shadow-lg">
                    {t.contact.send}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </MagneticButton>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-16 bg-gradient-to-br from-gray-900 via-moroccan-teal-900 to-moroccan-gold-900 text-white overflow-hidden">
        <MoroccanPattern className="text-moroccan-gold-400" />
        <FloatingElements />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-moroccan-gold-400 to-moroccan-terracotta-500 bg-clip-text text-transparent mb-4">
                Ali Alaoui
              </h3>
              <p className="text-xl text-moroccan-gold-200 mb-6">Building the future, one project at a time</p>

              {/* Refined Casablanca Skyline */}
              <div className="relative h-16 mb-8 overflow-hidden">
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute bottom-0 left-0 w-full h-full"
                >
                  <svg viewBox="0 0 400 64" className="w-full h-full text-moroccan-gold-400 opacity-20">
                    <path
                      d="M0,64 L0,40 L20,40 L20,20 L40,20 L40,35 L60,35 L60,15 L80,15 L80,30 L100,30 L100,10 L120,10 L120,25 L140,25 L140,45 L160,45 L160,5 L180,5 L180,40 L200,40 L200,20 L220,20 L220,35 L240,35 L240,50 L260,50 L260,25 L280,25 L280,15 L300,15 L300,45 L320,45 L320,30 L340,30 L340,40 L360,40 L360,20 L380,20 L380,35 L400,35 L400,64 Z"
                      fill="currentColor"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="border-t border-white/20 pt-8"
            >
              <p className="text-moroccan-gold-200 text-sm">
                © {new Date().getFullYear()} Ali Alaoui. Made with <Heart className="w-4 h-4 inline text-red-400" /> in
                Casablanca, Morocco
              </p>
              <p className="text-moroccan-gold-300 text-xs mt-2">
                Bridging Technology & Tradition • Creating Digital Excellence
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
