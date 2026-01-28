
import React, { useState } from 'react';
import { X, Hash, ChevronRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoomJoinerProps {
  onJoin: (code: string) => boolean;
  onClose: () => void;
}

export const RoomJoiner: React.FC<RoomJoinerProps> = ({ onJoin, onClose }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleDial = (num: string) => {
    if (code.length < 8) {
      setCode(prev => prev + num);
      setError('');
    }
  };

  const handleDelete = () => {
    setCode(prev => prev.slice(0, -1));
  };

  const handleJoin = () => {
    const success = onJoin(code);
    if (!success) {
      setError('Invalid or expired room code');
      setCode('');
    }
  };

  const dialPad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '*', '0', '#'
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-violet-600/10 text-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-violet-600/20">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Access Secure Room</h2>
          <p className="text-zinc-500 text-sm">Enter the private 8-digit access code (e.g., *8100#)</p>
        </div>

        <div className={`mb-8 p-6 bg-zinc-900 rounded-3xl border-2 transition-all ${error ? 'border-red-500/50' : 'border-zinc-800 focus-within:border-violet-600'}`}>
          <div className="flex justify-center gap-2 mb-2">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`w-8 h-10 border-b-2 flex items-center justify-center text-xl font-bold ${
                  code[i] ? 'border-violet-500 text-white' : 'border-zinc-700 text-zinc-700'
                }`}
              >
                {code[i] || '•'}
              </div>
            ))}
          </div>
          {error && <p className="text-center text-xs text-red-500 mt-4 animate-bounce">{error}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {dialPad.map(val => (
            <button 
              key={val}
              onClick={() => handleDial(val)}
              className="w-full aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 text-xl font-bold hover:bg-zinc-800 active:bg-violet-600 active:scale-95 transition-all flex items-center justify-center"
            >
              {val}
            </button>
          ))}
          <div className="col-span-1"></div>
          <button 
            onClick={handleDelete}
            className="w-full aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 text-sm font-bold hover:bg-red-500/10 hover:text-red-500 active:scale-95 transition-all flex items-center justify-center"
          >
            DEL
          </button>
          <div className="col-span-1"></div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-zinc-900 text-zinc-400 font-bold rounded-2xl hover:bg-zinc-800 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleJoin}
            disabled={code.length < 4}
            className="flex-2 w-[60%] py-4 bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-xl shadow-violet-600/20 hover:bg-violet-500 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Enter Room <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
