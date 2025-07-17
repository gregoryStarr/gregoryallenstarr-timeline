import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface TimelineScrubberProps {
  currentYear: number
  onYearChange: (year: number) => void
  startYear: number
  endYear: number
  careerYears?: number[]
}

export default function TimelineScrubber({
  currentYear,
  onYearChange,
  startYear,
  endYear,
  careerYears = []
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
    <div className="w-full mx-auto mb-4 sm:mb-8 md:max-w-5xl">
      <div className="text-center mb-3 sm:mb-6">
        <motion.div
          className="inline-flex items-center justify-center text-lg sm:text-3xl font-light text-white bg-slate-800 px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg border border-slate-700"
          key={currentYear}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="text-blue-400 font-medium">{currentYear}</span>
        </motion.div>
      </div>

      <div className="bg-slate-800 rounded-lg sm:rounded-xl p-2 sm:p-6 shadow-xl border border-slate-700">
        <div
          ref={timelineRef}
          className="relative h-3 bg-slate-700 rounded-full cursor-pointer group"
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full h-full transition-all duration-500 ease-out"
               style={{ width: `${progress * 100}%` }} />
          
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-3 border-blue-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing group-hover:border-indigo-400 transition-colors"
            style={{ left: `${progress * 100}%`, marginLeft: '-12px' }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          />

          <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 flex justify-between overflow-hidden">
            {years.map((year, index) => {
              const isCareerYear = careerYears.includes(year)
              const isImportantYear = index === 0 || index === years.length - 1 || year % 5 === 0
              const showOnMobile = index === 0 || index === years.length - 1 || year % 10 === 0 || isCareerYear
              
              return (
                <div key={year} className={`text-xs transition-colors ${
                  isCareerYear 
                    ? 'text-blue-300 font-bold' 
                    : isImportantYear
                      ? 'text-slate-300 font-medium' 
                      : 'text-slate-500 font-medium'
                } ${
                  showOnMobile ? 'block' : 'hidden sm:block'
                }`}>
                  {year}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}