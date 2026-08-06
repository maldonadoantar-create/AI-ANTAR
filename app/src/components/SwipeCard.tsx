import { forwardRef } from "react";
import type { Profile } from "../data/profiles";
import { Avatar } from "./Avatar";

interface SwipeCardProps {
  profile: Profile;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const SwipeCard = forwardRef<HTMLDivElement, SwipeCardProps>(function SwipeCard(
  { profile, style, className = "", children },
  ref,
) {
  return (
    <div
      ref={ref}
      style={style}
      className={`rounded-arch absolute inset-0 overflow-hidden shadow-[var(--shadow-card)] select-none ${className}`}
    >
      <Avatar
        name={profile.name}
        seed={profile.id}
        shape="fill"
        textClassName="text-[7rem]"
        className="absolute inset-0 h-full w-full"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(26,16,32,0.96) 0%, rgba(26,16,32,0.72) 30%, rgba(26,16,32,0.05) 62%, transparent 75%)",
        }}
      />

      {children}

      <div className="absolute inset-x-0 bottom-0 p-5 pb-6">
        <div className="flex items-baseline gap-2">
          <h2 className="font-display text-3xl font-semibold text-cream">{profile.name}</h2>
          <span className="font-display text-2xl text-cream-dim">{profile.age}</span>
          {profile.verified && (
            <span
              aria-label="Perfil verificado"
              title="Perfil verificado"
              className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-jacaranda text-[11px] font-bold text-dusk-deep"
            >
              ✓
            </span>
          )}
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cantera">
          {profile.colonia} · {profile.distanceKm.toFixed(1)} km
        </p>
        <p className="mt-2 text-sm leading-snug text-cream/90">{profile.bio}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {profile.interests.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-panel/70 px-2.5 py-1 text-[11px] text-cream-dim backdrop-blur-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
