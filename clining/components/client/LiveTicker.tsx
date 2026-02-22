'use client'

import { useState } from 'react'
import { Trophy, Gift, Star, Zap } from 'lucide-react'

const icons = {
  order_completed: Trophy,
  chest_opened: Gift,
  level_up: Star,
  response_purchase: Zap,
}

interface TickerEvent {
  id: string
  type: keyof typeof icons
  userName: string
  message: string
}

const events: TickerEvent[] = [
  { id: '1', type: 'order_completed', userName: 'Александр', message: 'выполнил заказ на клининг' },
  { id: '2', type: 'chest_opened', userName: 'Мария', message: 'получила 5 кредитов' },
  { id: '3', type: 'level_up', userName: 'Дмитрий', message: 'достиг уровня Золото' },
  { id: '4', type: 'response_purchase', userName: 'Анна', message: 'купила 15 кредитов' },
]

export function LiveTicker() {
  const [isPaused, setIsPaused] = useState(false)
  const duplicatedEvents = [...events, ...events]

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/50 dark:via-purple-950/50 dark:to-pink-950/50 border-y border-slate-200 dark:border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      
      <div 
        className={`flex gap-6 py-3 ${isPaused ? '' : 'animate-ticker'}`}
        style={{
          width: 'fit-content',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedEvents.map((event, index) => {
          const Icon = icons[event.type]
          return (
            <div 
              key={`${event.id}-${index}`}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm whitespace-nowrap"
            >
              <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-foreground">{event.userName}</span>
              <span className="text-sm text-muted-foreground">{event.message}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}