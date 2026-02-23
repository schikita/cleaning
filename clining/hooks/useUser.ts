"use client";

import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { AvatarContext } from "@/context/AvatarContext";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role?: string;
  rating?: number;
  completed_orders?: number;
  phone?: string | null;
  city?: string | null;
  bio?: string | null;
  services?: string[] | null;
  badges?: string[] | null;
  created_at?: string | null;
}

export function useUser() {
  const { data: session, status } = useSession();
  const avatarContext = useContext(AvatarContext);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async (bustCache = false) => {
    if (!session?.user?.id) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const url = bustCache ? `/api/user/me?t=${Date.now()}` : "/api/user/me";
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.user) {
        const avatar = data.user.avatar;
        const avatarUrl = avatar && bustCache ? `${avatar}${avatar.includes("?") ? "&" : "?"}t=${Date.now()}` : avatar;
        setUser({
          id: data.user.id,
          name: data.user.name || session.user?.name || "",
          email: data.user.email || session.user?.email || "",
          avatar: avatarUrl ?? null,
          role: data.user.role,
          rating: data.user.rating,
          completed_orders: data.user.completed_orders,
          phone: data.user.phone ?? null,
          city: data.user.city ?? null,
          bio: data.user.bio ?? null,
          services: data.user.services ?? null,
          badges: data.user.badges ?? null,
          created_at: data.user.created_at ?? null,
        });
      } else {
        setUser({
          id: session.user!.id!,
          name: (session.user?.name as string) || "",
          email: (session.user?.email as string) || "",
          avatar: session.user?.image ?? null,
        });
      }
    } catch {
      setUser({
        id: session.user!.id!,
        name: (session.user?.name as string) || "",
        email: (session.user?.email as string) || "",
        avatar: session.user?.image ?? null,
      });
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, session?.user?.name, session?.user?.email, session?.user?.image]);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }
    if (!session?.user) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetchUser();
  }, [session, status, fetchUser]);

  useEffect(() => {
    const handler = () => fetchUser(true);
    window.addEventListener("avatar-updated", handler);
    return () => window.removeEventListener("avatar-updated", handler);
  }, [fetchUser]);

  useEffect(() => {
    if (avatarContext?.avatarVersion && avatarContext.avatarVersion > 0) {
      fetchUser(true);
    }
  }, [avatarContext?.avatarVersion, fetchUser]);

  return { user, loading, refresh: fetchUser };
}
