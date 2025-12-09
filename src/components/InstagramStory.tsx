import { useState } from 'react';

// Agregamos las nuevas props a la interfaz
interface InstagramStoryProps {
  username: string;
  time: string;
  profileImg: string | null;
  storyImg: string | null;
  totalStories: number; // NUEVO
  activeStory: number;  // NUEVO
}

const Icons = {
  Repost: () => (<img src="/repost.jpg" alt="Repost" className="w-[18px] h-[18px] object-contain" />),
  Close: () => <svg aria-label="Cerrar" color="white" fill="white" height="24" viewBox="0 0 24 24" width="24"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" x1="20.649" x2="3.354" y1="20.649" y2="3.354" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></line></svg>,
  Dots: () => <svg aria-label="Más" color="white" fill="white" height="24" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>,
  Heart: ({ filled }: { filled: boolean }) => filled ? 
    <svg aria-label="Ya no me gusta" color="#FD1D1D" fill="#FD1D1D" height="28" viewBox="0 0 48 48" width="28"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> :
    <svg aria-label="Me gusta" color="white" fill="white" height="28" viewBox="0 0 24 24" width="28"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
};

export function InstagramStory({ username, time, profileImg, storyImg, totalStories, activeStory }: InstagramStoryProps) {
  const [isLiked, setIsLiked] = useState(false);
  const defaultAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80";
  const defaultBackground = "/historia.jpg";
  const currentAvatar = profileImg || defaultAvatar;
  const currentBackground = storyImg || defaultBackground;

  return (
    <div className="relative w-full h-full bg-black font-sans text-white select-none overflow-hidden">
      
      {/* FONDO */}
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <img src={currentBackground} alt="Story Content" className="w-full h-[78%] object-contain rounded-xl z-0" />
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10" />
      </div>

      {/* HEADER UI */}
      <div className="relative z-20 pt-24 px-3 flex flex-col gap-1">
        
        {/* --- AQUÍ ESTÁ LA MAGIA DE LAS BARRAS --- */}
        <div className="flex gap-1 h-0.5">
          {Array.from({ length: totalStories }).map((_, index) => {
            // Lógica para saber cómo pintar la barra
            const isCompleted = index < (activeStory - 1); // Barras pasadas (blanco total)
            const isActive = index === (activeStory - 1);  // Barra actual (parcialmente llena)
            
            return (
              <div key={index} className={`flex-1 rounded-full overflow-hidden ${isCompleted ? 'bg-white' : 'bg-white/30'}`}>
                {/* Si es la activa, le ponemos el relleno al 85% */}
                {isActive && <div className="h-full w-[85%] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}
              </div>
            );
          })}
        </div>

        {/* Info Usuario */}
        <div className="flex justify-between items-center mt-0">
          <div className="flex items-center gap-2.5 ml-3">
             <div className="w-6 h-6 rounded-full overflow-hidden">
               <img src={currentAvatar} className="w-full h-full object-cover" alt="u" />
             </div>
             <div className="flex flex-col justify-center h-8">
                <div className="flex items-baseline gap-2">
                   <span className="font-semibold text-[13px] drop-shadow-md">{username}</span>
                   <span className="text-white/70 text-[11px] font-light drop-shadow-md">{time}</span>
                </div>
             </div>
          </div>
          <div className="flex gap-5 items-center pr-1 opacity-100">
             <Icons.Dots />
             <Icons.Close />
          </div>
        </div>
      </div>

      {/* STICKER */}
      <div className="absolute inset-x-0 bottom-40 z-20 flex justify-center">
         <button className="bg-white text-black h-[38px] px-4 rounded-full flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform cursor-default">
            <div className="flex items-center justify-center"><Icons.Repost /></div>
            <span className="text-[14px] font-bold tracking-normal leading-none mt-[1px] antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
               Agregar a tu historia
            </span>
         </button>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-0 w-full px-4 pb-4 z-20 flex items-center gap-4">
        <div className="flex-1 h-[50px]">
          <input type="text" placeholder="Responde a esta historia..." className="w-full h-full bg-transparent border-[1px] border-white/10 rounded-full px-6 text-white placeholder-white/80 text-[15px] outline-none" />
        </div>
        <div className="flex items-center pl-1">
          <button onClick={() => setIsLiked(!isLiked)} className="active:scale-90 transition-transform">
            <Icons.Heart filled={isLiked} />
          </button>
        </div>
      </div>
    </div>
  );
}