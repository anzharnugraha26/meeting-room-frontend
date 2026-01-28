"use client"

import { getBookings } from "@/src/controllers/bookingController"
import { Booking } from "@/src/models/bookingModel"
import { useEffect, useState } from "react"
import {
    Calendar,
    Clock,
    User,
    Building,
    MapPin,
    FileText,
    CheckCircle,
    Clock as ClockIcon,
    AlertCircle,
    RefreshCw,
    
    ChevronRight,
    ExternalLink
} from 'lucide-react'

export default function BookingListPage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")

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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="w-4 h-4" />
            case "pending":
                return <ClockIcon className="w-4 h-4" />
            default:
                return <AlertCircle className="w-4 h-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-emerald-50 border-emerald-200 text-emerald-700"
            case "pending":
                return "bg-amber-50 border-amber-200 text-amber-700"
            case "cancelled":
                return "bg-rose-50 border-rose-200 text-rose-700"
            default:
                return "bg-gray-50 border-gray-200 text-gray-700"
        }
    }

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.rooms.name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "all" || booking.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const formatDateTime = (date: Date) => {
        return new Date(date).toLocaleString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatDuration = (start: Date, end: Date) => {
        const startTime = new Date(start)
        const endTime = new Date(end)
        const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
        return `${durationHours.toFixed(1)} jam`
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-10 w-64 bg-gray-200 rounded-xl mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm h-72"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
                    <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Occurred</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetchData}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Room Bookings
                            </h1>
                            <p className="text-gray-600 mt-2">Manage and track all your meeting room reservations</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={fetchData}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Filter Section - INI INPUT YANG SUDAH DIPERBAIKI */}
                    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search Input - VERSI TERBARU DENGAN WARNA JELAS */}
                            <div className="relative">
                                
                                <input
                                    type="text"
                                    placeholder="Search by title, name, or room..."
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 rounded-xl transition-all hover:border-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Status Filter - VERSI TERBARU DENGAN WARNA JELAS */}
                            <div className="relative">
                                 
                                <select
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 rounded-xl appearance-none transition-all hover:border-gray-400"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {/* <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 rotate-90 pointer-events-none" /> */}
                            </div>

                            {/* Stats */}
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                                <p className="text-sm text-blue-700 font-medium">Total Bookings</p>
                                <p className="text-2xl font-bold text-blue-900">{filteredBookings.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Grid */}
                {filteredBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Card Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-lg font-bold text-gray-900 truncate mb-1">
                                                {booking.title}
                                            </h2>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <User className="w-4 h-4" />
                                                <span className="text-sm truncate">{booking.name}</span>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(booking.status)}`}>
                                            {getStatusIcon(booking.status)}
                                            <span className="text-xs font-semibold capitalize">{booking.status}</span>
                                        </div>
                                    </div>

                                    {/* Room Info */}
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <Building className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">{booking.rooms.name}</p>
                                                <div className="flex items-center gap-1 text-gray-600 text-sm">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{booking.rooms.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Time Info */}
                                        {/* <div className="flex items-start gap-3">
                                            <div className="p-2 bg-purple-50 rounded-lg">
                                                <Clock className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm">
                                                    <p className="font-semibold text-gray-900">{formatDateTime(booking.start_time)}</p>
                                                    <p className="text-gray-500 mt-1">Duration: {formatDuration(booking.start_time, booking.end_time)}</p>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* Description */}
                                        {booking.description && (
                                            <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                                                <div className="p-2 bg-gray-50 rounded-lg">
                                                    <FileText className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-600 line-clamp-2">{booking.description}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-4 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>ID: {booking.id.slice(0, 8)}</span>
                                        </div>
                                        <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                            <span>View Details</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {searchTerm || statusFilter !== "all"
                                ? "Try adjusting your search or filter criteria"
                                : "You haven't made any room bookings yet"}
                        </p>
                        {(searchTerm || statusFilter !== "all") && (
                            <button
                                onClick={() => {
                                    setSearchTerm("")
                                    setStatusFilter("all")
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Footer Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Approved</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {bookings.filter(b => b.status === "approved").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded-lg">
                                <ClockIcon className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {bookings.filter(b => b.status === "pending").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Building className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Unique Rooms</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {[...new Set(bookings.map(b => b.rooms.name))].length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}