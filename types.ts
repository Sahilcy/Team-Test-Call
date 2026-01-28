
export type UserRole = 'user' | 'moderator' | 'admin' | 'owner';

export interface User {
  id: string;
  username: string;
  friendCode: string;
  avatarUrl: string;
  bio: string;
  country: string;
  language: string;
  role: UserRole;
  interests: string[];
}

export interface Room {
  id: string;
  name: string;
  isPrivate: boolean;
  accessCode?: string;
  createdBy: string;
  members: string[]; // User IDs
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  type: 'text' | 'image' | 'video' | 'voice';
  content: string; // URL or text content
  createdAt: string;
}

export interface MatchScore {
  userId: string;
  score: number;
  reasons: string[];
}
