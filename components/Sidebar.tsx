
import React from 'react';
import { Room, User } from '../types';
import { Hash, Plus, Users, Shield, Lock, Compass, LogOut, PhoneIncoming } from 'lucide-react';

interface SidebarProps {
  rooms: Room[];
  activeRoomId: string;
  onSelectRoom: (id: string) => void;
  onOpenMatch: () => void;
  onOpenJoin: () => void;
  onOpenAdmin: () => void;
  user: User;
  onSimulateCall: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  rooms, 
  activeRoomId, 
  onSelectRoom, 
  onOpenMatch, 
  onOpenJoin,
  onOpenAdmin,
  user,
  onSimulateCall
}) => {
  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
      {/* App Logo/Branding */}
      <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <span className="font-bold text-white italic">V</span>
        </div>
        <h1 className="font-bold text-lg tracking-tight neon-text">VYNE</h1>
      </div>

      {/* Utilities Section */}
      <div className="p-2 space-y-1">
        <button 
          onClick={onOpenJoin}
          className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-md transition-all text-sm group"
        >
          <div className="bg-zinc-800 p-1.5 rounded-md group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-colors">
            <Lock size={16} />
          </div>
          Join by Code
        </button>
        <button 
          onClick={onOpenMatch}
          className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-md transition-all text-sm group"
        >
          <div className="bg-zinc-800 p-1.5 rounded-md group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-colors">
            <Compass size={16} />
          </div>
          Find Friends
        </button>
        {(user.role === 'admin' || user.role === 'owner') && (
          <button 
            onClick={onOpenAdmin}
            className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-md transition-all text-sm group"
          >
            <div className="bg-zinc-800 p-1.5 rounded-md group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-colors">
              <Shield size={16} />
            </div>
            Admin Panel
          </button>
        )}
        <button 
          onClick={onSimulateCall}
          className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-md transition-all text-sm group"
        >
          <div className="bg-zinc-800 p-1.5 rounded-md group-hover:bg-green-600/20 group-hover:text-green-400 transition-colors">
            <PhoneIncoming size={16} />
          </div>
          Test iPhone Call
        </button>
      </div>

      <div className="px-4 py-2 mt-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
        Private Rooms
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm group ${
              activeRoomId === room.id 
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/10' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {room.isPrivate ? <Lock size={14} className="opacity-60" /> : <Hash size={14} className="opacity-60" />}
            <span className="truncate flex-1 text-left">{room.name}</span>
          </button>
        ))}
      </div>

      {/* User Status Bar */}
      <div className="p-3 bg-zinc-950/50 border-t border-zinc-800 flex items-center gap-3">
        <div className="relative">
          <img src={user.avatarUrl} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-zinc-700" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-semibold truncate">{user.username}</p>
          <p className="text-[10px] text-zinc-500 truncate">{user.friendCode}</p>
        </div>
        <button className="text-zinc-500 hover:text-red-400 transition-colors">
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};
