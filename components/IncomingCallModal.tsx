
import React from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { User, Room } from '../types';

interface IncomingCallModalProps {
  caller: User;
  room: Room;
  onAccept: () => void;
  onDecline: () => void;
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({ caller, room, onAccept, onDecline }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-zinc-950/80 backdrop-blur-3xl flex flex-col items-center justify-between py-24"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-violet-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <img src={caller.avatarUrl} className="w-32 h-32 rounded-full border-2 border-zinc-800 relative z-10 object-cover" alt="caller" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-1">{caller.username}</h2>
        <p className="text-zinc-400 text-lg">VYNE Voice Call...</p>
      </div>

      <div className="w-full max-w-sm px-12 flex flex-col gap-12">
        <div className="flex justify-between items-center px-4">
            <button className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                    <MessageCircle size={20} className="text-white" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Message</span>
            </button>
            <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Calling from {room.name}</div>
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={onDecline}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:bg-red-400 transition-all active:scale-90">
              <X size={32} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white">Decline</span>
          </button>

          <button 
            onClick={onAccept}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:bg-green-400 transition-all animate-bounce active:scale-90">
              <Phone size={32} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white">Accept</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
