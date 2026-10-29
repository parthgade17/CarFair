import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Link as LinkIcon,
  Camera
} from 'lucide-react';
import { addShowroomPhoto } from '../services/photoStorage';

interface UploadCarPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: string;
  carName: string;
  dealerName?: string;
  onPhotoUploaded?: () => void;
}

export const UploadCarPhotoModal: React.FC<UploadCarPhotoModalProps> = ({
  isOpen,
  onClose,
  carId,
  carName,
  dealerName = 'Bafna Tata Motors (Shivajinagar Pune)',
  onPhotoUploaded
}) => {
  const [selectedCar, setSelectedCar] = useState(carId || 'tata-nexon');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('Showroom Stock Unit Ready for Delivery');
  const [category, setCategory] = useState<'EXTERIOR' | 'INTERIOR' | 'COCKPIT' | 'REAR' | 'SHOWROOM_FLOOR'>('SHOWROOM_FLOOR');
  const [uploadMethod, setUploadMethod] = useState<'FILE' | 'URL' | 'PRESET'>('FILE');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewUrl(base64);
        setImageUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset stock photos showrooms can quickly tap to add
  const presetPhotos = [
    {
      title: 'Showroom Floor Ready',
      url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      category: 'SHOWROOM_FLOOR' as const,
      caption: 'Direct Showroom Floor Inventory - 7 Days Delivery Guarantee'
    },
    {
      title: 'Premium Cabin Interior',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      category: 'INTERIOR' as const,
      caption: 'Dual-Tone Leatherette Cabin & Wireless Android Auto'
    },
    {
      title: 'Front Aggressive Angle',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      category: 'EXTERIOR' as const,
      caption: 'Showroom Stock with Factory Paint Protection & Mudflaps'
    },
    {
      title: 'Dual HD Dashboard',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      category: 'COCKPIT' as const,
      caption: 'Connected Car Tech & Harman/Kardon Audio System'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewUrl || imageUrl;
    if (!finalUrl) {
      alert('Please upload an image or enter a valid image URL');
      return;
    }

    addShowroomPhoto(selectedCar, {
      url: finalUrl,
      caption,
      category,
      uploadedBy: dealerName
    });

    setSuccessMessage('🎉 Photo added to car gallery successfully!');
    if (onPhotoUploaded) onPhotoUploaded();

    setTimeout(() => {
      setSuccessMessage('');
      setPreviewUrl('');
      setImageUrl('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-600/10 border border-amber-300 flex items-center justify-center text-amber-700">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Add Showroom Car Photos
              </h3>
              <p className="text-[11px] text-slate-500">
                Showcase authorized stock to car buying pools
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs">
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Target Car Model */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Select Car Model</label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:bg-white focus:border-amber-600"
            >
              <option value="tata-nexon">Tata Nexon Creative+ / Smart+</option>
              <option value="hyundai-creta">Hyundai Creta SX (Tech) / Knight</option>
              <option value="mahindra-xuv700">Mahindra XUV700 AX7 / AX5</option>
              <option value="mahindra-scorpio-n">Mahindra Scorpio-N Z4 / Z8</option>
              <option value="kia-seltos">Kia Seltos HTX / GTX</option>
              <option value="maruti-brezza">Maruti Suzuki Brezza ZXi</option>
            </select>
          </div>

          {/* Upload Method Switcher */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Choose Photo Source</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUploadMethod('FILE')}
                className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  uploadMethod === 'FILE'
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>From Device</span>
              </button>

              <button
                type="button"
                onClick={() => setUploadMethod('URL')}
                className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  uploadMethod === 'URL'
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Web URL</span>
              </button>

              <button
                type="button"
                onClick={() => setUploadMethod('PRESET')}
                className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  uploadMethod === 'PRESET'
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stock Presets</span>
              </button>
            </div>
          </div>

          {/* Method 1: Local File Upload */}
          {uploadMethod === 'FILE' && (
            <div className="space-y-2">
              <label className="block text-slate-700 font-bold">Select Image from Computer or Phone</label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center hover:border-amber-500 transition-colors bg-slate-50/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="car-photo-input"
                />
                <label htmlFor="car-photo-input" className="cursor-pointer block">
                  <Camera className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <span className="font-bold text-slate-800 block text-xs">
                    Click to select a photo of the vehicle
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    PNG, JPG, WebP supported
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Method 2: Web URL */}
          {uploadMethod === 'URL' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/car-photo.jpg"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-600"
              />
            </div>
          )}

          {/* Method 3: Showroom Presets */}
          {uploadMethod === 'PRESET' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Tap a Verified Stock Photo</label>
              <div className="grid grid-cols-2 gap-2">
                {presetPhotos.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPreviewUrl(p.url);
                      setImageUrl(p.url);
                      setCaption(p.caption);
                      setCategory(p.category);
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      previewUrl === p.url
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={p.url} alt={p.title} className="w-12 h-10 object-cover rounded-lg" />
                    <div>
                      <span className="font-bold text-[11px] text-slate-900 block leading-tight">{p.title}</span>
                      <span className="text-[9px] text-slate-500">{p.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Preview if image is loaded */}
          {previewUrl && (
            <div className="p-2 rounded-2xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Preview</span>
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-36 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Photo Category */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Photo Angle / Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:bg-white"
            >
              <option value="SHOWROOM_FLOOR">Showroom Floor / Stock Ready</option>
              <option value="EXTERIOR">Front 3/4 Exterior View</option>
              <option value="COCKPIT">Dashboard & Touchscreen</option>
              <option value="INTERIOR">Cabin Seating & Sunroof</option>
              <option value="REAR">Rear Profile & Boot Space</option>
            </select>
          </div>

          {/* Photo Caption */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Photo Caption</label>
            <input
              type="text"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Creative+ AMT with Dual Tone Roof on Showroom Display"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
            >
            </input>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Photo to Car Gallery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
