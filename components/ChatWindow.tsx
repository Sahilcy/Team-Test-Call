
import React, { useState, useEffect, useRef } from 'react';
import { Room, User, Message } from '../types';
import { Send, Phone, Video, MoreVertical, Image as ImageIcon, Smile, Mic, MessageSquare } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { soundService } from '../services/soundService';

interface ChatWindowProps {
  room: Room;
  user: User;
  onStartCall: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ room, user, onStartCall }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulated initial messages
    setMessages([
      { id: 'm1', roomId: room.id, senderId: 'u2', type: 'text', content: 'Hey everyone, welcome to the room!', createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'm2', roomId: room.id, senderId: 'u3', type: 'text', content: 'Testing out the new encryption.', createdAt: new Date(Date.now() - 1800000).toISOString() }
    ]);
  }, [room.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    // Play sound if the last message is from someone else
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.senderId !== user.id) {
        soundService.playNotification();
      }
    }
  }, [messages, user.id]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      senderId: user.id,
      type: 'text',
      content: inputValue,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    const currentMsg = inputValue;
    setInputValue('');

    // Gemini Auto-moderation check (background)
    const mod = await geminiService.checkModeration(currentMsg);
    if (!mod.safe) {
      setMessages(prev => prev.map(m => 
        m.id === newMessage.id ? { ...m, content: '[MESSAGE BLOCKED BY ADMIN: ' + mod.reason + ']' } : m
      ));
    }
  };

  const simulateIncomingMessage = () => {
    const responses = [
      "That's interesting, tell me more!",
      "I agree with that point.",
      "Wait, what happened next?",
      "Checking the logs now.",
      "Vyne is looking smooth today!"
    ];
    const randomMsg = responses[Math.floor(Math.random() * responses.length)];
    
    const incoming: Message = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      senderId: 'u' + (Math.floor(Math.random() * 3) + 2),
      type: 'text',
      content: randomMsg,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, incoming]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950">
      {/* Header */}
      <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="text-zinc-500">#</div>
          <h2 className="font-semibold text-zinc-100">{room.name}</h2>
          {room.isPrivate && <span className="bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded text-zinc-400 uppercase tracking-widest font-bold">Encrypted</span>}
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <button 
            onClick={simulateIncomingMessage} 
            title="Simulate Messenger Sound"
            className="hover:text-blue-400 transition-colors"
          >
            <MessageSquare size={20} />
          </button>
          <button onClick={onStartCall} className="hover:text-violet-400 transition-colors"><Phone size={20} /></button>
          <button className="hover:text-violet-400 transition-colors cursor-not-allowed opacity-50"><Video size={20} /></button>
          <div className="w-[1px] h-4 bg-zinc-800"></div>
          <button className="hover:text-zinc-100 transition-colors"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="pb-8 pt-12 text-center border-b border-zinc-900 mb-8">
          <div className="w-16 h-16 bg-violet-600/10 text-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">#</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">Welcome to {room.name}!</h3>
          <p className="text-zinc-500 text-sm">This is the start of your private conversation in this room.</p>
        </div>

        {messages.map((msg, i) => {
          const isMe = msg.senderId === user.id;
          return (
            <div key={msg.id} className={`flex gap-4 group ${isMe ? 'flex-row-reverse' : ''}`}>
              {!isMe && <img src={`https://picsum.photos/seed/${msg.senderId}/200`} className="w-10 h-10 rounded-full bg-zinc-800" alt="avatar" />}
              <div className={`max-w-[70%] ${isMe ? 'items-end' : ''}`}>
                <div className={`flex items-baseline gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs font-bold text-zinc-300">{isMe ? 'You' : `User_${msg.senderId.slice(-4)}`}</span>
                  <span className="text-[10px] text-zinc-500">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-900/50">
        <div className="relative flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-2 focus-within:border-violet-600/50 transition-all">
          <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors"><ImageIcon size={20} /></button>
          <input 
            type="text" 
            placeholder={`Message #${room.name}...`}
            className="flex-1 bg-transparent border-none outline-none text-zinc-100 py-2 px-1 text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <div className="flex items-center gap-1">
            <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors"><Mic size={20} /></button>
            <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors"><Smile size={20} /></button>
            <button 
              onClick={handleSend}
              className={`p-2 rounded-lg transition-all ${inputValue.trim() ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-zinc-600'}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-zinc-600 mt-2 px-2">Messages are encrypted end-to-end. Vyne doesn't store your private conversations.</p>
      </div>
    </div>
  );
};
