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
        {src && !error ? (
          <img
            src={src}
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