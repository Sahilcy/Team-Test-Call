
import { User, Room } from './types';

export const COLORS = {
  bg: 'bg-zinc-950',
  sidebar: 'bg-zinc-900',
  accent: 'violet-500',
  accentHover: 'violet-600',
  neon: '#8b5cf6'
};

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'NeoVyne',
    friendCode: 'VN-001',
    avatarUrl: 'https://picsum.photos/seed/neo/200',
    bio: 'Founder of VYNE. Let\'s build the future.',
    country: 'USA',
    language: 'English',
    role: 'owner',
    interests: ['coding', 'music', 'AI']
  },
  {
    id: 'u2',
    username: 'Astra_Girl',
    friendCode: 'VN-882',
    avatarUrl: 'https://picsum.photos/seed/astra/200',
    bio: 'Gamer and space enthusiast.',
    country: 'Canada',
    language: 'English',
    role: 'user',
    interests: ['gaming', 'astronomy', 'music']
  },
  {
    id: 'u3',
    username: 'Dev_Hiro',
    friendCode: 'VN-331',
    avatarUrl: 'https://picsum.photos/seed/hiro/200',
    bio: 'Coffee and code.',
    country: 'Japan',
    language: 'Japanese',
    role: 'admin',
    interests: ['coding', 'coffee', 'anime']
  },
  {
    id: 'u4',
    username: 'LunaCloud',
    friendCode: 'VN-991',
    avatarUrl: 'https://picsum.photos/seed/luna/200',
    bio: 'Art is life.',
    country: 'France',
    language: 'French',
    role: 'user',
    interests: ['art', 'photography', 'travel']
  }
];

export const MOCK_ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'General Lounge',
    isPrivate: false,
    createdBy: 'u1',
    members: ['u1', 'u2', 'u3', 'u4']
  },
  {
    id: 'r2',
    name: 'Dev Talk',
    isPrivate: true,
    accessCode: '*1337#',
    createdBy: 'u3',
    members: ['u1', 'u3']
  },
  {
    id: 'r3',
    name: 'Gaming Hub',
    isPrivate: false,
    createdBy: 'u2',
    members: ['u2', 'u4']
  }
];
