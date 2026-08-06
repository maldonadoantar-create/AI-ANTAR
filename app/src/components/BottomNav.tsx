export type Tab = "discover" | "matches" | "profile";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  matchCount: number;
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "discover", label: "Descubrir", icon: "⌢" },
  { id: "matches", label: "Matches", icon: "♥" },
  { id: "profile", label: "Perfil", icon: "☺" },
];

export function BottomNav({ active, onChange, matchCount }: BottomNavProps) {
  return (
    <nav className="flex border-t border-line bg-panel px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className="relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition"
          >
            <span className={`text-xl ${isActive ? "text-arco" : "text-cream-dim"}`}>{tab.icon}</span>
            <span className={`text-[11px] ${isActive ? "font-semibold text-cream" : "text-cream-dim"}`}>
              {tab.label}
            </span>
            {tab.id === "matches" && matchCount > 0 && (
              <span className="absolute right-[22%] top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-arco px-1 font-mono text-[9px] text-cream">
                {matchCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
