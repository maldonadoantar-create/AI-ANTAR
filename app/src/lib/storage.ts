import type { Profile } from "../data/profiles";

export interface OwnProfile {
  name: string;
  age: number;
  colonia: string;
  bio: string;
  interests: string[];
  avatarTheme: string;
}

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
  at: number;
}

export interface MatchRecord {
  profileId: string;
  matchedAt: number;
  messages: ChatMessage[];
}

const KEYS = {
  ownProfile: "arcos.ownProfile",
  swiped: "arcos.swiped",
  matches: "arcos.matches",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getOwnProfile(): OwnProfile | null {
  return read<OwnProfile | null>(KEYS.ownProfile, null);
}

export function saveOwnProfile(profile: OwnProfile) {
  write(KEYS.ownProfile, profile);
}

export function getSwiped(): Record<string, "liked" | "passed" | "superliked"> {
  return read(KEYS.swiped, {});
}

export function recordSwipe(profileId: string, action: "liked" | "passed" | "superliked") {
  const swiped = getSwiped();
  swiped[profileId] = action;
  write(KEYS.swiped, swiped);
}

export function getMatches(): MatchRecord[] {
  return read<MatchRecord[]>(KEYS.matches, []);
}

export function addMatch(profileId: string): MatchRecord {
  const matches = getMatches();
  const existing = matches.find((m) => m.profileId === profileId);
  if (existing) return existing;
  const record: MatchRecord = { profileId, matchedAt: Date.now(), messages: [] };
  matches.unshift(record);
  write(KEYS.matches, matches);
  return record;
}

export function addMessage(profileId: string, message: ChatMessage) {
  const matches = getMatches();
  const record = matches.find((m) => m.profileId === profileId);
  if (!record) return;
  record.messages.push(message);
  write(KEYS.matches, matches);
}

const OPENERS = [
  "¡Hola! Vi que también te gusta el café de olla, ¿ya fuiste al Mercado de la Cruz?",
  "¡Match! Oye, ¿conoces algún buen mirador para ver el Acueducto de noche?",
  "Hola, tu bio me convenció jaja. ¿Qué se hace un viernes en Querétaro según tú?",
  "¡Qué bueno el match! ¿Tardeo en la Plaza de Armas este fin?",
  "Hola :) ¿Ya subiste a la Peña de Bernal o sigue en la lista de pendientes?",
];

export function pickOpener(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return OPENERS[hash % OPENERS.length];
}

export function resetAll() {
  localStorage.removeItem(KEYS.ownProfile);
  localStorage.removeItem(KEYS.swiped);
  localStorage.removeItem(KEYS.matches);
}

export type { Profile };
