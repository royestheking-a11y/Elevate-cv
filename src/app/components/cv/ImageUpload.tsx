import { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { Upload, X, Check, Image as ImageIcon, Crop } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageUploadProps {
  photoUrl?: string;
  photoShape?: 'circle' | 'square';
  onUpdate: (url: string | undefined, shape: 'circle' | 'square') => void;
}

export function ImageUpload({ photoUrl, photoShape = 'circle', onUpdate }: ImageUploadProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [shape, setShape] = useState<'circle' | 'square'>(photoShape);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const createCropImage = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      // Save as base64
      const base64Image = canvas.toDataURL('image/jpeg', 0.9);
      onUpdate(base64Image, shape);
      setIsModalOpen(false);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemove = () => {
    onUpdate(undefined, 'circle');
  };

  return (
    <div className="mb-6">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Profile Photo</label>
      
      {!photoUrl ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="border-2 border-dashed border-gray-200 hover:border-[#D6A85F] bg-gray-50 hover:bg-[#D6A85F]/5 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/png, image/jpeg, image/webp" 
            className="hidden" 
          />
          <div className={`p-3 rounded-full bg-white shadow-sm mb-3 transition-transform duration-300 ${isHovering ? 'scale-110 shadow-md' : ''}`}>
            <Upload className="size-5 text-[#D6A85F]" />
          </div>
          <p className="text-sm font-semibold text-[#3B2F2F]">Upload Profile Photo</p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG or WEBP (Max 2MB)</p>
          
          <div className={`absolute inset-0 bg-[#D6A85F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </div>
      ) : (
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
          <div className="relative">
            <img 
              src={photoUrl} 
              alt="Profile" 
              className={`w-16 h-16 object-cover border-2 border-white shadow-sm ${photoShape === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
              >
                Change Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/png, image/jpeg, image/webp" 
                className="hidden" 
              />
              <button 
                onClick={handleRemove}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-gray-500">Shape:</span>
              <button 
                onClick={() => onUpdate(photoUrl, 'circle')}
                className={`w-4 h-4 rounded-full border border-gray-300 ${photoShape === 'circle' ? 'bg-[#3B2F2F] border-[#3B2F2F]' : 'bg-white'}`}
              />
              <button 
                onClick={() => onUpdate(photoUrl, 'square')}
                className={`w-4 h-4 rounded-sm border border-gray-300 ${photoShape === 'square' ? 'bg-[#3B2F2F] border-[#3B2F2F]' : 'bg-white'}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Crop Modal */}
      <AnimatePresence>
        {isModalOpen && imageSrc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden relative z-10"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-[#3B2F2F] flex items-center gap-2">
                  <Crop className="size-4 text-[#D6A85F]" />
                  Crop Image
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="size-5" />
                </button>
              </div>
              
              <div className="relative w-full h-64 sm:h-80 bg-black">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape={shape === 'circle' ? 'round' : 'rect'}
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              
              <div className="p-5 space-y-5 bg-white">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-2 block">Zoom</label>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D6A85F]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setShape('circle')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${shape === 'circle' ? 'bg-white shadow-sm text-[#3B2F2F]' : 'text-gray-500 hover:text-[#3B2F2F]'}`}
                    >
                      Circle
                    </button>
                    <button
                      onClick={() => setShape('square')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${shape === 'square' ? 'bg-white shadow-sm text-[#3B2F2F]' : 'text-gray-500 hover:text-[#3B2F2F]'}`}
                    >
                      Square
                    </button>
                  </div>
                  
                  <button
                    onClick={createCropImage}
                    className="bg-[#3B2F2F] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:bg-[#2B2222] transition-colors"
                  >
                    <Check className="size-4" />
                    <span>Save Photo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);