import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, type PanInfo } from "framer-motion";
import type { Profile } from "../data/profiles";
import { SwipeCard } from "./SwipeCard";

export type SwipeDirection = "like" | "pass" | "super";

interface SwipeDeckProps {
  profiles: Profile[];
  onSwipe: (profile: Profile, direction: SwipeDirection) => void;
}

const EXIT_DISTANCE = 700;
const DRAG_THRESHOLD = 110;
const SUPER_THRESHOLD = 100;

interface TopCardProps {
  profile: Profile;
  isTop: boolean;
  onExit: (direction: SwipeDirection) => void;
  externalTrigger: SwipeDirection | null;
}

function DraggableCard({ profile, isTop, onExit, externalTrigger }: TopCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-280, 280], [-14, 14]);
  const likeOpacity = useTransform(x, [20, 140], [0, 1]);
  const passOpacity = useTransform(x, [-140, -20], [1, 0]);
  const superOpacity = useTransform(y, [-120, -20], [1, 0]);
  const hasExited = useRef(false);

  const commit = (direction: SwipeDirection) => {
    if (hasExited.current) return;
    hasExited.current = true;
    const targetX = direction === "like" ? EXIT_DISTANCE : direction === "pass" ? -EXIT_DISTANCE : 0;
    const targetY = direction === "super" ? -EXIT_DISTANCE : direction === "like" || direction === "pass" ? -60 : 0;
    Promise.all([
      animate(x, targetX, { type: "spring", stiffness: 260, damping: 26 }),
      animate(y, targetY, { type: "spring", stiffness: 260, damping: 26 }),
    ]).then(() => onExit(direction));
  };

  useEffect(() => {
    if (externalTrigger && isTop) {
      commit(externalTrigger);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalTrigger, isTop]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset } = info;
    if (offset.y < -SUPER_THRESHOLD && Math.abs(offset.y) > Math.abs(offset.x)) {
      commit("super");
    } else if (offset.x > DRAG_THRESHOLD) {
      commit("like");
    } else if (offset.x < -DRAG_THRESHOLD) {
      commit("pass");
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, y, rotate, touchAction: "none" }}
      drag={isTop}
      dragElastic={0.85}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
    >
      <SwipeCard profile={profile}>
        <motion.div
          style={{ opacity: likeOpacity, borderColor: "var(--color-jacaranda)" }}
          className="absolute right-6 top-10 rotate-12 rounded-md border-4 px-3 py-1 font-display text-2xl font-semibold uppercase tracking-wide text-jacaranda"
        >
          Me gusta
        </motion.div>
        <motion.div
          style={{ opacity: passOpacity, borderColor: "var(--color-cream-dim)" }}
          className="absolute left-6 top-10 -rotate-12 rounded-md border-4 px-3 py-1 font-display text-2xl font-semibold uppercase tracking-wide text-cream-dim"
        >
          Paso
        </motion.div>
        <motion.div
          style={{ opacity: superOpacity, borderColor: "var(--color-gold)" }}
          className="absolute left-1/2 top-8 -translate-x-1/2 -rotate-3 rounded-md border-4 px-3 py-1 font-display text-2xl font-semibold uppercase tracking-wide text-gold"
        >
          Súper
        </motion.div>
      </SwipeCard>
    </motion.div>
  );
}

export function SwipeDeck({ profiles, onSwipe }: SwipeDeckProps) {
  const [queue, setQueue] = useState(profiles);
  const [pendingDirection, setPendingDirection] = useState<SwipeDirection | null>(null);
  const visible = useMemo(() => queue.slice(0, 3), [queue]);

  const handleExit = (profile: Profile, direction: SwipeDirection) => {
    onSwipe(profile, direction);
    setQueue((q) => q.filter((p) => p.id !== profile.id));
    setPendingDirection(null);
  };

  const triggerSwipe = (direction: SwipeDirection) => {
    if (!visible[0] || pendingDirection) return;
    setPendingDirection(direction);
  };

  if (visible.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-arch border border-dashed border-line px-8 text-center">
        <span className="text-4xl">🌵</span>
        <h3 className="font-display text-2xl text-cream">Por hoy es todo</h3>
        <p className="max-w-[26ch] text-sm text-cream-dim">
          Ya viste a todos los queretanos cerca de ti. Vuelve más tarde por caras nuevas.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {visible
        .map((profile, i) => ({ profile, i }))
        .reverse()
        .map(({ profile, i }) => {
          const isTop = i === 0;
          return (
            <div
              key={profile.id}
              className="absolute inset-0"
              style={
                isTop
                  ? undefined
                  : {
                      transform: `translateY(${i * 10}px) scale(${1 - i * 0.035})`,
                      opacity: i === 1 ? 0.9 : 0.7,
                    }
              }
            >
              <DraggableCard
                profile={profile}
                isTop={isTop}
                onExit={(direction) => handleExit(profile, direction)}
                externalTrigger={isTop ? pendingDirection : null}
              />
            </div>
          );
        })}
      <DeckActions onAction={triggerSwipe} disabled={!!pendingDirection} />
    </div>
  );
}

function DeckActions({
  onAction,
  disabled,
}: {
  onAction: (direction: SwipeDirection) => void;
  disabled: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-[74px] flex items-center justify-center gap-5">
      <button
        type="button"
        aria-label="Pasar"
        disabled={disabled}
        onClick={() => onAction("pass")}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-panel text-2xl text-cream-dim shadow-lg transition hover:scale-105 hover:text-arco active:scale-95 disabled:opacity-40"
      >
        ✕
      </button>
      <button
        type="button"
        aria-label="Súper like"
        disabled={disabled}
        onClick={() => onAction("super")}
        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel text-lg text-gold shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-40"
      >
        ★
      </button>
      <button
        type="button"
        aria-label="Me gusta"
        disabled={disabled}
        onClick={() => onAction("like")}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-arco text-2xl text-cream shadow-[var(--shadow-pop)] transition hover:scale-105 active:scale-95 disabled:opacity-40"
      >
        ♥
      </button>
    </div>
  );
}
