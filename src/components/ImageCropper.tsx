import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onClose: () => void;
}

export function ImageCropper({ imageSrc, onCropComplete, onClose }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChangeCallback = useCallback((location: { x: number; y: number }) => {
    setCrop(location);
  }, []);

  const onCropCompleteCallback = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const { width, height, x, y } = croppedAreaPixels;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

      const croppedImage = canvas.toDataURL('image/jpeg', 0.95);
      onCropComplete(croppedImage);
      onClose();
    };
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <h3 className="text-white text-xl font-bold mb-4">Recortar Foto de Perfil</h3>

        <div className="relative w-full bg-black rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChangeCallback}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
            restrictPosition={true}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Zoom</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveCrop}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Guardar Recorte
          </button>
        </div>
      </div>
    </div>
  );
}
