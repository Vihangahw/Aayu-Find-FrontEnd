"use client"

import React, { useCallback, useRef, useState } from "react"
import type { Area } from "react-easy-crop"
import Cropper from "react-easy-crop"
import { Dialog, DialogActions, DialogContent, DialogTitle, Slider } from "@mui/material"
import {
  BookOpen,
  BotMessageSquare,
  Microscope,
  TestTube2,
  DatabaseZap,
  ScanSearch,
  BrainCircuit,
  Hand,
  LucideIcon
} from "lucide-react"
import getCroppedImg from "../utils/cropImage" // Assuming this utility function exists

// --- Content sourced from 'mentor first two chapters.docx' ---

const focusPlants = [
  {
    id: "heen-bovitiya",
    title: "Heen Bovitiya (Osbeckia octandra)",
    description:
        "A vital plant in traditional medicine, valued for its potential in managing chronic conditions like diabetes and liver ailments.",
    image: "/AayuFind-Heen-Bovitiya.png", // Placeholder image path
  },
  {
    id: "yakinaran",
    title: "Yaki Naran (Atalantia ceylanica)",
    description:
        "Used in remedies for high cholesterol and NAFLD. Its visual similarity to other species makes accurate identification crucial.",
    image: "/AayuFind-Yaki-Naran.png", // Placeholder image path
  },
  {
    id: "kowakka",
    title: "Kowakka (Coccinia grandis)",
    description:
        "Also known as Ivy Gourd, this plant is recognized for its therapeutic properties and is often considered a weed, highlighting the untapped potential in local flora.",
    image: "/AayuFind-Kowakka.png", // Placeholder image path
  },
  {
    id: "karapincha",
    title: "Karapincha (Murraya koenigii)",
    description:
        "Commonly used in daily cuisine and traditional medicine for its various health benefits, including managing cholesterol.",
    image: "/AayuFind-Karapincha.png", // Placeholder image path
  },
]

