import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface TimelineScrubberProps {
  currentYear: number
  onYearChange: (year: number) => void
  startYear: number
  endYear: number
}

export default function TimelineScrubber({
  currentYear,
  onYearChange,
  startYear,
  endYear
}: TimelineScrubberProps) {
  const [isDragging, setIsDragging] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  const totalYears = endYear - startYear
  const progress = (currentYear - startYear) / totalYears

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return

    const rect = timelineRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const newYear = Math.round(startYear + percentage * totalYears)
    
    onYearChange(newYear)
  }

  const handleClick = (event: React.MouseEvent) => {
    if (!timelineRef.current) return

    const rect = timelineRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const newYear = Math.round(startYear + percentage * totalYears)
    
    onYearChange(newYear)
  }

  const years = Array.from({ length: totalYears + 1 }, (_, i) => startYear + i)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-4">
        <motion.div
          className="inline-block text-3xl font-bold text-white bg-purple-600 px-4 py-2 rounded-lg"
          key={currentYear}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {currentYear}
        </motion.div>
      </div>

      <div
        ref={timelineRef}
        className="relative h-16 bg-gray-800 rounded-full cursor-pointer"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-y-0 left-0 bg-purple-600 rounded-full h-full transition-all duration-300"
             style={{ width: `${progress * 100}%` }} />
        
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing"
          style={{ left: `${progress * 100}%`, marginLeft: '-12px' }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />

        <div className="absolute -bottom-8 left-0 right-0 flex justify-between">
          {years.map((year) => (
            <div key={year} className="text-sm text-gray-400 font-medium">
              {year}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}