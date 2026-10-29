import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Upload, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { CarImageItem } from '../types';

interface CarGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  carId: string;
  images: CarImageItem[];
  userRole?: 'BUYER' | 'DEALER' | 'COMMUNITY';
  onOpenUpload?: (carId: string, carName: string) => void;
}

export const CarGalleryModal: React.FC<CarGalleryModalProps> = ({
  isOpen,
  onClose,
  carName,
  carId,
  images,
  userRole = 'BUYER',
  onOpenUpload
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const categoryLabels: Record<string, string> = {
    EXTERIOR: 'Front & Exterior',
    INTERIOR: 'Cabin & Seating',
    COCKPIT: 'Dashboard & Screen',
    REAR: 'Rear & Boot',
    SHOWROOM_FLOOR: 'Showroom Stock Yard',
    DELIVERY: 'Ready for Delivery'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/90 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>{carName}</span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  {images.length} Photos
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Official verified dealership photos & showroom floor inventory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Showroom Upload Button (ONLY visible for verified Showroom Dealers, NOT for buyers) */}
            {userRole === 'DEALER' && onOpenUpload && (
              <button
                onClick={() => {
                  onClose();
                  onOpenUpload(carId, carName);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Add more photos as Showroom Partner"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>+ Upload Photos</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close Gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Stage Image */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[440px] bg-slate-950 flex items-center justify-center overflow-hidden select-none">
          <img
            src={currentImage.url}
            alt={currentImage.caption || carName}
            className="w-full h-full max-h-[58vh] object-contain transition-all duration-300"
          />

          {/* Top Overlays */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Category Tag */}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{categoryLabels[currentImage.category || 'EXTERIOR'] || currentImage.category}</span>
            </span>

            {/* Photo Counter */}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-slate-200 border border-slate-700 shadow-md">
              {activeIndex + 1} / {images.length}
            </span>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 sm:p-5 pt-10">
            <div className="max-w-2xl">
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {currentImage.caption || `${carName} View`}
              </h4>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Showroom Stock
                </span>
                {currentImage.uploadedBy && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    {currentImage.uploadedBy}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 overflow-x-auto shrink-0 flex items-center gap-2.5 justify-center scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'border-blue-500 scale-105 shadow-md ring-2 ring-blue-500/30'
                  : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
              }`}
            >
              <img
                src={img.url}
                alt={img.caption || `Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-slate-900/80 px-1 rounded">
                {idx + 1}
              </span>
            </button>
          ))}

          {/* Showroom quick upload tile in thumbnail strip (DEALER role only) */}
          {userRole === 'DEALER' && onOpenUpload && (
            <button
              onClick={() => {
                onClose();
                onOpenUpload(carId, carName);
              }}
              className="h-14 w-20 sm:h-16 sm:w-24 rounded-xl border-2 border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 flex flex-col items-center justify-center gap-1 shrink-0 transition-all cursor-pointer"
              title="Add more photos"
            >
              <Upload className="w-4 h-4" />
              <span className="text-[10px] font-bold">+ Add Photo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
