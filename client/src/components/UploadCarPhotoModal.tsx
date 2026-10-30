import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  Building2, 
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
  dealerName = 'Authorized Showroom Partner',
  onPhotoUploaded
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('Showroom Floor Stock Ready for Delivery');
  const [category, setCategory] = useState<'EXTERIOR' | 'INTERIOR' | 'COCKPIT' | 'REAR' | 'SHOWROOM_FLOOR'>('SHOWROOM_FLOOR');
  const [uploadMethod, setUploadMethod] = useState<'FILE' | 'URL'>('FILE');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Handle local file selection / camera capture
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewUrl || imageUrl;
    if (!finalUrl) {
      alert('Please upload an image file or enter an image URL');
      return;
    }

    addShowroomPhoto(carId, {
      url: finalUrl,
      caption,
      category,
      uploadedBy: dealerName
    });

    setSuccessMessage('🎉 Showroom photo published successfully! It is now visible to buyers.');
    if (onPhotoUploaded) onPhotoUploaded();

    setTimeout(() => {
      setSuccessMessage('');
      setPreviewUrl('');
      setImageUrl('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Upload Vehicle Photo</h3>
              <p className="text-xs text-slate-600 font-medium">{carName}</p>
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
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Upload Method Switcher */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Choose Photo Source</label>
            <div className="grid grid-cols-2 gap-2">
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
                <span>Upload From Device / Camera</span>
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
                <span>Web Image URL</span>
              </button>
            </div>
          </div>

          {/* Method 1: Local File Upload */}
          {uploadMethod === 'FILE' && (
            <div className="space-y-2">
              <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-5 text-center transition-colors bg-amber-50/30">
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
                    Choose Photo from Device / Camera
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
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

          {/* Preview if image is loaded */}
          {previewUrl && (
            <div className="p-2 rounded-2xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Preview</span>
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Photo Category */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Photo Angle / Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:bg-white focus:border-amber-600"
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
              placeholder="e.g. Official Showroom Stock - Ready for Express Delivery"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-600"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Photo to Vehicle Gallery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
