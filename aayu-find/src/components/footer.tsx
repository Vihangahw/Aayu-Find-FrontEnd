import React from 'react'
import Link from 'next/link'
import { Leaf, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black text-stone-400">
            <div className="container mx-auto px-8 py-16">
                <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-4 md:gap-8 md:text-left">
                    {/* Column 1: About AayuFind */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Leaf className="h-7 w-7 text-amber-500" />
                            <span className="text-2xl font-serif font-light text-white">AayuFind</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-lg mx-auto md:mx-0">
                            A deep learning-based ensemble approach for the recognition of Ayurvedic medicinal plants. This project is submitted in partial fulfillment of the requirements for the BEng (Hons) Software Engineering degree.
                        </p>
                    </div>

                    {/* Column 2: Quick Links - UPDATED */}
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
                        <nav className="flex flex-col space-y-3 text-sm">
                            <Link href="/" className="hover:text-amber-500 transition">Home</Link>
                            <Link href="/about" className="hover:text-amber-500 transition">About</Link>
                            <Link href="/plants" className="hover:text-amber-500 transition">Plants</Link>
                            <Link href="/faq" className="hover:text-amber-500 transition">FAQ</Link>
                        </nav>
                    </div>

                    {/* Column 3: Academic Context */}
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Academic Context</h3>
                        <div className="text-sm space-y-3">
                            <p>
                                A project by <strong className="font-medium text-white">Mr. Vihanga Wijesinghe</strong>
                            </p>
                            <p>
                                Supervised by <strong className="font-medium text-white">Mr. Athindu Umayanga</strong>
                            </p>
                            <p>
                                Informatics Institute of Technology
                                <br />
                                <span className="text-xs text-stone-500">In Collaboration with the</span>
                                <br />
                                University of Westminster
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <hr className="my-8 border-stone-800" />
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Vihanga Wijesinghe. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <a href="#" className="hover:text-amber-500 transition" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="hover:text-amber-500 transition" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="hover:text-amber-500 transition" aria-label="Email">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}