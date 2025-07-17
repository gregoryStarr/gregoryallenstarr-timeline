import { useState } from 'react'
import TimelineScrubber from './components/TimelineScrubber'
import ProjectCard from './components/ProjectCard'
import { useGitHubData } from './hooks/useGitHubData'

function App() {
  const [currentYear, setCurrentYear] = useState(2025)
  const [useGitHubDataMode, setUseGitHubDataMode] = useState(false)
  const { projects: githubProjects, loading, error, fetchData } = useGitHubData()

  const projects = [
    {
      id: 1,
      title: "High-Security Enterprise Platform",
      description: "Modular React components for enterprise platform within micro frontend architecture at RAPP",
      technologies: ["React", "TypeScript", "Micro Frontends", "Redux", "Zustand"],
      startDate: "2023-09",
      endDate: undefined,
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/rapp-enterprise-platform"
    },
    {
      id: 2,
      title: "Army Client Internal Tool",
      description: "Vue.js-based secure data visualization and workflow management system for government client",
      technologies: ["Vue.js", "Vuex", "D3.js", "Jest", "Cypress"],
      startDate: "2024-03",
      endDate: "2024-08",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/army-data-visualization"
    },
    {
      id: 3,
      title: "AI Multi-Agent Document Analysis",
      description: "Custom LangChain agents for research, classification, and lead generation with RAG pipelines",
      technologies: ["LangChain", "RAG", "Vector Search", "React", "WebAssembly"],
      startDate: "2024-01",
      endDate: undefined,
      type: "personal" as const,
      githubUrl: "https://github.com/gregoryStarr/langchain-rag-agents"
    },
    {
      id: 4,
      title: "StarrIT Consulting Projects",
      description: "Scalable React-based frontend systems and micro frontend patterns for startups and mid-market clients",
      technologies: ["React", "Vue.js", "Design Systems", "Micro Frontends", "Accessibility"],
      startDate: "2017-01",
      endDate: "2023-10",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/starrit-portfolio"
    },
    {
      id: 5,
      title: "GLG Company-Wide Design System",
      description: "Built and maintained design system powering multiple micro-apps used by thousands globally",
      technologies: ["React", "TypeScript", "Storybook", "Design Systems", "Micro Apps"],
      startDate: "2018-09",
      endDate: "2021-12",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/glg-component-library"
    },
    {
      id: 6,
      title: "SeniorAdvisor Frontend Re-architecture",
      description: "Led migration from Rails monolith to decoupled microservices with React modules",
      technologies: ["React", "Microservices", "Rails", "MobX", "Modular Architecture"],
      startDate: "2016-10",
      endDate: "2018-01",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/microservices-migration"
    },
    {
      id: 7,
      title: "Trim Agency Mobile/Web Solutions",
      description: "Frontend solutions for mobile and web using React, MobX, and modular UI strategies",
      technologies: ["React", "MobX", "Mobile Web", "Modular UI", "Performance"],
      startDate: "2015-01",
      endDate: "2017-01",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/mobile-web-framework"
    },
    {
      id: 8,
      title: "Wishclouds Responsive SPAs",
      description: "Built responsive single-page applications using Backbone.js optimized for performance and UX",
      technologies: ["Backbone.js", "JavaScript", "Responsive Design", "Performance"],
      startDate: "2014-01",
      endDate: "2014-12",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/backbone-spa-framework"
    },
    {
      id: 9,
      title: "ISO Cloud-Based Enterprise Interfaces",
      description: "Delivered cloud-based interfaces with Flex and Backbone.js for enterprise clients",
      technologies: ["Adobe Flex", "Backbone.js", "Cloud Interfaces", "Enterprise"],
      startDate: "2009-01",
      endDate: "2012-12",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/enterprise-cloud-ui"
    },
    {
      id: 10,
      title: "Yahoo! Maps Interactive Components",
      description: "Developed interactive mapping components using Adobe Flex and AJAX for Yahoo! Maps",
      technologies: ["Adobe Flex", "AJAX", "ActionScript", "Interactive Maps"],
      startDate: "2006-01",
      endDate: "2008-12",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/interactive-mapping-components"
    },
    {
      id: 11,
      title: "FriendFinder Live Video & Chat",
      description: "Led development of live video and chat features for interactive media experiences",
      technologies: ["ActionScript", "Flash", "Live Video", "Real-time Chat"],
      startDate: "2004-01",
      endDate: "2005-12",
      type: "work" as const,
      githubUrl: "https://github.com/gregoryStarr/live-video-chat-platform"
    },
    {
      id: 12,
      title: "Personal Timeline App",
      description: "Interactive timeline showcasing 20+ years of career progression with GitHub integration",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
      startDate: "2025-01",
      endDate: undefined,
      type: "personal" as const,
      githubUrl: "https://github.com/gregoryStarr/career-timeline-portfolio"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Gregory Allen Starr
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Interactive Career Timeline
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setUseGitHubDataMode(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !useGitHubDataMode 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Sample Projects
            </button>
            <button
              onClick={() => {
                setUseGitHubDataMode(true)
                fetchData()
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                useGitHubDataMode 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Live GitHub Data
            </button>
          </div>
        </header>

        <TimelineScrubber
          currentYear={currentYear}
          onYearChange={setCurrentYear}
          startYear={2010}
          endYear={2025}
        />

        {loading && useGitHubDataMode && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-gray-400 mt-2">Loading GitHub projects...</p>
          </div>
        )}

        {error && useGitHubDataMode && (
          <div className="text-center mt-8">
            <p className="text-red-400">Error loading GitHub data: {error}</p>
            <button 
              onClick={() => setUseGitHubDataMode(false)}
              className="mt-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Switch to Sample Projects
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {(useGitHubDataMode ? githubProjects : projects)
            .filter((project) => {
              const startYear = parseInt(project.startDate.split('-')[0])
              const endYear = project.endDate ? parseInt(project.endDate.split('-')[0]) : new Date().getFullYear()
              return currentYear >= startYear && currentYear <= endYear
            })
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>

        <div className="text-center mt-8 text-gray-400">
          <p>Showing projects active in {currentYear}</p>
          {useGitHubDataMode && (
            <p className="text-xs mt-1">Data fetched from GitHub API</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
