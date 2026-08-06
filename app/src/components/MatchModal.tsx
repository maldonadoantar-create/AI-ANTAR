import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Profile } from "../data/profiles";
import type { OwnProfile } from "../lib/storage";
import { Avatar } from "./Avatar";

interface MatchModalProps {
  me: OwnProfile;
  them: Profile;
  onSendMessage: () => void;
  onKeepBrowsing: () => void;
}

const CONFETTI_COLORS = ["var(--color-arco)", "var(--color-jacaranda)", "var(--color-gold)", "var(--color-cantera)"];

export function MatchModal({ me, them, onSendMessage, onKeepBrowsing }: MatchModalProps) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.4 + Math.random() * 1.1,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 5 + Math.random() * 5,
        rotate: Math.random() * 360,
      })),
    [],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-dusk-deep/92 px-6 backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className="absolute top-0 rounded-sm"
            style={{ left: `${c.left}%`, width: c.size, height: c.size * 1.6, background: c.color }}
            initial={{ y: -30, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: c.rotate }}
            transition={{ delay: c.delay, duration: c.duration, ease: "easeIn" }}
          />
        ))}
      </div>

      <div className="relative flex w-full max-w-sm flex-col items-center text-center animate-rise">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Dos historias se cruzaron</p>
        <h2 id="match-title" className="mt-2 font-display text-4xl italic text-cream">
          ¡Es un match!
        </h2>

        <div
          className="rounded-arch relative mt-8 flex h-56 w-64 items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--color-arco), var(--color-jacaranda))" }}
        >
          <motion.div
            initial={{ x: -90, rotate: -8, opacity: 0 }}
            animate={{ x: -22, rotate: -6, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.15 }}
            className="absolute h-32 w-32 overflow-hidden rounded-full border-4 border-dusk-deep shadow-xl"
          >
            <Avatar name={me.name} themeId={me.avatarTheme} shape="fill" textClassName="text-5xl" className="h-full w-full" />
          </motion.div>
          <motion.div
            initial={{ x: 90, rotate: 8, opacity: 0 }}
            animate={{ x: 22, rotate: 6, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.15 }}
            className="absolute h-32 w-32 overflow-hidden rounded-full border-4 border-dusk-deep shadow-xl"
          >
            <Avatar name={them.name} seed={them.id} shape="fill" textClassName="text-5xl" className="h-full w-full" />
          </motion.div>
        </div>

        <p className="mt-6 max-w-[30ch] text-sm text-cream-dim">
          A ti y a <span className="text-cream">{them.name}</span> les gustó algo del otro. Rompe el hielo antes de
          que se enfríe el café.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={onSendMessage}
            className="w-full rounded-full bg-arco py-3.5 font-display text-lg font-semibold text-cream shadow-[var(--shadow-pop)] transition hover:brightness-110 active:scale-[0.99]"
          >
            Enviar mensaje
          </button>
          <button
            type="button"
            onClick={onKeepBrowsing}
            className="w-full rounded-full border border-line py-3 text-sm text-cream-dim transition hover:border-cream-dim hover:text-cream"
          >
            Seguir viendo perfiles
          </button>
        </div>
      </div>
    </div>
  );
}
