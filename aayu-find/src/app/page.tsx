"use client";
import React, {JSX, useState} from "react";

export default function Home(): JSX.Element {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file: File | undefined = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const handleUpload = async (): Promise<void> => {
        if (!selectedImage) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Image uploaded successfully!");
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Error uploading:", error);
            alert("Error uploading image.");
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-green-600">Upload Plant Image</h1>
            <p className="text-lg text-gray-600 mt-4">
                Upload a plant image to get it recognized.
            </p>

            {/* Image Upload Input */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-6 px-4 py-2 border rounded-lg cursor-pointer"
            />

            {/* Preview the Image */}
            {previewUrl && (
                <div className="mt-4">
                    <img
                        src={previewUrl}
                        alt="Uploaded Preview"
                        className="w-64 h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition"
            >
                Upload Image
            </button>
        </section>
    );
}
