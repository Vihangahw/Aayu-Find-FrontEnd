"use client"

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
    // ... faq data remains the same ...
    {
        question: "What is AayuFind?",
        answer: "AayuFind is a research project that uses a deep learning-based ensemble approach to accurately identify Sri Lankan Ayurvedic medicinal plants. Its goal is to bridge the gap between traditional herbal knowledge and modern technology by providing an accessible and reliable identification tool."
    },
    {
        question: "What problem does this project solve?",
        answer: "Many people, including non-specialists, struggle to accurately identify Ayurvedic medicinal plants. Misidentification can lead to ineffective treatments or health risks. AayuFind addresses the lack of an easily accessible, user-friendly, and accurate technological solution for plant identification."
    },
    {
        question: "What specific plants can AayuFind identify?",
        answer: "The initial research focuses on four key plants used in treating chronic conditions like Diabetes, High Cholesterol, and NAFLD: Heen Bovitiya (Osbeckia octandra), Yaki Naran (Atalantia ceylanica), Kowakka (Coccinia grandis), and Karapincha (Murraya koenigii)."
    },
    {
        question: "How does the technology work?",
        answer: "AayuFind uses a multi-stage process. First, an advanced image segmentation model (like UNet) isolates the plant leaf from its complex natural background. Then, an ensemble of multiple deep learning classifiers analyzes the leaf's features to determine the species with high accuracy."
    },
    {
        question: "Who is this project for?",
        answer: "The system is designed for a wide audience, including the general public, students, researchers, herbalists, and healthcare practitioners. It aims to make Ayurvedic knowledge more accessible to everyone, from experts to those with casual interest."
    },
    {
        question: "Is there a public dataset for these plants?",
        answer: "No, a major challenge of this research is the lack of publicly available, annotated datasets for these specific Sri Lankan Ayurvedic plants. Therefore, a key contribution of this project is the creation of a new, custom dataset from images captured in natural settings."
    },
]

const FAQItem = ({ faq, isOpen, onClick }: { faq: { question: string; answer: string }; isOpen: boolean; onClick: () => void; }) => {
    return (
        <div className="border-b border-stone-800">
            <button onClick={onClick} className="flex w-full items-center justify-between py-6 text-left">
                <h3 className="text-lg font-medium text-stone-100">{faq.question}</h3>
                <ChevronDown className={`h-5 w-5 text-amber-500 transform transition-transform duration-300 ${ isOpen ? 'rotate-180' : '' }`} />
            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${ isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0' }`}>
                <div className="overflow-hidden">
                    <p className="pb-6 text-base text-stone-400 leading-relaxed">{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <main className="min-h-screen bg-stone-900 text-white">
            <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
                {/* Page Header */}
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-serif font-light tracking-tight text-white sm:text-6xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-stone-300">
                        Have questions about our project? Find answers to common inquiries about AayuFind's technology, scope, and goals.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="mt-20 max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}