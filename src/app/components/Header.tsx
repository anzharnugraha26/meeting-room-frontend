'use client'

import { Building2, Calendar, Search, User } from 'lucide-react'

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Building2 className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            MeetSpace
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            <Calendar className="inline w-4 h-4 mr-2" />
                            My Bookings
                        </a>

                    </nav>

                     
                </div>
            </div>
        </header>
    )
}