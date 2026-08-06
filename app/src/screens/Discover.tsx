import type { Profile } from "../data/profiles";
import { SwipeDeck, type SwipeDirection } from "../components/SwipeDeck";

interface DiscoverProps {
  profiles: Profile[];
  onSwipe: (profile: Profile, direction: SwipeDirection) => void;
}

export function Discover({ profiles, onSwipe }: DiscoverProps) {
  return (
    <div className="flex h-full flex-col">
      <header className="px-5 pb-3 pt-5">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-2xl italic text-cream">Arcos</h1>
          <span className="font-mono text-[11px] uppercase tracking-wider text-cantera">Querétaro</span>
        </div>
        <div className="arch-frieze mt-3 h-4 w-full opacity-80" />
      </header>

      <div className="relative flex-1 px-5 pb-24 pt-1">
        <SwipeDeck profiles={profiles} onSwipe={onSwipe} />
      </div>
    </div>
  );
}
