import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { InstagramStory } from './components/InstagramStory';
import { ImageCropper } from './components/ImageCropper';

export default function App() {
  const [username, setUsername] = useState('username');
  const [time, setTime] = useState('x min');
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [storyImg, setStoryImg] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageForCrop, setTempImageForCrop] = useState<string | null>(null);
  const [isRepost, setIsRepost] = useState(false);
  
  // --- Estados para las barras de historia ---
  const [totalStories, setTotalStories] = useState(3);
  const [activeStory, setActiveStory] = useState(1);
  
  const storyContentRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'story') => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      
      if (type === 'profile') {
        setTempImageForCrop(url);
        setShowCropper(true);
      } else {
        setStoryImg(url);
      }
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setProfileImg(croppedImage);
  };
  
  const downloadScreenshot = async () => {
    if (!storyContentRef.current) return;
    
    try {
      const element = storyContentRef.current;
      
      // Esperar a que todas las imágenes carguen
      const images = element.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(
          img =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            })
        )
      );
      
      // Pequeño delay para asegurar que el DOM esté listo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#000000',
        scale: window.devicePixelRatio * 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 0,
        removeContainer: false,
      });
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `instagram-story-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error descargando imagen:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-4 gap-10">
      
      {/* PANEL DE CONTROL */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-pink-500">Personalizar Historia</h2>
        
        <div className="space-y-4">
          {/* Inputs anteriores... (Usuario y Tiempo) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm mb-1 text-gray-300">Usuario:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-pink-500 outline-none"/>
            </div>
            <div>
                <label className="block text-sm mb-1 text-gray-300">Tiempo:</label>
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-pink-500 outline-none"/>
            </div>
          </div>

          {/* --- NUEVO: Controles de Barras --- */}
          <div className="grid grid-cols-2 gap-4 bg-gray-700/50 p-3 rounded-lg border border-gray-600">
             <div>
                <label className="block text-xs mb-1 text-pink-300 font-bold">TOTAL HISTORIAS:</label>
                <input 
                  type="number" 
                  value={totalStories} 
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    let newTotal = isNaN(value) || value < 1 ? 1 : value > 10 ? 10 : value;
                    
                    setTotalStories(newTotal);

                    // Ajustar activeStory si el nuevo total es menor
                    if (activeStory > newTotal) {
                        setActiveStory(newTotal);
                    }
                  }}
                  className="w-full p-1 rounded bg-gray-700 border border-gray-500 text-center"
                />
             </div>
             <div>
                <label className="block text-xs mb-1 text-pink-300 font-bold">ESTÁS EN LA N°:</label>
                <input 
                  type="number" 
                  min="1" 
                  max={totalStories} 
                  value={activeStory} 
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    let newActive = isNaN(value) || value < 1 ? 1 : value;
                    if (newActive > totalStories) newActive = totalStories;

                    setActiveStory(newActive);
                  }}
                  className="w-full p-1 rounded bg-gray-700 border border-gray-500 text-center"
                />
             </div>
          </div>

          {/* Botón para activar Sticker de Repost */}
          <button
            onClick={() => setIsRepost(!isRepost)}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition ${
              isRepost ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isRepost ? '✓ Sticker de Repost' : 'Sticker de Repost'}
          </button>

          {/* Inputs de archivos (igual que antes) */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Foto de Perfil:</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"/>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">Fondo de Historia:</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'story')}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"/>
          </div>
        </div>

        {/* Botón de descarga */}
        <button
          onClick={downloadScreenshot}
          className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Descargar Screenshot
        </button>
      </div>

      {/* EL IPHONE */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[45px] border-[10px] border-[#252525] shadow-[0_0_0_4px_#000,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col shrink-0">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30px] w-[140px] bg-black rounded-b-2xl z-50 pointer-events-none"></div>

         {/* PASAMOS LAS NUEVAS PROPS AQUÍ ABAJO 👇 */}
         <InstagramStory 
            username={username}
            time={time}
            profileImg={profileImg}
            storyImg={storyImg}
            totalStories={totalStories} 
            activeStory={activeStory}
            contentRef={storyContentRef}
            isRepost={isRepost}
         />

         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/40 rounded-full z-50 pointer-events-none"></div>
      </div>

      {showCropper && tempImageForCrop && (
        <ImageCropper
          imageSrc={tempImageForCrop}
          onCropComplete={handleCropComplete}
          onClose={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}