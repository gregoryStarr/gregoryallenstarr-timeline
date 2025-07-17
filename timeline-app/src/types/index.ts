export interface Project {
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
}

export interface TimelineEvent {
  id: number
  title: string
  description: string
  date: string
  type: 'milestone' | 'project' | 'career'
}