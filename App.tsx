
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { VoiceInterface } from './components/VoiceInterface';
import { Matcher } from './components/Matcher';
import { RoomJoiner } from './components/RoomJoiner';
import { AdminPanel } from './components/AdminPanel';
import { IncomingCallModal } from './components/IncomingCallModal';
import { User, Room } from './types';
import { MOCK_USERS, MOCK_ROOMS } from './constants';
import { soundService } from './services/soundService';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentUser] = useState<User>(MOCK_USERS[0]);
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [activeRoomId, setActiveRoomId] = useState<string>(MOCK_ROOMS[0].id);
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{ caller: User, room: Room } | null>(null);
  const [view, setView] = useState<'chat' | 'match' | 'admin' | 'join'>('chat');

  // Play/Stop ringtone based on incomingCall state
  useEffect(() => {
    if (incomingCall) {
      soundService.startRingtone();
    } else {
      soundService.stopRingtone();
    }
  }, [incomingCall]);

  const handleSelectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setView('chat');
  };

  const handleJoinRoomByCode = (code: string) => {
    const room = rooms.find(r => r.accessCode === code);
    if (room) {
      if (!room.members.includes(currentUser.id)) {
        room.members.push(currentUser.id);
      }
      handleSelectRoom(room.id);
      return true;
    }
    return false;
  };

  const simulateIncomingCall = () => {
    const caller = MOCK_USERS[1];
    const room = rooms[0];
    setIncomingCall({ caller, room });
  };

  const acceptCall = () => {
    setIncomingCall(null);
    setIsCalling(true);
    handleSelectRoom(incomingCall!.room.id);
  };

  const declineCall = () => {
    setIncomingCall(null);
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      <Sidebar 
        rooms={rooms} 
        activeRoomId={activeRoomId} 
        onSelectRoom={handleSelectRoom}
        onOpenMatch={() => setView('match')}
        onOpenJoin={() => setView('join')}
        onOpenAdmin={() => setView('admin')}
        user={currentUser}
        onSimulateCall={simulateIncomingCall}
      />

      <main className="flex-1 flex flex-col relative">
        <AnimatePresence>
          {incomingCall && (
            <IncomingCallModal 
              caller={incomingCall.caller} 
              room={incomingCall.room} 
              onAccept={acceptCall} 
              onDecline={declineCall} 
            />
          )}
        </AnimatePresence>

        {view === 'chat' && (
          <>
            <ChatWindow 
              room={rooms.find(r => r.id === activeRoomId)!} 
              user={currentUser}
              onStartCall={() => setIsCalling(true)}
            />
            {isCalling && (
              <VoiceInterface 
                room={rooms.find(r => r.id === activeRoomId)!} 
                onEndCall={() => setIsCalling(false)} 
              />
            )}
          </>
        )}

        {view === 'match' && (
          <Matcher 
            currentUser={currentUser} 
            allUsers={MOCK_USERS} 
            onClose={() => setView('chat')} 
          />
        )}

        {view === 'join' && (
          <RoomJoiner 
            onJoin={handleJoinRoomByCode} 
            onClose={() => setView('chat')} 
          />
        )}

        {view === 'admin' && (
          <AdminPanel 
            user={currentUser} 
            onClose={() => setView('chat')} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
