"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Leaf, Mail, Lock, User } from 'lucide-react'

export default function SignUpPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [error, setError] = useState('')

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!fullName || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.')
            return
        }
        if (!agreeTerms) {
            setError('You must agree to the Terms of Service and Privacy Policy.')
            return
        }
        console.log('Creating account with:', { fullName, email, password })
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-stone-900 text-white p-4">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/assets/images/plant-hd.jpg')" }}></div>
            <div className="relative w-full max-w-md">
                <div className="bg-black/40 backdrop-blur-lg border border-stone-800 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
                            <Leaf className="h-8 w-8 text-amber-500" />
                            <span className="text-3xl font-serif font-light text-white">AayuFind</span>
                        </Link>
                        <h1 className="text-3xl font-serif font-light tracking-tight text-stone-100 mt-2">Create an Account</h1>
                        <p className="text-sm text-stone-400 mt-2">Join our community to identify and learn about medicinal plants.</p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSignUp} className="space-y-6">
                        {/* ... form content remains the same ... */}
                        <div className="relative">
                            <label htmlFor="fullName" className="sr-only">Full Name</label>
                            <User className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-stone-500" />
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-3 bg-stone-800/50 border border-stone-700 rounded-lg placeholder-stone-500 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <Mail className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-stone-500" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 bg-stone-800/50 border border-stone-700 rounded-lg placeholder-stone-500 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <Lock className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-stone-500" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 bg-stone-800/50 border border-stone-700 rounded-lg placeholder-stone-500 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <Lock className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-stone-500" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full pl-12 pr-4 py-3 bg-stone-800/50 border border-stone-700 rounded-lg placeholder-stone-500 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="h-4 w-4 mt-1 rounded border-stone-600 bg-stone-800 text-amber-600 focus:ring-amber-500"
                            />
                            <label htmlFor="terms" className="text-sm text-stone-400">
                                I agree to the{' '}
                                <Link href="/terms" className="font-medium text-amber-500 hover:text-amber-400">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="font-medium text-amber-500 hover:text-amber-400">
                                    Privacy Policy
                                </Link>
                                .
                            </label>
                        </div>
                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-amber-500 transition-all"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-stone-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-amber-500 hover:text-amber-400 transition">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}