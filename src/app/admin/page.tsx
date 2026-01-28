"use client"

import { getBookings, updateBookingStatus } from "@/src/controllers/bookingController"
import { Booking } from "@/src/models/bookingModel"
import { useEffect, useState } from "react"
import {
    CheckCircle,
    Clock,
    AlertCircle,
    RefreshCw,
    Building2,
    User,
    Calendar,
    FileText,
    ChevronRight,
    MoreVertical,
    Eye,
    CheckSquare,
    XCircle,
    TrendingUp,
    Filter,
    Search,
    Download,
    Users
} from "lucide-react"

export default function AdminBookingTablePage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        completed: 0
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        calculateStats()
    }, [bookings])

    const fetchData = async () => {
        setLoading(true)
        try {
            const data = await getBookings()
            setBookings(data)
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = () => {
        const stats = {
            total: bookings.length,
            pending: bookings.filter(b => b.status === "pending").length,
            approved: bookings.filter(b => b.status === "approved").length,
            rejected: bookings.filter(b => b.status === "rejected").length,
            completed: bookings.filter(b => b.status === "completed").length
        }
        setStats(stats)
    }

    const handleUpdateStatus = async (id: string, status: string) => {
        await updateBookingStatus(id, status)
        fetchData()
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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Approved</span>
                    </div>
                )
            case "pending":
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold">Pending</span>
                    </div>
                )
            case "rejected":
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Rejected</span>
                    </div>
                )
            case "completed":
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        <CheckSquare className="w-4 h-4" />
                        <span className="text-sm font-semibold">Completed</span>
                    </div>
                )
            default:
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full border border-gray-200">
                        <span className="text-sm font-semibold capitalize">{status}</span>
                    </div>
                )
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved": return "text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
            case "pending": return "text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100"
            case "rejected": return "text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100"
            case "completed": return "text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100"
            default: return "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
        }
    }

    const formatDateTime = (date: string | Date) => {
        return new Date(date).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-10 w-80 bg-gray-200 rounded-xl mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm h-24"></div>
                            ))}
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm h-96"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Booking Management
                            </h1>
                            <p className="text-gray-600 mt-2">Admin dashboard for managing room reservations</p>
                        </div>

                        <div className="flex items-center gap-4">
                            
                            <button
                                onClick={fetchData}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-500">Total</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                            <p className="text-sm text-gray-500 mt-1">Total Bookings</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                </div>
                                <span className="text-sm text-gray-500">Pending</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                            <p className="text-sm text-gray-500 mt-1">Awaiting Review</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                </div>
                                <span className="text-sm text-gray-500">Approved</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
                            <p className="text-sm text-gray-500 mt-1">Confirmed</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <CheckSquare className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-500">Completed</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                            <p className="text-sm text-gray-500 mt-1">Finished</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-rose-50 rounded-lg">
                                    <XCircle className="w-5 h-5 text-rose-600" />
                                </div>
                                <span className="text-sm text-gray-500">Rejected</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
                            <p className="text-sm text-gray-500 mt-1">Declined</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search bookings..."
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 rounded-xl transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <select
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 rounded-xl appearance-none transition-all"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="completed">Completed</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 rotate-90 pointer-events-none" />
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Users className="w-4 h-4" />
                                </div>
                                <span>Showing <span className="font-semibold">{filteredBookings.length}</span> of {bookings.length} bookings</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Room & Booker</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Meeting Details</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Schedule</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr
                                            key={booking.id}
                                            className="hover:bg-gray-50/50 transition-colors group"
                                        >
                                            <td className="p-4">
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 bg-blue-50 rounded-lg">
                                                            <Building2 className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{booking.rooms.name}</p>
                                                            <p className="text-sm text-gray-500">{booking.rooms.location}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-700">{booking.name}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-start gap-2">
                                                        <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{booking.title}</p>
                                                            {booking.description && (
                                                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                                                    {booking.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-purple-500" />
                                                        <div className="text-sm">
                                                            <p className="font-medium text-gray-900">{formatDateTime(booking.start_time)}</p>
                                                            <p className="text-gray-500 mt-1">to {formatDateTime(booking.end_time)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {getStatusBadge(booking.status)}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    {booking.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdateStatus(booking.id, "approved")}
                                                                className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors font-semibold text-sm flex items-center gap-2"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(booking.id, "rejected")}
                                                                className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors font-semibold text-sm flex items-center gap-2"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {booking.status === "approved" && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(booking.id, "completed")}
                                                            className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors font-semibold text-sm flex items-center gap-2"
                                                        >
                                                            <CheckSquare className="w-4 h-4" />
                                                            Mark Complete
                                                        </button>
                                                    )}
                                                    <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center">
                                            <div className="flex flex-col items-center justify-center py-12">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <FileText className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                                                <p className="text-gray-500 mb-6">
                                                    {searchTerm || statusFilter !== "all"
                                                        ? "Try adjusting your search or filter criteria"
                                                        : "There are no bookings to display"}
                                                </p>
                                                {(searchTerm || statusFilter !== "all") && (
                                                    <button
                                                        onClick={() => {
                                                            setSearchTerm("")
                                                            setStatusFilter("all")
                                                        }}
                                                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-semibold text-sm"
                                                    >
                                                        Clear Filters
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination/Footer */}
                <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Status Legend:</span>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                <span>Pending</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                <span>Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>Completed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                                <span>Rejected</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="font-medium">Last updated: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}