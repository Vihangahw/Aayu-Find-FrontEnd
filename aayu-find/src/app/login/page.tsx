"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Leaf, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError('') 

        if (!email || !password) {
            setError('Please enter both email and password.')
            return
        }
        console.log('Logging in with:', { email, password })
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
                        <h1 className="text-3xl font-serif font-light tracking-tight text-stone-100 mt-2">Welcome Back</h1>
                        <p className="text-sm text-stone-400 mt-2">Log in to continue your research.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* ... form content remains the same ... */}
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
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 bg-stone-800/50 border border-stone-700 rounded-lg placeholder-stone-500 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                        </div>
                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-stone-600 bg-stone-800 text-amber-600 focus:ring-amber-500"
                                />
                                <label htmlFor="remember-me" className="text-stone-400">Remember me</label>
                            </div>
                            <Link href="/forgot-password" className="font-medium text-amber-500 hover:text-amber-400 transition">
                                Forgot password?
                            </Link>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-amber-500 transition-all"
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-stone-400">
                        Not a member yet?{' '}
                        <Link href="/signup" className="font-medium text-amber-500 hover:text-amber-400 transition">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}