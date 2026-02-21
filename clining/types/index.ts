export type UserRole = 'client' | 'performer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  rating: number
  completedOrders: number
}

export type OrderQuality = 'economy' | 'standard' | 'premium'

export interface Order {
  id: string
  title: string
  description: string
  category: string
  quality: OrderQuality
  budget: number | 'negotiable'
  address: string
  city: string
  date: Date
  client: User
  responsesCount: number
  createdAt: Date
}

export interface PerformerStats {
  level: 'new' | 'bronze' | 'silver' | 'gold' | 'platinum'
  xp: number
  xpToNext: number
  credits: number
  bonusCredits: number
}