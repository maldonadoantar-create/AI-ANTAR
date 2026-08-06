import { useEffect, useState } from "react";
import { MOCK_PROFILES, type Profile } from "./data/profiles";
import {
  addMatch,
  getMatches,
  getOwnProfile,
  getSwiped,
  recordSwipe,
  resetAll,
  type ChatMessage,
  type MatchRecord,
  type OwnProfile,
} from "./lib/storage";
import { Onboarding } from "./screens/Onboarding";
import { Discover } from "./screens/Discover";
import { Matches } from "./screens/Matches";
import { Chat } from "./screens/Chat";
import { Profile as ProfileScreen } from "./screens/Profile";
import { MatchModal } from "./components/MatchModal";
import { BottomNav, type Tab } from "./components/BottomNav";
import type { SwipeDirection } from "./components/SwipeDeck";

function App() {
  const [ownProfile, setOwnProfile] = useState<OwnProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("discover");
  const [queue, setQueue] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [matchModalProfile, setMatchModalProfile] = useState<Profile | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    const existing = getOwnProfile();
    setOwnProfile(existing);
    const swiped = getSwiped();
    setQueue(MOCK_PROFILES.filter((p) => !swiped[p.id]));
    setMatches(getMatches());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!ownProfile) {
    return (
      <Onboarding
        onComplete={(profile) => {
          setOwnProfile(profile);
        }}
      />
    );
  }

  const handleSwipe = (profile: Profile, direction: SwipeDirection) => {
    const action = direction === "like" ? "liked" : direction === "super" ? "superliked" : "passed";
    recordSwipe(profile.id, action);
    setQueue((q) => q.filter((p) => p.id !== profile.id));

    if (direction === "pass") return;

    const isMatch = direction === "super" || Math.random() < 0.6;
    if (isMatch) {
      addMatch(profile.id);
      setMatches(getMatches());
      setMatchModalProfile(profile);
    }
  };

  const handleReset = () => {
    resetAll();
    setOwnProfile(null);
    setQueue(MOCK_PROFILES);
    setMatches([]);
    setTab("discover");
    setActiveChatId(null);
  };

  const activeMatch = activeChatId ? matches.find((m) => m.profileId === activeChatId) ?? null : null;

  return (
    <div className="relative mx-auto flex h-[100svh] max-w-[480px] flex-col bg-dusk-deep shadow-2xl md:my-8 md:h-[calc(100svh-4rem)] md:rounded-[2rem] md:border md:border-line md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)] md:overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === "discover" && <Discover profiles={queue} onSwipe={handleSwipe} />}

        {tab === "matches" &&
          (activeMatch ? (
            <Chat
              match={activeMatch}
              onBack={() => setActiveChatId(null)}
              onMessagesChange={(messages: ChatMessage[]) => {
                setMatches((prev) =>
                  prev.map((m) => (m.profileId === activeMatch.profileId ? { ...m, messages } : m)),
                );
              }}
            />
          ) : (
            <Matches matches={matches} onOpenChat={setActiveChatId} />
          ))}

        {tab === "profile" && (
          <ProfileScreen profile={ownProfile} onSave={setOwnProfile} onReset={handleReset} />
        )}
      </div>

      {!(tab === "matches" && activeMatch) && (
        <BottomNav
          active={tab}
          onChange={(next) => {
            setTab(next);
            setActiveChatId(null);
          }}
          matchCount={matches.length}
        />
      )}

      {matchModalProfile && (
        <MatchModal
          me={ownProfile}
          them={matchModalProfile}
          onKeepBrowsing={() => setMatchModalProfile(null)}
          onSendMessage={() => {
            setActiveChatId(matchModalProfile.id);
            setTab("matches");
            setMatchModalProfile(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
