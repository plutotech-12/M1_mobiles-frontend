"use client";

import { useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function MultipleImageUploader({
  images = [],
  setImages,
  existingImages = [],
  setExistingImages,
}) {
  const fileInputRef = useRef(null);

  // Add new files
  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    setImages((prev) => [...prev, ...newFiles]);
  };

  // Paste support
  useEffect(() => {
    const onPaste = (e) => {
      const items = e.clipboardData.items;
      const files = [];

      for (const item of items) {
        if (item.type.startsWith("image")) {
          files.push(item.getAsFile());
        }
      }

      if (files.length > 0) addFiles(files);
    };

    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  // Remove new uploaded images
  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove old existing images
  const removeOldImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Images
      </label>

      {/* Upload box */}
      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="
          border-2 border-dashed border-gray-300 rounded-xl 
          p-6 flex flex-col items-center justify-center
          cursor-pointer
          hover:border-orange-500 hover:bg-orange-50 transition
        "
      >
        <p className="text-gray-600">Click / Paste / Drag & Drop</p>
        <p className="text-xs text-gray-400 mt-1">Upload multiple images</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <>
          <h3 className="mt-4 mb-2 text-sm font-medium text-gray-700">
            Existing Images
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {existingImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  className="w-full h-24 object-contain rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeOldImage(index)}
                  className="
                    absolute top-1 right-1 bg-red-600 text-white p-1 
                    rounded-full opacity-0 group-hover:opacity-100 
                    transition
                  "
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* New Images */}
      {images.length > 0 && (
        <>
          <h3 className="mt-4 mb-2 text-sm font-medium text-gray-700">
            New Uploaded Images
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-24 object-contain rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="
                    absolute top-1 right-1 bg-red-600 text-white p-1 
                    rounded-full opacity-0 group-hover:opacity-100
                    transition
                  "
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
