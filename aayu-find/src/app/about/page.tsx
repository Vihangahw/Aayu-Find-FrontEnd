import React from 'react'
import { Microscope, BrainCircuit, DatabaseZap, ShieldCheck, Target } from 'lucide-react'

const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="bg-stone-800/50 p-6 rounded-lg text-center">
        <p className="text-4xl font-serif font-light text-amber-500">{value}</p>
        <p className="text-sm text-stone-400 mt-2">{label}</p>
    </div>
)

const TeamMemberCard = ({ name, role, avatar }: { name: string; role: string; avatar: string }) => (
    <div className="bg-stone-800/60 p-6 rounded-xl flex flex-col items-center text-center border border-stone-700/50">
        <img src={avatar} alt={name} className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-amber-600" />
        <h3 className="font-semibold text-lg text-white">{name}</h3>
        <p className="text-sm text-amber-500">{role}</p>
    </div>
)

export default function AboutPage() {
    return (
        <main className="bg-stone-900 text-white">
            {/* Hero Section */}
            <section className="relative py-32 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/plant-hd.jpg')" }}>
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl font-serif font-light tracking-tight md:text-6xl">About The AayuFind Project</h1>
                    <p className="mt-6 text-lg max-w-3xl mx-auto text-stone-300 leading-relaxed">
                        A deep learning-based ensemble approach for the recognition of Ayurvedic medicinal plants, designed to bridge the gap between ancient Sri Lankan wisdom and modern technology.
                    </p>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-base font-semibold tracking-widest uppercase text-amber-500">The Core Challenge</h2>
                        <p className="mt-3 text-4xl font-serif font-light text-white sm:text-5xl">Bridging a Critical Knowledge Gap</p>
                        <p className="mt-6 text-lg leading-8 text-stone-400">
                            Ayurvedic medicinal plants are a cornerstone of Sri Lanka’s traditional healthcare system. However, the ability to accurately identify these vital plants is often limited to expert practitioners.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                        <StatCard value="1,430" label="Medicinal Plant Species" />
                        <StatCard value="250+" label="Commonly Used Species" />
                        <StatCard value="174" label="Endemic (Unique) Plants" />
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="/AayuFind-Yaki-Naran.png" alt="Visually similar plant leaves" className="rounded-xl shadow-2xl" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-serif font-light text-white">Why Identification is Difficult</h3>
                            <ul className="mt-6 space-y-4 text-stone-300">
                                <li className="flex gap-4">
                                    <ShieldCheck className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    <span><strong>Risk of Misidentification:</strong> Many plants have visually similar non-medicinal or even toxic look-alikes, making misidentification a serious health risk.</span>
                                </li>
                                <li className="flex gap-4">
                                    <Target className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    <span><strong>Technical Hurdles:</strong> Automated identification is hampered by cluttered backgrounds, changing light, and overlapping leaves, which reduce the accuracy of standard models.</span>
                                </li>
                                <li className="flex gap-4">
                                    <DatabaseZap className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    <span><strong>Lack of Resources:</strong> A significant obstacle is the lack of structured, public datasets for these specific Sri Lankan plants, which limits automated tool development.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Solution Section */}
            <section className="py-24 bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-base font-semibold tracking-widest uppercase text-amber-500">Our Solution</h2>
                        <p className="mt-3 text-4xl font-serif font-light text-white sm:text-5xl">An AI-Powered Botanical Expert</p>
                        <p className="mt-6 text-lg leading-8 text-stone-400">
                            AayuFind aims to overcome these challenges by developing a scalable, user-friendly, and reliable AI-driven system capable of accurately classifying medicinal plants.
                        </p>
                    </div>
                    {/* ... rest of the section remains the same ... */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-stone-800/50 p-8 rounded-lg">
                            <DatabaseZap className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="text-xl font-serif text-white">Custom Dataset Creation</h3>
                            <p className="mt-2 text-sm text-stone-400">We are building a new dataset from scratch by capturing and manually annotating over 1,000 images of the target plants in their natural, complex environments.</p>
                        </div>
                        <div className="bg-stone-800/50 p-8 rounded-lg">
                            <Microscope className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="text-xl font-serif text-white">Advanced Image Segmentation</h3>
                            <p className="mt-2 text-sm text-stone-400">A UNet segmentation model is used to precisely isolate plant leaves, effectively removing distracting backgrounds to allow the classification model to focus only on key features.</p>
                        </div>
                        <div className="bg-stone-800/50 p-8 rounded-lg">
                            <BrainCircuit className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="text-xl font-serif text-white">Ensemble Classification</h3>
                            <p className="mt-2 text-sm text-stone-400">The system uses an ensemble of multiple deep learning models, such as EfficientNet and ResNet, which combines their strengths to achieve higher accuracy than any single model alone.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team & Academic Context */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-base font-semibold tracking-widest uppercase text-amber-500">Academic Context</h2>
                        <p className="mt-3 text-4xl font-serif font-light text-white sm:text-5xl">A University of Westminster Project</p>
                        <p className="mt-6 text-lg leading-8 text-stone-400">
                            This research is conducted at the Informatics Institute of Technology (IIT) in collaboration with the University of Westminster, UK, as part of the BEng (Hons) Software Engineering degree program.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <TeamMemberCard name="Mr. Vihanga Wijesinghe" role="Project Researcher" avatar="/AayuFind-Vihanga.JPG" />
                        <TeamMemberCard name="Mr. Athindu Umayanga" role="Project Supervisor" avatar="/AayuFind-Athindu.JPG" />
                    </div>
                </div>
            </section>
        </main>
    )
}