"use client";

import { useRef, useState, useContext } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { AvatarContext } from "@/context/AvatarContext";

interface AvatarUploadProps {
  src?: string | null;
  fallback?: string;
  size?: "sm" | "default" | "lg";
  onSuccess?: () => void;
}

export function AvatarUpload({
  src,
  fallback = "?",
  size = "default",
  onSuccess,
}: AvatarUploadProps) {
  const refreshAvatar = useContext(AvatarContext)?.refreshAvatar;
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await fetch("/api/user/avatar", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? "Ошибка загрузки");
        return;
      }
      const newUrl = data.avatar ? `${data.avatar}?t=${Date.now()}` : null;
      setLocalAvatar(newUrl ?? data.avatar);
      window.dispatchEvent(new CustomEvent("avatar-updated"));
      refreshAvatar?.();
      onSuccess?.();
    } catch {
      alert("Ошибка загрузки");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  const displaySrc = localAvatar ?? src;

  return (
    <div className="relative inline-block">
      <Avatar src={displaySrc ?? undefined} fallback={fallback} size={size} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Camera className="w-4 h-4" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
