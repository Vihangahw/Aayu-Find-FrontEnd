"use client";
import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider } from "@mui/material";
import type { Area } from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage"; // We’ll write this utility function below

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState<boolean>(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => fileInputRef.current?.click();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCropModalOpen(true); // Open cropper
    }
  };

  const handleCropComplete = useCallback((_ : Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(previewUrl!, croppedAreaPixels);
      setCroppedBlob(croppedImage);

      const croppedUrl = URL.createObjectURL(croppedImage);
      setPreviewUrl(croppedUrl);
      setCropModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [previewUrl, croppedAreaPixels]);

  const handleUpload = async () => {
    if (!croppedBlob) {
      alert("Please crop the image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", croppedBlob, "cropped-lead.png");

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (response.ok) {
        setUploadMessage(`Identified as: ${result.final_class || "Unknown"} (Confidence: ${result.final_confidence?.toFixed(2) || "N/A"})`);
      } else {
        setUploadMessage(`Upload Failed: ${result.detail || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setUploadMessage("Error connecting to server.");
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setUploadMessage(null);
    setCroppedBlob(null);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-4"
             style={{ backgroundImage: "url('/assets/images/plant-hd.jpg')" }}>
      <h1 className="text-7xl font-bold text-black-600">Welcome to Aayu Find</h1>
      <p className="text-lg text-sm text-black-600 mt-8">
        Sri Lanka is home to a vast and diverse range of Ayurvedic medicinal plants, renowned for their healing
        properties and their role<br /> in traditional medicine for centuries.
        Aayu Find is an innovative platform that combines the power of AI-driven plant recognition with the <br />wisdom
        of Ayurvedic healing, making it easier for
        you to identify, understand, and utilize medicinal plants for better health and well-being.<br />
        <br />
        At Aayu Find, we aim to bridge the gap between ancient Ayurvedic knowledge and modern technology,
        empowering enthusiast, <br />Ayurveda practitioner, or someone looking for natural alternatives to manage chronic
        conditions, our platform <br />is here to guide you on your journey to holistic wellness. 🌿✨</p>


      {/* Image Upload Box */}
      <div className="mt-10 w-80 h-80 max-w-2xl bg-gray bg-opacity-10 backdrop-blur-md border border-gray-500 rounded-lg p-8 text-center text-white shadow-lg">
        <div className="w-64 h-64 border-0.9 border-dashed border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-800 transition cursor-pointer"
             onDrop={(e) => {
               e.preventDefault();
               const file = e.dataTransfer.files[0];
               if (file) {
                 setSelectedImage(file);
                 setPreviewUrl(URL.createObjectURL(file));
                 setCropModalOpen(true);
               }
             }}
             onDragOver={(e) => e.preventDefault()}
             onClick={handleClickUpload}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-md" />
          ) : (
            <p className="text-gray-400">Drag & Drop or Click to Upload<br />Your Plant Image</p>
          )}
        </div>

        <input type="file" accept=".jpg,.jpeg,.png" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

        {previewUrl && (
          <>
            <button onClick={handleUpload} className="mt-4 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-950 transition">
              Upload Image
            </button>
            <button onClick={handleReset} className="mt-2 w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition">
              Reset Image
            </button>
          </>
        )}

        {uploadMessage && (
          <div className="mt-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm font-medium tracking-wide">🌿 <span className="text-green-400">{uploadMessage}</span></p>
          </div>
        )}
      </div>

      {/* Crop Modal */}
      <Dialog open={cropModalOpen} fullWidth maxWidth="sm">
        <DialogTitle>Crop Your Image</DialogTitle>
        <DialogContent>
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
          <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, z) => setZoom(z as number)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCropModalOpen(false)}>Cancel</Button>
          <Button onClick={showCroppedImage} variant="contained" color="primary">Crop</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
