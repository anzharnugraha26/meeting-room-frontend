'use client'
import { useEffect, useState } from 'react'
import { Room } from '../models/roomModel'
import { CalendarClock, MapPin, Users, Wifi } from 'lucide-react'

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then((data) => {
        setRooms(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meeting Spaces
          </h1>
          <p className="text-gray-600 mt-2">Discover your perfect workspace for collaboration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rooms.map(room => {
            const statusColor = room.realtime_status === 'available' 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-rose-100 text-rose-800'
            
            return (
              <div 
                key={room.id} 
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={room.image_link}
                    alt={room.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusColor}`}>
                      {room.realtime_status === 'available' ? 'Available' : 'Booked'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{room.name}</h2>
                    <Wifi className="w-5 h-5 text-blue-500" />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{room.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">{room.capacity} people</span>
                    </div>
                  </div>
                  
                  {room.next_booking_start && (
                    <div className="pt-5 border-t border-gray-100">
                      <div className="flex items-center text-gray-700">
                        <CalendarClock className="w-4 h-4 mr-2 text-rose-500" />
                        <div>
                          <p className="text-sm font-semibold">Next booking</p>
                          <p className="text-sm text-gray-500">
                            {new Date(room.next_booking_start).toLocaleString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                    Book Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        {rooms.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4 text-6xl">🏢</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No rooms available</h3>
            <p className="text-gray-500">Check back later for new meeting spaces</p>
          </div>
        )}
      </div>
    </main>
  )
}