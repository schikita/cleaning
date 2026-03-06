"use client"


import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  fallback?: string
  size?: "sm" | "default" | "lg"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback, size = "default", ...props }, ref) => {
    const [error, setError] = React.useState(false)

    const normalizedSrc = React.useMemo(() => {
      if (!src) return undefined
      const s = src.trim()
      if (!s || s === "string") return undefined
      if (
        s.startsWith("http://") ||
        s.startsWith("https://") ||
        s.startsWith("/") ||
        s.startsWith("data:")
      ) {
        return s
      }
      return undefined
    }, [src])

    const sizes = {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-14 w-14",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-gray-100",
          sizes[size],
          className
        )}
        {...props}
      >
        {normalizedSrc && !error ? (
          <img
            src={normalizedSrc}
            alt={fallback}
            className="aspect-square h-full w-full"
            onError={() => setError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-600">
            {fallback?.charAt(0).toUpperCase() || "?"}
          </span>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }