import { useState, useEffect } from 'react'
import { githubService } from '../services/github'

interface GitHubProject {
  id: number
  title: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string
  type: 'work' | 'personal' | 'open-source'
  githubUrl: string
  liveUrl?: string
  stars: number
  forks: number
  language: string | null
}

export function useGitHubData() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGitHubData = async () => {
    try {
      setLoading(true)
      setError(null)

      const repos = await githubService.getUserRepos()
      
      // Filter out forks and focus on original repositories
      const originalRepos = repos.filter(repo => !repo.fork)
      
      const projectPromises = originalRepos.map(async (repo) => {
        try {
          const languages = await githubService.getRepoLanguages('gregoryStarr', repo.name)
          const technologies = githubService.extractTechnologies(languages, repo.topics)
          
          return {
            id: repo.id,
            title: repo.name.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            description: repo.description || 'No description available',
            technologies,
            startDate: new Date(repo.created_at).toISOString().slice(0, 7), // YYYY-MM format
            endDate: determineEndDate(repo.created_at, repo.updated_at),
            type: determineProjectType(repo.name, repo.topics),
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || undefined,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language
          } as GitHubProject
        } catch (err) {
          console.warn(`Error fetching data for ${repo.name}:`, err)
          return null
        }
      })

      const resolvedProjects = await Promise.all(projectPromises)
      const validProjects = resolvedProjects.filter(p => p !== null) as GitHubProject[]
      
      // Sort by creation date (oldest first to match timeline flow)
      validProjects.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      
      setProjects(validProjects)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data')
      console.error('GitHub data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Only fetch when explicitly called, not on mount
  useEffect(() => {
    if (loading) {
      fetchGitHubData()
    }
  }, [loading])

  return { projects, loading, error, fetchData: () => setLoading(true) }
}

function determineProjectType(repoName: string, topics: string[]): 'work' | 'personal' | 'open-source' {
  // Check topics for hints
  if (topics.includes('work') || topics.includes('enterprise')) return 'work'
  if (topics.includes('open-source') || topics.includes('library')) return 'open-source'
  
  // Check repo name patterns
  if (repoName.includes('lib') || repoName.includes('component')) return 'open-source'
  if (repoName.includes('portfolio') || repoName.includes('personal')) return 'personal'
  
  // Default to personal
  return 'personal'
}

function determineEndDate(createdAt: string, updatedAt: string): string | undefined {
  const created = new Date(createdAt)
  const updated = new Date(updatedAt)
  const now = new Date()
  
  // If last update was more than 1 year ago, consider project ended
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(now.getFullYear() - 1)
  
  if (updated < oneYearAgo) {
    return updated.toISOString().slice(0, 7)
  }
  
  // If project was created in the same year as last update, it's a short project
  if (created.getFullYear() === updated.getFullYear()) {
    return updated.toISOString().slice(0, 7)
  }
  
  // Recent activity - consider ongoing
  return undefined
}