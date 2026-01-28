
import React from 'react';
import { User } from '../types';
import { Shield, X, Users, AlertTriangle, Activity, Database, Key } from 'lucide-react';

interface AdminPanelProps {
  user: User;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user, onClose }) => {
  const stats = [
    { label: 'Active Users', value: '1,284', icon: Users, color: 'text-blue-500' },
    { label: 'Private Rooms', value: '452', icon: Key, color: 'text-violet-500' },
    { label: 'Reports', value: '12', icon: AlertTriangle, color: 'text-amber-500' },
    { label: 'CPU Usage', value: '18%', icon: Activity, color: 'text-green-500' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Shield className="text-violet-500" /> Vyne Command Center
          </h2>
          <p className="text-zinc-500 mt-1">System wide monitoring and moderation.</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={20} className={stat.color} />
              <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">REALTIME</span>
            </div>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Recent Logs */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-3xl border border-zinc-800 flex flex-col">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2"><Database size={16} className="text-zinc-500" /> Server Logs</h3>
            <button className="text-[10px] text-violet-400 font-bold uppercase hover:underline">Export CSV</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[11px]">
            <div className="p-2 bg-zinc-950 rounded border-l-2 border-green-500">
              <span className="text-zinc-600">[2023-10-27 14:22:01]</span> <span className="text-green-500">INFO:</span> New room created (ID: r932) by User u1
            </div>
            <div className="p-2 bg-zinc-950 rounded border-l-2 border-amber-500">
              <span className="text-zinc-600">[2023-10-27 14:23:45]</span> <span className="text-amber-500">WARN:</span> Multiple failed code attempts for Room r2
            </div>
            <div className="p-2 bg-zinc-950 rounded border-l-2 border-violet-500">
              <span className="text-zinc-600">[2023-10-27 14:25:12]</span> <span className="text-violet-500">AI:</span> Gemini auto-flagged message "buy cheap coin..." as SPAM
            </div>
            <div className="p-2 bg-zinc-950 rounded border-l-2 border-blue-500">
              <span className="text-zinc-600">[2023-10-27 14:26:00]</span> <span className="text-blue-500">SYS:</span> WebRTC signaling node u-west-1 scale up complete
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 flex flex-col">
          <div className="p-4 border-b border-zinc-800">
             <h3 className="font-bold flex items-center gap-2"><AlertTriangle size={16} className="text-red-500" /> Active Reports</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 group hover:border-red-500/30 transition-all">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
                   <div className="flex-1">
                     <p className="text-xs font-bold">Harassment Report</p>
                     <p className="text-[10px] text-zinc-500">Reported by @User_A9</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <button className="flex-1 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-500 transition-colors">BAN USER</button>
                   <button className="flex-1 py-1.5 bg-zinc-800 text-zinc-300 text-[10px] font-bold rounded-lg hover:bg-zinc-700 transition-colors">DISMISS</button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
