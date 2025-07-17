import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { motion } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface CareerLocation {
  city: string
  state: string
  coordinates: [number, number]
  startYear: number
  endYear: number
  companies: string[]
}

interface BackgroundMapProps {
  currentYear: number
}

const careerLocations: CareerLocation[] = [
  {
    city: "San Jose",
    state: "CA",
    coordinates: [37.3382, -121.8863],
    startYear: 2001,
    endYear: 2008,
    companies: ["FriendFinder Inc.", "Yahoo! Inc."]
  },
  {
    city: "Palm Coast",
    state: "FL", 
    coordinates: [29.5845, -81.2078],
    startYear: 2009,
    endYear: 2012,
    companies: ["ISO"]
  },
  {
    city: "Fort Lauderdale",
    state: "FL",
    coordinates: [26.1224, -80.1373],
    startYear: 2014,
    endYear: 2017,
    companies: ["Wishclouds.com", "Trim Agency"]
  },
  {
    city: "Austin",
    state: "TX",
    coordinates: [30.2672, -97.7431],
    startYear: 2016,
    endYear: 2025,
    companies: ["SeniorAdvisor.com", "GLG", "StarrIT LLC", "RAPP"]
  }
]

// Subtle marker for background map
const createSubtleMarker = () => {
  return L.divIcon({
    className: 'background-marker',
    html: `<div class="w-3 h-3 bg-blue-400/60 border border-blue-300/40 rounded-full shadow-sm"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })
}

export default function BackgroundMap({ currentYear }: BackgroundMapProps) {
  const mapRef = useRef<any>(null)

  // Find current location based on year
  const currentLocation = careerLocations.find(
    location => currentYear >= location.startYear && currentYear <= location.endYear
  ) || careerLocations[careerLocations.length - 1] // Default to Austin if no match


  // Center map on current location with smooth transition
  useEffect(() => {
    if (mapRef.current && currentLocation) {
      const map = mapRef.current
      if (map.setView) {
        // First snap to location instantly at a higher zoom level
        map.setView(currentLocation.coordinates, 6, { animate: false })
        
        // Then animate zoom in to city level after a brief delay
        setTimeout(() => {
          map.setZoom(14, {
            animate: true,
            duration: 3,
            easeLinearity: 0.1
          })
        }, 200)
      }
    }
  }, [currentLocation])

  return (
    <div className="fixed inset-0 z-0">
      <MapContainer
        center={currentLocation.coordinates}
        zoom={11}
        style={{ height: '100vh', width: '100vw' }}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        keyboard={false}
        ref={mapRef}
        className="opacity-80 grayscale-[0.2] brightness-90"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=''
          maxZoom={18}
          minZoom={3}
          keepBuffer={4}
          updateWhenIdle={false}
          updateWhenZooming={true}
          crossOrigin="anonymous"
        />
        
        {/* Show all locations with subtle markers */}
        {careerLocations.map((location) => (
          <Marker 
            key={`${location.city}-${location.state}`}
            position={location.coordinates}
            icon={createSubtleMarker()}
          />
        ))}
        
        {/* Highlight current location */}
        <Marker 
          position={currentLocation.coordinates}
          icon={L.divIcon({
            className: 'current-location-marker',
            html: `<div class="w-4 h-4 bg-blue-500/80 border-2 border-blue-300/60 rounded-full shadow-lg animate-pulse"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })}
        />
      </MapContainer>
      
      {/* Dark theme overlays for edge fading */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-slate-900/40 pointer-events-none"></div>
      
      {/* Subtle location indicator */}
      <motion.div 
        className="absolute top-6 right-6 bg-slate-800/60 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50"
        key={currentLocation.city}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-slate-300 text-xs font-medium">
          {currentLocation.city}, {currentLocation.state}
        </p>
      </motion.div>
    </div>
  )
}