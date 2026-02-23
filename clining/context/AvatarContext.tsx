"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface AvatarContextValue {
  avatarVersion: number;
  refreshAvatar: () => void;
}

export const AvatarContext = createContext<AvatarContextValue | null>(null);

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarVersion, setAvatarVersion] = useState(0);

  const refreshAvatar = useCallback(() => {
    setAvatarVersion((v) => v + 1);
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarVersion, refreshAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatarRefresh() {
  const ctx = useContext(AvatarContext);
  return ctx?.refreshAvatar ?? (() => {});
}
