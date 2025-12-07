import { useState } from 'react';
import { X, Volume2, VolumeX, MoreHorizontal, Send, Heart } from 'lucide-react';

export function InstagramStory() {
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative w-full max-w-[480px] h-[calc(100vh-40px)] max-h-[850px] bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* Story background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519930808054-f7186bdbc1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBjb2xvcmZ1bCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY1MTI3ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content overlay */}
      <div className="relative h-full flex flex-col">
        {/* Top section: Progress bar + Header */}
        <div className="p-4 space-y-3 z-10">
          {/* Progress bar */}
          <div className="flex gap-1">
            <div className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full w-full bg-white rounded-full animate-progress" />
            </div>
          </div>

          {/* User info header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwxfHx8fDE3NjUxMjc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white text-sm">maria.gonzalez</span>
              <span className="text-white/70 text-sm">5 h</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:scale-110 transition-transform"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <button className="text-white hover:scale-110 transition-transform">
                <MoreHorizontal size={24} />
              </button>
              <button className="text-white hover:scale-110 transition-transform">
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle section: Story content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="text-center space-y-6">
            <p className="text-white text-2xl">
              ¡Pasándola increíble! 🎉
            </p>
            <div className="inline-block">
              <span className="text-white bg-blue-600/80 px-3 py-1.5 rounded-md backdrop-blur-sm">
                @tuusuario
              </span>
            </div>
          </div>
        </div>

        {/* "Te ha mencionado" notification bar */}
        <div className="absolute bottom-32 left-4 right-4 z-20">
          <div className="bg-[#1C1C1E] rounded-2xl p-4 shadow-lg animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-pink-500 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwxfHx8fDE3NjUxMjc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-white">
                  <span className="opacity-80">maria.gonzalez te ha mencionado en su historia</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section: Reply input */}
        <div className="p-4 z-10">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3">
              <input 
                type="text"
                placeholder="Enviar mensaje"
                className="w-full bg-transparent text-white placeholder-white/60 outline-none text-sm"
              />
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-all duration-300 ${isLiked ? 'scale-110' : ''}`}
            >
              <Heart 
                size={28} 
                className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-white'} transition-colors`}
              />
            </button>
            <button className="text-white hover:scale-110 transition-transform">
              <Send size={28} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        @keyframes slide-up {
          from { 
            transform: translateY(20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-progress {
          animation: progress 5s linear forwards;
          transform-origin: left;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
