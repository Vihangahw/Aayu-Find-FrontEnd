"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, Menu, X } from 'lucide-react'

// Define the navigation links in an array for easier management
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/plants", label: "Plants" },
    { href: "/faq", label: "FAQ" },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false)
        }
    }, [pathname])

    // STYLING CHANGE: The border now only appears on scroll for a cleaner initial look.
    const navClass = isScrolled
        ? "bg-black/80 backdrop-blur-lg border-b border-stone-800"
        : "bg-transparent border-b border-transparent"

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navClass}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Leaf className="h-7 w-7 text-amber-500" />
                    <span className="text-2xl font-serif font-light text-white">AayuFind</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                                pathname === link.href ? 'text-amber-500' : 'text-stone-300'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-stone-300 transition-colors hover:text-amber-400"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/signup"
                        className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md shadow-md transition-all"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        <Menu className="h-6 w-6 text-white" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl transform transition-transform duration-300 md:hidden ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Leaf className="h-7 w-7 text-amber-500" />
                        <span className="text-2xl font-serif font-light text-white">AayuFind</span>
                    </Link>
                    <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center h-full -mt-16 space-y-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-2xl font-light transition-colors hover:text-amber-400 ${
                                pathname === link.href ? 'text-amber-500' : 'text-stone-300'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <hr className="w-1/2 border-stone-700" />
                    <Link
                        href="/login"
                        className="text-2xl font-light text-stone-300 transition-colors hover:text-amber-400"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/signup"
                        className="bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold px-8 py-3 rounded-md shadow-md transition-all"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    )
}