import { useState } from "react";
import { INTEREST_POOL, QUERETARO_COLONIAS } from "../data/profiles";
import { saveOwnProfile, type OwnProfile } from "../lib/storage";
import { AVATAR_THEMES } from "../lib/avatar";
import { Avatar } from "../components/Avatar";

interface ProfileProps {
  profile: OwnProfile;
  onSave: (profile: OwnProfile) => void;
  onReset: () => void;
}

export function Profile({ profile, onSave, onReset }: ProfileProps) {
  const [draft, setDraft] = useState<OwnProfile>(profile);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (tag: string) => {
    setDraft((prev) => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter((t) => t !== tag)
        : prev.interests.length >= 5
          ? prev.interests
          : [...prev.interests, tag],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    saveOwnProfile(draft);
    onSave(draft);
    setSaved(true);
  };

  return (
    <div className="px-5 py-6 pb-10">
      <h1 className="font-display text-3xl text-cream">Tu perfil</h1>
      <p className="mt-1 text-sm text-cream-dim">Así te ven las demás personas en Arcos.</p>

      <div className="mt-5 flex justify-center">
        <div className="rounded-arch h-40 w-40 overflow-hidden shadow-[var(--shadow-card)]">
          <Avatar name={draft.name} themeId={draft.avatarTheme} shape="fill" textClassName="text-6xl" className="h-full w-full" />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {AVATAR_THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => {
              setDraft((p) => ({ ...p, avatarTheme: theme.id }));
              setSaved(false);
            }}
            aria-label={`Elegir tema ${theme.label}`}
            aria-pressed={draft.avatarTheme === theme.id}
            title={theme.label}
            className={`h-10 w-10 overflow-hidden rounded-arch-sm border-2 transition ${
              draft.avatarTheme === theme.id ? "border-arco" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Avatar name={draft.name} themeId={theme.id} shape="fill" textClassName="text-sm" className="h-full w-full" />
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-dim">Nombre</span>
          <input
            value={draft.name}
            onChange={(e) => {
              setDraft((p) => ({ ...p, name: e.target.value }));
              setSaved(false);
            }}
            className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-cream focus:border-arco focus:outline-none"
          />
        </label>

        <div className="flex gap-4">
          <label className="block flex-1">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-dim">Edad</span>
            <input
              type="number"
              min={18}
              max={99}
              value={draft.age}
              onChange={(e) => {
                setDraft((p) => ({ ...p, age: Number(e.target.value) }));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-cream focus:border-arco focus:outline-none"
            />
          </label>
          <label className="block flex-[2]">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-dim">Colonia</span>
            <select
              value={draft.colonia}
              onChange={(e) => {
                setDraft((p) => ({ ...p, colonia: e.target.value }));
                setSaved(false);
              }}
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
            Sobre ti ({draft.bio.length}/140)
          </span>
          <textarea
            value={draft.bio}
            onChange={(e) => {
              setDraft((p) => ({ ...p, bio: e.target.value.slice(0, 140) }));
              setSaved(false);
            }}
            rows={3}
            className="w-full resize-none rounded-xl border border-line bg-panel px-4 py-3 text-cream focus:border-arco focus:outline-none"
          />
        </label>

        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-cream-dim">
            Tus intereses (hasta 5)
          </span>
          <div className="flex flex-wrap gap-2">
            {INTEREST_POOL.map((tag) => {
              const active = draft.interests.includes(tag);
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
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full rounded-full bg-arco py-3.5 font-display text-lg font-semibold text-cream shadow-[var(--shadow-pop)] transition hover:brightness-110 active:scale-[0.99]"
        >
          {saved ? "Cambios guardados ✓" : "Guardar cambios"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-full border border-line py-3 text-sm text-cream-dim transition hover:border-arco hover:text-arco"
        >
          Reiniciar demo
        </button>
      </div>
    </div>
  );
}
