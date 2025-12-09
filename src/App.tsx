import { useState } from 'react';
import { InstagramStory } from './components/InstagramStory';

export default function App() {
  const [username, setUsername] = useState('_itstami_');
  const [time, setTime] = useState('26 min');
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [storyImg, setStoryImg] = useState<string | null>(null);
  
  // --- NUEVO: Estados para las barras de historia ---
  const [totalStories, setTotalStories] = useState(3); // Cantidad total de rayitas
  const [activeStory, setActiveStory] = useState(1);   // Cuál está activa (la 1, la 2, etc)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setter(url);
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
                  min="1" 
                  max="10" 
                  value={totalStories} 
                  onChange={(e) => setTotalStories(Number(e.target.value))}
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
                  onChange={(e) => setActiveStory(Number(e.target.value))}
                  className="w-full p-1 rounded bg-gray-700 border border-gray-500 text-center"
                />
             </div>
          </div>

          {/* Inputs de archivos (igual que antes) */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Foto de Perfil:</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setProfileImg)}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"/>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">Fondo de Historia:</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setStoryImg)}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"/>
          </div>
        </div>
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
            totalStories={totalStories} // <--- NUEVO
            activeStory={activeStory}   // <--- NUEVO
         />

         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/40 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
}