
import React, { useState, useEffect } from 'react';
import { User, MatchScore } from '../types';
import { geminiService } from '../services/geminiService';
import { X, Sparkles, UserPlus, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatcherProps {
  currentUser: User;
  allUsers: User[];
  onClose: () => void;
}

export const Matcher: React.FC<MatcherProps> = ({ currentUser, allUsers, onClose }) => {
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      const candidates = allUsers.filter(u => u.id !== currentUser.id);
      const results = await geminiService.getFriendMatches(currentUser, candidates);
      setMatches(results);
      setIsLoading(false);
    };
    fetchMatches();
  }, [currentUser, allUsers]);

  const getUserById = (id: string) => allUsers.find(u => u.id === id);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black neon-text flex items-center gap-3">
            <Sparkles className="text-violet-500" /> Discover Your Vybe
          </h2>
          <p className="text-zinc-500 mt-1">AI-powered matching based on your interests and location.</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="relative w-24 h-24">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 border-4 border-violet-600/20 border-t-violet-600 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-violet-500 animate-pulse" size={32} />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold mb-1">Analyzing Connections...</h3>
            <p className="text-sm text-zinc-500">Gemini is finding friends that match your profile.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-12">
          {matches.map((match, idx) => {
            const user = getUserById(match.userId);
            if (!user) return null;
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={match.userId}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-violet-600/40 transition-all group"
              >
                <div className="h-24 bg-gradient-to-r from-violet-900/40 to-indigo-900/40 relative">
                  <div className="absolute -bottom-10 left-6">
                    <img src={user.avatarUrl} className="w-20 h-20 rounded-2xl border-4 border-zinc-900 object-cover" alt="avatar" />
                  </div>
                  <div className="absolute top-4 right-4 bg-zinc-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 flex items-center gap-1.5">
                    <Heart size={14} className="text-red-500 fill-red-500" />
                    <span className="text-xs font-bold">{match.score}/10 Match</span>
                  </div>
                </div>
                
                <div className="pt-12 p-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {user.username}
                    <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">NEW</span>
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">{user.country} • {user.language}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.interests.map(interest => (
                      <span key={interest} className="text-[10px] font-bold uppercase tracking-wider bg-violet-600/10 text-violet-400 px-2 py-0.5 rounded">
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase">Why you'll match:</p>
                    {match.reasons.map((reason, i) => (
                      <div key={i} className="flex gap-2 text-xs text-zinc-300">
                        <span className="text-violet-500">•</span>
                        {reason}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                      <UserPlus size={18} /> Add Friend
                    </button>
                    <button className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 rounded-xl flex items-center justify-center transition-all">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
