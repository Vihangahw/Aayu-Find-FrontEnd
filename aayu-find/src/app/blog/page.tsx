"use client"

import React, { useState, useEffect, useRef } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { BotMessageSquare } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  content: string
  image?: string | null
}

export default function BlogPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [postModalOpen, setPostModalOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [authorName, setAuthorName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [articleTitle, setArticleTitle] = useState<string>("")
  const [articleContent, setArticleContent] = useState<string>("")
  const [articleFile, setArticleFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-blog-posts")
        const data = await response.json()
        if (response.ok) {
          const posts: BlogPost[] = data.posts.map((post: any) => ({
            id: String(post.id),
            title: post.title,
            author: post.author,
            date: post.date,
            content: post.content,
            image: post.image || null,
          }))
          setBlogPosts(posts)
        } else {
          console.error("Failed to fetch posts:", data.detail)
          setSubmitMessage(`Failed to fetch posts: ${data.detail || "Unknown error"}`)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
        setSubmitMessage("Error connecting to the server. Please try again later.")
      }
    }
    fetchPosts()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/plain") {
      setArticleFile(file)
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === "string") {
          setArticleContent(e.target.result)
        } else {
          setSubmitMessage("Error reading the file. Please ensure it's a valid text file.")
        }
      }
      reader.onerror = () => setSubmitMessage("Error reading the file.")
      reader.readAsText(file)
    } else {
      setSubmitMessage("Please upload a valid text file (.txt).")
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    } else {
      setSubmitMessage("Please upload a valid image file (jpg, jpeg, png).")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!authorName || !articleTitle || (!articleContent && !articleFile)) {
      setSubmitMessage("Please provide your name, article title, and article content.")
      return
    }

    setSubmitMessage("Submitting article, please wait...")

    const formData = new FormData()
    formData.append("author", authorName)
    formData.append("title", articleTitle)
    if (email) formData.append("email", email)
    formData.append("content", articleContent)
    if (imageFile) formData.append("image", imageFile)

    try {
      const response = await fetch("http://localhost:8000/submit-article", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setSubmitMessage("Article submitted successfully! We'll review it soon.")
        setAuthorName("")
        setEmail("")
        setArticleTitle("")
        setArticleContent("")
        setArticleFile(null)
        setImageFile(null)
        setImagePreview(null)
        setModalOpen(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
        if (imageInputRef.current) imageInputRef.current.value = ""
        const postsResponse = await fetch("http://localhost:8000/get-blog-posts")
        const postsData = await postsResponse.json()
        if (postsResponse.ok) {
          const posts: BlogPost[] = postsData.posts.map((post: any) => ({
            id: String(post.id),
            title: post.title,
            author: post.author,
            date: post.date,
            content: post.content,
            image: post.image || null,
          }))
          setBlogPosts(posts)
        }
      } else {
        const errorData = await response.json()
        setSubmitMessage(`Failed to submit article: ${errorData.detail || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error submitting article:", error)
      setSubmitMessage("Error connecting to the server. Please try again later.")
    }
  }

  const handleReset = () => {
    setAuthorName("")
    setEmail("")
    setArticleTitle("")
    setArticleContent("")
    setArticleFile(null)
    setImageFile(null)
    setImagePreview(null)
    setSubmitMessage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (imageInputRef.current) imageInputRef.current.value = ""
  }

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    setPostModalOpen(true)
  }

  return (
      <main className="overflow-hidden bg-stone-900 text-white">
        <section className="relative min-h-[50vh] flex items-center justify-center py-20 bg-stone-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">AayuFind Blog</span>
            <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wide my-6">
              Share Your Plant Stories
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Contribute to our community by sharing your knowledge and experiences with Ayurvedic plants. Write or upload your article below.
            </p>
            <button
                onClick={() => setModalOpen(true)}
                className="mt-6 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-md transition"
            >
              Create New Article
            </button>
          </div>
        </section>

        <section className="py-24 bg-stone-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">Community Posts</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light mt-3 mb-6">User-Submitted Articles</h2>
              <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Explore stories and insights about medicinal plants shared by our community.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                  <div
                      key={post.id}
                      className="group block bg-stone-800/60 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                      onClick={() => handlePostClick(post)}
                  >
                    {post.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                              src={`http://localhost:8000/${post.image}`}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-white mb-2 group-hover:text-amber-500 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-stone-400 text-sm mb-2">
                        By {post.author} | {new Date(post.date).toLocaleDateString()}
                      </p>
                      <p className="text-stone-300 text-sm line-clamp-3">{post.content}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="md">
          <DialogTitle sx={{ bgcolor: "#292524", color: "white" }}>Create New Article</DialogTitle>
          <DialogContent sx={{ bgcolor: "#292524" }}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Article Title</label>
                <input
                    type="text"
                    value={articleTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArticleTitle(e.target.value)}
                    placeholder="Enter article title"
                    className="w-full px-4 py-3 rounded-md bg-stone-700/80 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Your Name</label>
                <input
                    type="text"
                    value={authorName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-md bg-stone-700/80 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Email (Optional)</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-md bg-stone-700/80 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Article Content</label>
                <textarea
                    value={articleContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setArticleContent(e.target.value)}
                    placeholder="Write your article here..."
                    className="w-full h-48 px-4 py-3 rounded-md bg-stone-700/80 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Upload Article (Text File)</label>
                <input
                    type="file"
                    accept=".txt"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-md bg-stone-700/80 border border-stone-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-amber-600 file:text-white file:cursor-pointer hover:file:bg-amber-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Upload Image (Optional)</label>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 rounded-md bg-stone-700/80 border border-stone-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-amber-600 file:text-white file:cursor-pointer hover:file:bg-amber-700"
                />
                {imagePreview && (
                    <div className="mt-4">
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                    </div>
                )}
              </div>
              {submitMessage && (
                  <div className="bg-black/50 text-white px-4 py-3 rounded-lg shadow-md flex items-center">
                    <BotMessageSquare className="w-5 h-5 mr-2 text-amber-400" />
                    <span>{submitMessage}</span>
                  </div>
              )}
            </form>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#292524" }}>
            <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-white/80 hover:text-white transition"
            >
              Cancel
            </button>
            <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition"
            >
              Reset
            </button>
            <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md transition"
            >
              Submit
            </button>
          </DialogActions>
        </Dialog>

        <Dialog open={postModalOpen} onClose={() => setPostModalOpen(false)} fullWidth maxWidth="md">
          <DialogTitle sx={{ bgcolor: "#292524", color: "white" }}>
            {selectedPost?.title}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#292524" }}>
            {selectedPost && (
                <div className="space-y-4">
                  {selectedPost.image && (
                      <div className="relative w-full h-64 overflow-hidden rounded-md">
                        <img
                            src={`http://localhost:8000/${selectedPost.image}`}
                            alt={selectedPost.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                  )}
                  <div>
                    <p className="text-stone-400 text-sm mb-2">
                      By {selectedPost.author} | {new Date(selectedPost.date).toLocaleDateString()}
                    </p>
                    <p className="text-white text-base leading-relaxed">{selectedPost.content}</p>
                  </div>
                </div>
            )}
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#292524" }}>
            <button
                onClick={() => setPostModalOpen(false)}
                className="px-4 py-2 text-white/80 hover:text-white transition"
            >
              Close
            </button>
          </DialogActions>
        </Dialog>
      </main>
  )
}