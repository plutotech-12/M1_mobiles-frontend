"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageZoomGallery({
  images = [],
  selectedImage,
  setSelectedImage,
}) {
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [lens, setLens] = useState({ display: "none", left: 0, top: 0, w: 0, h: 0 });
  const [zoomBg, setZoomBg] = useState({ image: "", size: "cover", pos: "50% 50%" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(
    images.indexOf(selectedImage || images[0]) || 0
  );

  const zoomScale = 2.6;

  /* ---------------- SYNC ---------------- */
  useEffect(() => {
    const idx = images.indexOf(selectedImage);
    if (idx >= 0) setModalIndex(idx);
  }, [selectedImage, images]);

  useEffect(() => {
    if (images[modalIndex]) setSelectedImage(images[modalIndex]);
  }, [modalIndex]);

  /* ---------------- ZOOM LOGIC (UNCHANGED) ---------------- */
  const onPointerMove = (e) => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const rect = img.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null || clientY == null) return;

    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    if (offsetX < 0 || offsetY < 0 || offsetX > rect.width || offsetY > rect.height) {
      setIsHovering(false);
      return;
    }

    setIsHovering(true);

    const lensW = Math.max(80, Math.min(240, Math.round(rect.width * 0.22)));
    const lensH = Math.max(80, Math.min(240, Math.round(rect.height * 0.22)));

    const left = Math.max(0, Math.min(rect.width - lensW, offsetX - lensW / 2));
    const top = Math.max(0, Math.min(rect.height - lensH, offsetY - lensH / 2));

    const px = (offsetX / rect.width) * 100;
    const py = (offsetY / rect.height) * 100;

    const bgW = Math.round((img.naturalWidth || rect.width) * zoomScale);
    const bgH = Math.round((img.naturalHeight || rect.height) * zoomScale);

    setLens({ display: "block", left, top, w: lensW, h: lensH });
    setZoomBg({
      image: selectedImage,
      size: `${bgW}px ${bgH}px`,
      pos: `${px}% ${py}%`,
    });
  };

  const openModal = (idx) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  const prevModal = () => setModalIndex((i) => Math.max(0, i - 1));
  const nextModal = () => setModalIndex((i) => Math.min(images.length - 1, i + 1));

  /* ======================= UI ======================= */
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 items-start">

      {/* ================= THUMBNAILS ================= */}
      <div
        className="
          order-2 lg:order-1
          flex flex-row lg:flex-col
          gap-3
          overflow-x-auto
          lg:overflow-visible
          max-w-full
        "
      >
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(img);
              setModalIndex(index);
            }}
            onDoubleClick={() => openModal(index)}
            className={`border-2 rounded-xl p-1 bg-white shadow-sm
              w-20 h-20 flex-shrink-0
              flex items-center justify-center transition
              ${
                selectedImage === img
                  ? "border-orange-500 scale-105"
                  : "border-gray-200"
              }`}
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              className="object-contain w-full h-full"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* ================= MAIN IMAGE ================= */}
      <div
        ref={containerRef}
        className="
          order-1 lg:order-2
          relative
          bg-white
          rounded-2xl
          border
          shadow-lg
          flex
          items-center
          justify-center
          w-full
          lg:w-[520px]
          min-h-[320px]
          lg:min-h-[440px]
          overflow-hidden
        "
        onMouseMove={onPointerMove}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => openModal(images.indexOf(selectedImage))}
      >
        <img
          ref={imgRef}
          src={selectedImage}
          alt="product"
          className="
            max-h-[360px]
            lg:max-h-[480px]
            w-auto
            object-contain
            select-none
          "
          draggable={false}
        />

        {/* ZOOM WINDOW (DESKTOP ONLY) */}
        <div
          className="hidden lg:block bg-white rounded-2xl border shadow-xl"
          style={{
            position: "absolute",
            left: "560px",
            top: "120px",
            width: "360px",
            height: "360px",
            overflow: "hidden",
            zIndex: 999,
            display: isHovering ? "block" : "none",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url("${zoomBg.image || selectedImage}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: zoomBg.size,
              backgroundPosition: zoomBg.pos,
            }}
          />
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
            >
              <X />
            </button>

            <div className="flex items-center">
              <button onClick={prevModal} className="p-6">
                <ChevronLeft />
              </button>

              <div className="flex-1 p-6 flex justify-center">
                <img
                  src={images[modalIndex]}
                  className="max-h-[80vh] object-contain"
                />
              </div>

              <button onClick={nextModal} className="p-6">
                <ChevronRight />
              </button>
            </div>

            <div className="flex gap-3 p-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setModalIndex(i)}
                  className={`w-20 h-20 flex-shrink-0 border rounded-lg p-1 ${
                    i === modalIndex ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img src={img} className="object-contain w-full h-full" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
