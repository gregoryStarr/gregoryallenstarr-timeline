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
      className="bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group"
      whileHover={{ y: -4, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-4">
        <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-white ${typeColors[project.type]} uppercase tracking-wide`}>
          {project.type.replace('-', ' ')}
        </div>
        <div className="flex space-x-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors p-1 hover:bg-slate-700 rounded"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors p-1 hover:bg-slate-700 rounded"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-300 transition-colors leading-tight">{project.title}</h3>
      <p className="text-slate-300 text-xs sm:text-sm mb-2 sm:mb-4 leading-relaxed line-clamp-2">{project.description}</p>

      <div className="flex items-center justify-between text-slate-400 text-xs mb-2 sm:mb-4">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1 text-blue-400" />
          <span className="font-medium">
            {project.startDate} {project.endDate && `— ${project.endDate}`}
          </span>
        </div>
        
        {(project.stars !== undefined || project.forks !== undefined) && (
          <div className="flex items-center space-x-3">
            {project.stars !== undefined && (
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow-400" />
                <span className="font-medium">{project.stars}</span>
              </div>
            )}
            {project.forks !== undefined && (
              <div className="flex items-center">
                <GitFork className="w-3 h-3 mr-1 text-slate-400" />
                <span className="font-medium">{project.forks}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded hover:bg-slate-600 hover:text-blue-300 transition-colors"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs font-medium rounded">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>
    </motion.div>
  )
}