import { useState } from 'react';
import { X, MoreHorizontal, Send, Heart, Music2, PlusSquare } from 'lucide-react';

export function InstagramStory() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative w-full max-w-[480px] h-[calc(100vh-40px)] max-h-[850px] bg-black rounded-lg overflow-hidden shadow-2xl font-sans">
      
      {/* 1. FONDO (BACKGROUND) */}
      {/* Nota: Para usar tu imagen exacta, guárdala en la carpeta /public y cambia la url por '/nombre-imagen.jpg' */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1080&auto=format&fit=crop')` // Imagen tipo fiesta
        }}
      >
        {/* Gradiente oscuro para que el texto resalte, igual que en la foto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* CONTENIDO SUPERPUESTO (UI) */}
      <div className="relative h-full flex flex-col justify-between">
        
        {/* --- SECCIÓN SUPERIOR --- */}
        <div className="pt-4 px-3 space-y-3 z-10">
          {/* Barra de progreso */}
          <div className="flex gap-1 h-0.5">
            <div className="flex-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-white rounded-full" />
            </div>
            <div className="flex-1 bg-white/30 rounded-full" />
          </div>

          {/* Cabecera de Usuario */}
          <div className="flex items-start justify-between mt-2">
            <div className="flex items-center gap-3">
              {/* Avatar con borde de historia activa */}
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" 
                  alt="User avatar"
                  className="w-full h-full rounded-full object-cover border-2 border-black"
                />
              </div>
              
              {/* Info Usuario + Música */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">__.itstamii.__</span>
                  <span className="text-white/60 text-sm">26 min</span>
                </div>
                {/* Indicador de Música */}
                <div className="flex items-center gap-1 mt-0.5">
                   <Music2 size={12} className="text-white" />
                   <span className="text-white text-xs truncate max-w-[150px] animate-pulse">
                     BRY, Sebastian Roldan, Linares · E...
                   </span>
                </div>
              </div>
            </div>
            
            {/* Botones esquina superior derecha */}
            <div className="flex items-center gap-4 text-white">
              <button>
                <MoreHorizontal size={24} />
              </button>
              <button>
                <X size={28} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN CENTRAL (El Sticker de Reposteo) --- */}
        {/* Esto reemplaza la notificación anterior. Es el botón blanco "Agregar a tu historia" */}
        <div className="absolute bottom-24 left-0 right-0 flex justify-center z-20 px-4">
            <button className="bg-white text-black font-semibold text-sm py-3 px-6 rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition-transform w-full sm:w-auto justify-center">
                {/* Icono de agregar genérico o similar */}
                <PlusSquare size={18} fill="black" className="text-white" />
                Agregar a tu historia
            </button>
        </div>

        {/* --- SECCIÓN INFERIOR (Input) --- */}
        <div className="p-4 pb-6 z-10 flex items-center gap-3">
            {/* Input redondeado */}
            <div className="flex-1 relative">
              <input 
                type="text"
                placeholder="Envía un mensaje a Tamara..."
                className="w-full bg-transparent border border-white/50 rounded-full pl-5 pr-4 py-3 text-white placeholder-white/80 text-sm outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Icono Me Gusta */}
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="active:scale-90 transition-transform"
            >
              <Heart 
                size={28} 
                className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
              />
            </button>

            {/* Icono Compartir (Avioncito) */}
            <button className="active:scale-90 transition-transform -rotate-12 mt-1">
              <Send size={28} className="text-white" />
            </button>
        </div>

      </div>
    </div>
  );
}
