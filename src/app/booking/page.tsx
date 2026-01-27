"use client"

import { getBookings } from "@/src/controllers/bookingController"
import { Booking } from "@/src/models/bookingModel"
import { useEffect, useState } from "react"


export default function BookingListPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getBookings()
      setBookings(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p className="p-6">Loading bookings...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">📋 Daftar Booking Ruangan</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-1">{booking.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              👤 {booking.name}
            </p>

            <p className="text-sm text-gray-600 mb-2">
              🏢 {booking.rooms.name} — {booking.rooms.location}
            </p>

            <p className="text-sm text-gray-600 mb-2">
              🕒 {new Date(booking.start_time).toLocaleString()} <br />
              sampai {new Date(booking.end_time).toLocaleString()}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              {booking.description}
            </p>

            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                booking.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}