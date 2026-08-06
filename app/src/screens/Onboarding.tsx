import { useState } from "react";
import { INTEREST_POOL, QUERETARO_COLONIAS } from "../data/profiles";
import { saveOwnProfile, type OwnProfile } from "../lib/storage";
import { AVATAR_THEMES } from "../lib/avatar";
import { Avatar } from "../components/Avatar";

interface OnboardingProps {
  onComplete: (profile: OwnProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("25");
  const [colonia, setColonia] = useState(QUERETARO_COLONIAS[0]);
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [avatarTheme, setAvatarTheme] = useState<string>(AVATAR_THEMES[0].id);
  const [touched, setTouched] = useState(false);

  const toggleInterest = (tag: string) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length >= 5 ? prev : [...prev, tag],
    );
  };

  const isValid = name.trim().length >= 2 && bio.trim().length >= 10 && interests.length >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    const profile: OwnProfile = {
      name: name.trim(),
      age: Number(age),
      colonia,
      bio: bio.trim(),
      interests,
      avatarTheme,
    };
    saveOwnProfile(profile);
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-dusk-deep">
      <div className="relative overflow-hidden bg-dusk px-6 pb-10 pt-12 text-center">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(120% 90% at 50% -10%, rgba(240,113,79,0.35), transparent 60%)" }}
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cantera">Querétaro</p>
          <h1 className="mt-2 font-display text-5xl italic text-cream">Arcos</h1>
          <p className="mx-auto mt-3 max-w-[34ch] text-sm text-cream-dim">
            Como los 74 arcos del acueducto, cada match es un puente. Arma tu perfil y empieza a conocer gente en tu
            ciudad.
          </p>
        </div>
        <div className="arch-frieze relative mt-8 h-7 w-full" />
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6 px-6 py-8">
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-cream-dim">
            Tu medallón
          </span>
          <div className="flex flex-wrap gap-3">
            {AVATAR_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setAvatarTheme(theme.id)}
                aria-label={`Elegir tema ${theme.label}`}
                aria-pressed={avatarTheme === theme.id}
                title={theme.label}
                className={`h-14 w-14 overflow-hidden rounded-arch-sm border-2 transition ${
                  avatarTheme === theme.id ? "border-arco" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Avatar
                  name={name || "?"}
                  themeId={theme.id}
                  shape="fill"
                  textClassName="text-lg"
                  className="h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-dim">Nombre</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="¿Cómo te llamas?"
            maxLength={24}
            className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-cream placeholder:text-cream-dim/60 focus:border-arco focus:outline-none"
          />
          {touched && name.trim().length < 2 && <p className="mt-1 text-xs text-arco">Escribe tu nombre.</p>}
        </label>

        <div className="flex gap-4">
          <label className="block flex-1">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-dim">Edad</span>
            <input
              type="number"
              min={18}
              max={99}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-cream focus:border-arco focus:outline-none"
            />
          </label>
          <label className="block flex-[2]">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-dim">Colonia</span>
            <select
              value={colonia}
              onChange={(e) => setColonia(e.target.value)}
              className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-cream focus:border-arco focus:outline-none"
            >
              {QUERETARO_COLONIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-dim">
            Sobre ti ({bio.trim().length}/140)
          </span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 140))}
            rows={3}
            placeholder="Cuéntale a Querétaro qué te hace, tú."
            className="w-full resize-none rounded-xl border border-line bg-panel px-4 py-3 text-cream placeholder:text-cream-dim/60 focus:border-arco focus:outline-none"
          />
          {touched && bio.trim().length < 10 && (
            <p className="mt-1 text-xs text-arco">Cuéntanos un poco más (mínimo 10 caracteres).</p>
          )}
        </label>

        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-cream-dim">
            Tus intereses (elige hasta 5)
          </span>
          <div className="flex flex-wrap gap-2">
            {INTEREST_POOL.map((tag) => {
              const active = interests.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleInterest(tag)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    active
                      ? "border-jacaranda bg-jacaranda/20 text-jacaranda"
                      : "border-line text-cream-dim hover:border-cream-dim"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          {touched && interests.length === 0 && (
            <p className="mt-2 text-xs text-arco">Elige al menos un interés.</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-arco py-3.5 font-display text-lg font-semibold text-cream shadow-[var(--shadow-pop)] transition hover:brightness-110 active:scale-[0.99]"
        >
          Empezar a conocer gente
        </button>
      </form>
    </div>
  );
}