export default function HomePage() {
  // --- State and handlers from original page.tsx ---
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadMessage, setUploadMessage] = useState<string | null>(null)
  const [cropModalOpen, setCropModalOpen] = useState<boolean>(false)
  const [confidence, setConfidence] = useState<number | null>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClickUpload = () => fileInputRef.current?.click()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setCropModalOpen(true)
      setUploadMessage(null) // Reset message on new image
      setConfidence(null)
    }
  }

  const handleCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    if (!previewUrl || !croppedAreaPixels) return
    try {
      const croppedImageBlob = await getCroppedImg(previewUrl, croppedAreaPixels)
      setCroppedBlob(croppedImageBlob)
      const croppedUrl = URL.createObjectURL(croppedImageBlob)
      setPreviewUrl(croppedUrl)
      setCropModalOpen(false)
    } catch (e) {
      console.error(e)
    }
  }, [previewUrl, croppedAreaPixels])

  const handleUpload = async () => {
    if (!croppedBlob) {
      alert("Please select and crop the image before identifying.")
      return
    }

    const formData = new FormData()
    formData.append("file", croppedBlob, "cropped-leaf.png")
    setUploadMessage("Identifying plant, please wait...")

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        const plant = result.final_class || "Unknown"
        const conf = result.final_confidence || 0
        setConfidence(conf)
        setUploadMessage(`Identified as: ${plant}`)
      } else {
        setUploadMessage(`Upload Failed: ${result.detail || "Unknown error"}`)
        setConfidence(null)
      }
    } catch (error) {
      console.error("Error uploading:", error)
      setUploadMessage("Error connecting to the identification server.")
      setConfidence(null)
    }
  }

  const handleReset = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setUploadMessage(null)
    setCroppedBlob(null)
    setConfidence(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // --- JSX structure ---
  return (
      <main className="overflow-hidden bg-stone-900">
        {/* Hero Section with Integrated Plant Identifier */}
        <section
            className="relative min-h-screen flex items-center justify-center py-20"
            style={{ backgroundImage: "url('/assets/images/plant-hd.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-white">
                <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">AayuFind Project</span>
                <h1 className="text-5xl md:text-7xl font-serif font-light tracking-wide leading-tight my-6">
                  Ayurvedic Plant Recognition
                </h1>
                <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                  A deep learning solution to accurately identify Sri Lankan Ayurvedic medicinal plants used for chronic
                  diseases. This project bridges the gap between ancient wisdom and modern technology, addressing the
                  critical need for an accessible and reliable identification system.
                </p>
              </div>

              {/* AayuFind Identifier Component */}
              <div className="bg-stone-800/50 backdrop-blur-md border border-stone-700 rounded-lg p-8 text-center text-white shadow-2xl">
                <h2 className="text-2xl font-serif mb-4">Identify a Medicinal Plant</h2>
                <div
                    className="w-full h-64 border-2 border-dashed border-stone-500 rounded-lg flex items-center justify-center hover:bg-stone-700/50 transition cursor-pointer bg-cover bg-center"
                    style={{ backgroundImage: previewUrl ? `url(${previewUrl})` : "none" }}
                    onDrop={(e) => {
                      e.preventDefault()
                      const file = e.dataTransfer.files[0]
                      if (file) handleImageChange({ target: { files: [file] } } as any)
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={!previewUrl ? handleClickUpload : () => setCropModalOpen(true)}
                >
                  {!previewUrl && <p className="text-stone-400">Drag & Drop or Click to Upload an Image</p>}
                </div>

                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                {previewUrl && (
                    <div className="flex gap-4 mt-4">
                      <button
                          onClick={handleUpload}
                          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
                      >
                        Identify Plant
                      </button>
                      <button
                          onClick={handleReset}
                          className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition"
                      >
                        Reset
                      </button>
                    </div>
                )}

                {uploadMessage && (
                    <div className="mt-4 bg-black/50 text-white px-4 py-3 rounded-lg shadow-md text-left">
                      <p className="text-sm font-medium tracking-wide flex items-center">
                        <BotMessageSquare className="w-5 h-5 mr-2 text-green-400" />
                        <span className={confidence ? "text-green-300" : ""}>{uploadMessage}</span>
                      </p>
                      {confidence !== null && (
                          <>
                            <p className="text-xs text-stone-300 mt-1">Confidence: {(confidence * 100).toFixed(2)}%</p>
                            <progress value={confidence * 100} max="100" className="w-full h-1.5 mt-2 rounded-full" />
                          </>
                      )}
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-24 bg-stone-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">Our Approach</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light mt-3 mb-6">Bridging Gaps with Technology</h2>
              <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                This research overcomes key technical challenges to provide a reliable solution for practitioners,
                researchers, and the public.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                  icon={<Microscope />}
                  title="Advanced Image Segmentation"
                  description="Using a UNet model to isolate leaves from complex natural backgrounds, overcoming issues like shadows and overlapping foliage."
              />
              <FeatureCard
                  icon={<TestTube2 />}
                  title="Ensemble-Based Classification"
                  description="Combining multiple deep learning models to improve accuracy and handle the subtle visual similarities between plant species."
              />
              <FeatureCard
                  icon={<BookOpen />}
                  title="Custom Sri Lankan Dataset"
                  description="Building a new, annotated dataset of key Ayurvedic plants, as no public dataset currently exists for these species."
              />
            </div>
          </div>
        </section>

        {/* Focus Plants Section */}
        <section className="py-24 bg-stone-800/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 text-white">
              <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">Research Focus</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light mt-3 mb-6">Key Medicinal Plants</h2>
              <div className="h-px w-20 bg-amber-500 mx-auto mb-4"></div>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Our initial research focuses on four plants vital for treating chronic conditions like Diabetes, High
                Cholesterol, and NAFLD.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {focusPlants.map((plant) => (
                  <div
                      key={plant.id}
                      className="group block bg-stone-900/80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                          src={plant.image}
                          alt={plant.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-white mb-3 group-hover:text-amber-500 transition-colors">
                        {plant.title}
                      </h3>
                      <p className="text-stone-400 text-sm">{plant.description}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Start: New Research Challenges Section --- */}
        <section className="py-24 bg-stone-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 text-white">
              <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">Project Hurdles</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light mt-3 mb-6">Our Research Challenges</h2>
              <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
              <p className="text-lg text-stone-300 max-w-3xl mx-auto">
                Developing this solution requires addressing significant hurdles, from data acquisition to algorithmic
                precision.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ChallengeCard
                  Icon={DatabaseZap}
                  title="No Public Dataset"
                  description="No existing datasets are available for these specific Ayurvedic plants, forcing the research to begin from scratch."
              />
              <ChallengeCard
                  Icon={Hand}
                  title="Manual Data Creation"
                  description="A custom dataset of over 1,000 images must be manually collected and annotated, which is time-consuming and prone to human error."
              />
              <ChallengeCard
                  Icon={BrainCircuit}
                  title="Algorithm Selection"
                  description="Choosing the right combination of deep learning models to handle subtle visual differences is a complex, iterative process."
              />
              <ChallengeCard
                  Icon={ScanSearch}
                  title="Background Removal"
                  description="Effectively separating plant leaves from cluttered natural backgrounds (soil, branches, other plants) is computationally demanding."
              />
            </div>
          </div>
        </section>
        {/* --- End: New Research Challenges Section --- */}

        {/* Newsletter Signup Section */}
        <section className="py-24 bg-amber-50/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-stone-800/70 p-12 shadow-xl rounded-lg text-white">
                <div className="text-center mb-8">
                  <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">Stay Connected</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-light mt-3 mb-6">Follow Our Research</h2>
                  <div className="h-px w-20 bg-amber-500 mx-auto mb-6"></div>
                  <p className="text-stone-300 max-w-2xl mx-auto">
                    Subscribe to receive updates on our project milestones, dataset publications, and research findings.
                  </p>
                </div>
                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mt-8">
                  <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow px-4 py-3 rounded-md bg-stone-700/80 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                      type="submit"
                      className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-md transition"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Crop Modal (from original page.tsx) */}
        <Dialog open={cropModalOpen} onClose={() => setCropModalOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: "#292524", color: "white" }}>Crop Your Image</DialogTitle>
          <DialogContent sx={{ bgcolor: "#292524" }}>
            <div className="relative w-full h-96 bg-black">
              <Cropper
                  image={previewUrl!}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
              />
            </div>
            <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, z) => setZoom(z as number)}
                sx={{ color: "#f59e0b", mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#292524" }}>
            <button
                onClick={() => setCropModalOpen(false)}
                className="px-4 py-2 text-white/80 hover:text-white transition"
            >
              Cancel
            </button>
            <button
                onClick={showCroppedImage}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md transition"
            >
              Crop
            </button>
          </DialogActions>
        </Dialog>
      </main>
  )
}

// Helper component for feature cards to keep the code clean
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-stone-800/50 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
      <div className="flex justify-center items-center mb-4">
        <div className="bg-amber-600/20 text-amber-500 p-4 rounded-full">{icon}</div>
      </div>
      <h3 className="text-xl font-serif mb-3 text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
)

// Helper component for the new challenge cards
const ChallengeCard = ({ Icon, title, description }: { Icon: LucideIcon; title: string; description: string }) => (
    <div className="bg-stone-800/60 border border-stone-700/50 p-6 rounded-lg text-center">
      <div className="flex justify-center items-center mb-4">
        <div className="text-red-400">
          <Icon size={32} />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-stone-400 text-sm">{description}</p>
    </div>
)