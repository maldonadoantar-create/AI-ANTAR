import { useEffect, useRef, useState } from "react";
import { getProfileById } from "../data/profiles";
import { addMessage, pickOpener, type ChatMessage, type MatchRecord } from "../lib/storage";
import { Avatar } from "../components/Avatar";

interface ChatProps {
  match: MatchRecord;
  onBack: () => void;
  onMessagesChange: (messages: ChatMessage[]) => void;
}

const REPLIES = [
  "Jaja me late. ¿Cuándo nos vemos por un café en el centro?",
  "Totalmente de acuerdo, ¡qué buena vibra!",
  "Oye, ¿ya conoces el mirador de La Cañada? Te va a encantar.",
  "Jajaja, cuéntame más de eso.",
  "¿Te late un plan este fin en la Plaza de Armas?",
];

function pickReply(seed: number) {
  return REPLIES[seed % REPLIES.length];
}

export function Chat({ match, onBack, onMessagesChange }: ChatProps) {
  const profile = getProfileById(match.profileId);
  const [messages, setMessages] = useState<ChatMessage[]>(match.messages);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  if (!profile) return null;

  const sendMessage = (text: string, from: ChatMessage["from"]) => {
    const message: ChatMessage = { id: crypto.randomUUID(), from, text, at: Date.now() };
    addMessage(match.profileId, message);
    setMessages((prev) => {
      const next = [...prev, message];
      onMessagesChange(next);
      return next;
    });
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const wasFirstMessage = messages.length === 0;
    sendMessage(text, "me");

    setTyping(true);
    window.setTimeout(
      () => {
        setTyping(false);
        sendMessage(wasFirstMessage ? pickOpener(profile.id) : pickReply(text.length + messages.length), "them");
      },
      900 + Math.random() * 700,
    );
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-line bg-panel px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver a matches"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-cream-dim transition hover:bg-panel-raised hover:text-cream"
        >
          ←
        </button>
        <div className="rounded-arch-sm h-10 w-10 overflow-hidden">
          <Avatar name={profile.name} seed={profile.id} shape="fill" textClassName="text-lg" className="h-full w-full" />
        </div>
        <div>
          <p className="font-display text-lg leading-tight text-cream">{profile.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-cream-dim">{profile.colonia}</p>
        </div>
      </header>

      <div ref={listRef} className="flex flex-1 flex-col justify-end gap-2 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-cream-dim">
            Rompe el hielo con {profile.name}. ¿Qué te gustaría preguntarle?
          </p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                m.from === "me"
                  ? "rounded-br-sm bg-arco text-cream"
                  : "rounded-bl-sm bg-panel-raised text-cream"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <p className="rounded-2xl rounded-bl-sm bg-panel-raised px-4 py-2 text-sm text-cream-dim">escribiendo…</p>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2 border-t border-line bg-panel px-3 py-3"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escribe un mensaje…"
          className="flex-1 rounded-full border border-line bg-dusk px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/60 focus:border-arco focus:outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Enviar mensaje"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-arco text-cream shadow-[var(--shadow-pop)] transition disabled:opacity-40"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
