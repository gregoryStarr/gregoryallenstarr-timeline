import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Star, GitFork } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string
  type: 'work' | 'personal' | 'open-source'
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  stars?: number
  forks?: number
  language?: string | null
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const typeColors = {
    work: 'bg-blue-600',
    personal: 'bg-green-600',
    'open-source': 'bg-purple-600'
  }

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`px-2 py-1 rounded text-xs font-medium text-white ${typeColors[project.type]}`}>
          {project.type}
        </div>
        <div className="flex space-x-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

      <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {project.startDate} {project.endDate && `- ${project.endDate}`}
        </div>
        
        {(project.stars !== undefined || project.forks !== undefined) && (
          <div className="flex items-center space-x-2">
            {project.stars !== undefined && (
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1" />
                {project.stars}
              </div>
            )}
            {project.forks !== undefined && (
              <div className="flex items-center">
                <GitFork className="w-3 h-3 mr-1" />
                {project.forks}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}