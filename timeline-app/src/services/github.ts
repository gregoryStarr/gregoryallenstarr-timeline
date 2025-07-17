interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  topics: string[]
  fork: boolean
}

interface GitHubLanguages {
  [key: string]: number
}

const GITHUB_API_BASE = 'https://api.github.com'

export class GitHubService {
  private username: string
  private cache = new Map<string, any>()
  private cacheExpiry = 5 * 60 * 1000 // 5 minutes

  constructor(username: string) {
    this.username = username
  }

  private async fetchWithCache<T>(url: string): Promise<T> {
    const cacheKey = url
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data
    }

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }
      
      const data = await response.json()
      this.cache.set(cacheKey, { data, timestamp: Date.now() })
      return data
    } catch (error) {
      console.error('GitHub API fetch error:', error)
      throw error
    }
  }

  async getUserRepos(): Promise<GitHubRepo[]> {
    const url = `${GITHUB_API_BASE}/users/${this.username}/repos?sort=created&direction=asc&per_page=100`
    return this.fetchWithCache<GitHubRepo[]>(url)
  }

  async getOrgRepos(orgName: string): Promise<GitHubRepo[]> {
    const url = `${GITHUB_API_BASE}/orgs/${orgName}/repos?sort=created&direction=asc&per_page=100`
    return this.fetchWithCache<GitHubRepo[]>(url)
  }

  async getRepoLanguages(owner: string, repoName: string): Promise<GitHubLanguages> {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repoName}/languages`
    return this.fetchWithCache<GitHubLanguages>(url)
  }

  async getRepoDetails(owner: string, repoName: string): Promise<GitHubRepo> {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repoName}`
    return this.fetchWithCache<GitHubRepo>(url)
  }

  extractTechnologies(languages: GitHubLanguages, topics: string[] = []): string[] {
    const techs = new Set<string>()
    
    // Add primary languages
    Object.keys(languages).forEach(lang => techs.add(lang))
    
    // Add topics as technologies
    topics.forEach(topic => {
      // Convert common topic patterns to display names
      const techMap: Record<string, string> = {
        'reactjs': 'React',
        'nodejs': 'Node.js',
        'typescript': 'TypeScript',
        'javascript': 'JavaScript',
        'nextjs': 'Next.js',
        'tailwindcss': 'Tailwind CSS',
        'mongodb': 'MongoDB',
        'postgresql': 'PostgreSQL',
        'docker': 'Docker',
        'kubernetes': 'Kubernetes'
      }
      
      const displayName = techMap[topic.toLowerCase()] || topic
      techs.add(displayName)
    })
    
    return Array.from(techs).slice(0, 6) // Limit to 6 technologies
  }
}

export const githubService = new GitHubService('gregoryStarr')