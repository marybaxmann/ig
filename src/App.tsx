import { InstagramStory } from './components/InstagramStory';

export default function App() {
  return (
    // Contenedor principal centrado
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* 📱 MARCO DE IPHONE (Simulación física) */}
      <div className="
        relative 
        w-[375px] h-[812px] 
        bg-black 
        rounded-[45px]      
        border-[10px] border-[#252525] /* Borde gris oscuro del teléfono */
        shadow-[0_0_0_4px_#000,0_20px_50px_rgba(0,0,0,0.5)] /* Sombras realistas */
        overflow-hidden
        flex flex-col
        shrink-0
      ">
         {/* Muesca (Notch) */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30px] w-[140px] bg-black rounded-b-2xl z-50 pointer-events-none"></div>

         {/* AQUI CARGAMOS LA PANTALLA DE LA HISTORIA */}
         <InstagramStory />

         {/* Barra inferior (Home Indicator) */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/40 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
}