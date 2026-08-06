import { getProfileById } from "../data/profiles";
import type { MatchRecord } from "../lib/storage";
import { Avatar } from "../components/Avatar";

interface MatchesProps {
  matches: MatchRecord[];
  onOpenChat: (profileId: string) => void;
}

export function Matches({ matches, onOpenChat }: MatchesProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <span className="text-4xl">💜</span>
        <h2 className="font-display text-2xl text-cream">Aún no tienes matches</h2>
        <p className="max-w-[28ch] text-sm text-cream-dim">
          Desliza a la derecha en Descubrir para empezar a conectar con gente de Querétaro.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-6">
      <h1 className="font-display text-3xl text-cream">Tus matches</h1>
      <p className="mt-1 text-sm text-cream-dim">{matches.length} conexión{matches.length === 1 ? "" : "es"} esperando</p>

      <ul className="mt-6 space-y-2">
        {matches.map((match) => {
          const profile = getProfileById(match.profileId);
          if (!profile) return null;
          const lastMessage = match.messages[match.messages.length - 1];
          return (
            <li key={match.profileId}>
              <button
                type="button"
                onClick={() => onOpenChat(match.profileId)}
                className="flex w-full items-center gap-3 rounded-2xl border border-line bg-panel px-3 py-3 text-left transition hover:border-jacaranda/60 hover:bg-panel-raised"
              >
                <div className="rounded-arch-sm h-14 w-14 shrink-0 overflow-hidden">
                  <Avatar name={profile.name} seed={profile.id} shape="fill" textClassName="text-2xl" className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-lg text-cream">{profile.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cream-dim">
                      {profile.colonia}
                    </span>
                  </div>
                  <p className="truncate text-sm text-cream-dim">
                    {lastMessage ? (lastMessage.from === "me" ? "Tú: " : "") + lastMessage.text : "Nuevo match — di hola"}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
