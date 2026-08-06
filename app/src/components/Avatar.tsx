import { initials, themeById, themeForSeed } from "../lib/avatar";

interface AvatarProps {
  name: string;
  themeId?: string;
  seed?: string;
  shape?: "fill" | "arch" | "arch-sm" | "circle";
  textClassName?: string;
  className?: string;
}

export function Avatar({ name, themeId, seed, shape = "arch", textClassName = "text-3xl", className = "" }: AvatarProps) {
  const theme = themeId ? themeById(themeId) : themeForSeed(seed ?? name);
  const shapeClass =
    shape === "circle" ? "rounded-full" : shape === "arch-sm" ? "rounded-arch-sm" : shape === "arch" ? "rounded-arch" : "";

  return (
    <div
      className={`flex items-center justify-center ${shapeClass} ${className}`}
      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
    >
      <span className={`font-display italic text-cream/95 ${textClassName}`} aria-hidden="true">
        {initials(name)}
      </span>
    </div>
  );
}
