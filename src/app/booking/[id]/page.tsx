'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Calendar, Clock, FileText, User, Users, ArrowLeft, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createBooking } from '@/src/controllers/bookingController'

export default function BookingPage() {
    const params = useParams()
    const router = useRouter()
    const roomId = params.id as string

    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        start_time: '',
        end_time: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateTime = () => {
        if (!form.start_time || !form.end_time) {
            return "Start time dan End time wajib diisi"
        }

        const start = new Date(form.start_time)
        const end = new Date(form.end_time)
        const now = new Date()

        if (start < now) {
            return "Start time tidak boleh di masa lalu"
        }

        if (end <= start) {
            return "End time harus setelah Start time"
        }

        const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
        if (diffMinutes < 30) {
            return "Durasi meeting minimal 30 menit"
        }

        return null
    }

    const validateForm = () => {
        if (!form.name.trim()) return "Nama wajib diisi"
        if (!form.title.trim()) return "Judul meeting wajib diisi"
        if (!form.description.trim()) return "Deskripsi meeting wajib diisi"
        if (!form.start_time) return "Start time wajib diisi"
        if (!form.end_time) return "End time wajib diisi"

        const start = new Date(form.start_time)
        const end = new Date(form.end_time)
        const now = new Date()

        if (start < now) return "Start time tidak boleh di masa lalu"
        if (end <= start) return "End time harus setelah Start time"

        const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
        if (diffMinutes < 30) return "Durasi meeting minimal 30 menit"

        return null
    }

    const handleSubmit = async () => {
        const validationError = validateForm()

        if (validationError) {
            setError(validationError)
            return
        }

        setError(null)
        setIsSubmitting(true)

        try {
            await createBooking({
                room_id: roomId,
                ...form,
            })

            alert("🎉 Booking berhasil dibuat!")

            setForm({
                name: "",
                title: "",
                description: "",
                start_time: "",
                end_time: "",
            })

        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        router.back()
    }

    const [error, setError] = useState<string | null>(null)

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header dengan background pattern */}
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl -rotate-1"></div>
                    <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <button
                            onClick={handleBack}
                            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors mb-6 group"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Rooms
                        </button>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <Building2 className="w-6 h-6" />
                                    <span className="text-sm font-semibold">MEETING ROOM</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Book Your Space
                                </h1>
                                <p className="text-gray-700 mt-2">Secure your ideal meeting room for productive collaboration</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg">
                                <p className="text-sm opacity-90">Room ID</p>
                                <p className="text-xl font-bold tracking-wider">{roomId}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                                        <p className="text-gray-700 text-sm">Fill in your meeting information</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                                            <User className="w-4 h-4 mr-2 text-gray-600" />
                                            Your Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full border-2 border-gray-300 rounded-xl p-4 pl-11 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all group-hover:border-blue-400"
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                            />
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Title Field */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                                            <FileText className="w-4 h-4 mr-2 text-gray-600" />
                                            Meeting Title
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Weekly Team Sync"
                                                className="w-full border-2 border-gray-300 rounded-xl p-4 pl-11 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all group-hover:border-blue-400"
                                                value={form.title}
                                                onChange={e => setForm({ ...form, title: e.target.value })}
                                            />
                                            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Description Field */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                                            <Users className="w-4 h-4 mr-2 text-gray-600" />
                                            Description & Agenda
                                        </label>
                                        <textarea
                                            placeholder="Brief agenda, participants, and special requirements..."
                                            className="w-full border-2 border-gray-300 rounded-xl p-4 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[120px] resize-none group-hover:border-blue-400"
                                            value={form.description}
                                            onChange={e => setForm({ ...form, description: e.target.value })}
                                        />
                                    </div>

                                    {/* Time Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                                                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                                                Start Time
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="datetime-local"
                                                    className="w-full border-2 border-gray-300 rounded-xl p-4 bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none group-hover:border-blue-400"
                                                    value={form.start_time}
                                                    onChange={e => setForm({ ...form, start_time: e.target.value })}
                                                />
                                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                                                <Clock className="w-4 h-4 mr-2 text-purple-600" />
                                                End Time
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="datetime-local"
                                                    className="w-full border-2 border-gray-300 rounded-xl p-4 bg-white text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none group-hover:border-purple-400"
                                                    value={form.end_time}
                                                    onChange={e => setForm({ ...form, end_time: e.target.value })}
                                                />
                                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                {error && (
                                    <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                                        ⚠️ {error}
                                    </div>
                                )}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`mt-10 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 ${isSubmitting ? 'shadow-lg' : ''
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Calendar className="w-5 h-5" />
                                            Confirm Booking
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="space-y-6">
                        {/* Preview Card */}
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-4">Booking Preview</h3>
                            <div className="space-y-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <p className="text-sm opacity-90">Room ID</p>
                                    <p className="font-bold text-lg">{roomId}</p>
                                </div>
                                {form.name && (
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                        <p className="text-sm opacity-90">Organizer</p>
                                        <p className="font-semibold">{form.name}</p>
                                    </div>
                                )}
                                {form.title && (
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                        <p className="text-sm opacity-90">Meeting Title</p>
                                        <p className="font-semibold">{form.title}</p>
                                    </div>
                                )}
                                {form.start_time && (
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                        <p className="text-sm opacity-90">Start Time</p>
                                        <p className="font-semibold">{new Date(form.start_time).toLocaleString()}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                Booking Tips
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-gray-800">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Book at least 30 minutes before your meeting</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-800">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Include agenda for better preparation</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-800">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Check room capacity for your attendees</span>
                                </li>
                            </ul>
                        </div>

                        {/* Room Features */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-xl">
                            <h4 className="font-bold text-white mb-4">Room Features</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-800/80 rounded-lg p-3 text-center hover:bg-gray-800 transition-colors">
                                    <div className="text-blue-300 mb-1 text-lg">🖥️</div>
                                    <p className="text-xs text-gray-200 font-medium">Smart Display</p>
                                </div>
                                <div className="bg-gray-800/80 rounded-lg p-3 text-center hover:bg-gray-800 transition-colors">
                                    <div className="text-blue-300 mb-1 text-lg">🎤</div>
                                    <p className="text-xs text-gray-200 font-medium">Audio System</p>
                                </div>
                                <div className="bg-gray-800/80 rounded-lg p-3 text-center hover:bg-gray-800 transition-colors">
                                    <div className="text-blue-300 mb-1 text-lg">📶</div>
                                    <p className="text-xs text-gray-200 font-medium">High-speed WiFi</p>
                                </div>
                                <div className="bg-gray-800/80 rounded-lg p-3 text-center hover:bg-gray-800 transition-colors">
                                    <div className="text-blue-300 mb-1 text-lg">🔌</div>
                                    <p className="text-xs text-gray-200 font-medium">Multiple Ports</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}