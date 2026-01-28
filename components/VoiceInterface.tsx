
import React, { useState, useEffect } from 'react';
import { Room } from '../types';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, UserPlus, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceInterfaceProps {
  room: Room;
  onEndCall: () => void;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ room, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
    >
      <div className="bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-3xl p-6 shadow-2xl ring-1 ring-violet-500/20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute inset-0 bg-violet-400 opacity-20"
               />
               <Volume2 className="text-white relative z-10" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{room.name} Voice</h3>
              <p className="text-xs text-violet-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Voice Connected • {formatTime(duration)}
              </p>
            </div>
          </div>
          <button className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:bg-zinc-700 transition-colors">
            <Maximize2 size={20} />
          </button>
        </div>

        {/* Visualizer Simulation */}
        <div className="flex justify-center items-end gap-1.5 h-16 mb-8">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [10, Math.random() * 50 + 10, 10],
                backgroundColor: isMuted ? '#3f3f46' : '#8b5cf6' 
              }}
              transition={{ repeat: Infinity, duration: 0.5 + Math.random(), delay: i * 0.05 }}
              className="w-1.5 rounded-full"
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <button 
            onClick={onEndCall}
            className="w-20 h-14 bg-red-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition-all hover:scale-105 active:scale-95"
          >
            <PhoneOff size={24} />
          </button>

          <button 
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${!isSpeakerOn ? 'bg-zinc-700 text-zinc-100' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
          >
            {isSpeakerOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-between items-center px-2">
           <div className="flex -space-x-2">
             {[...Array(4)].map((_, i) => (
               <img key={i} src={`https://picsum.photos/seed/call${i}/100`} className="w-8 h-8 rounded-full border-2 border-zinc-900" alt="member" />
             ))}
             <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] text-zinc-500">+2</div>
           </div>
           <button className="flex items-center gap-2 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors">
             <UserPlus size={14} /> Invite Friends
           </button>
        </div>
      </div>
    </motion.div>
  );
};
