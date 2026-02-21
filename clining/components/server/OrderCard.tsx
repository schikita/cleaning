import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { MapPin, Calendar, Star, Briefcase, Crown, Zap } from "lucide-react"

interface OrderCardProps {
  order: {
    id: string
    title: string
    description: string
    category: string
    quality: 'economy' | 'standard' | 'premium'
    budget: number | 'negotiable'
    city: string
    date: Date
    client: { name: string; rating: number }
    responsesCount: number
  }
}

const qualityConfig = {
  economy: { label: 'Эконом', color: 'bg-amber-100 text-amber-800', icon: Briefcase },
  standard: { label: 'Стандарт', color: 'bg-blue-100 text-blue-800', icon: Star },
  premium: { label: 'Премиум', color: 'bg-purple-100 text-purple-800', icon: Crown },
}

export function OrderCard({ order }: OrderCardProps) {
  const quality = qualityConfig[order.quality]
  const QualityIcon = quality.icon
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={quality.color}>
                <QualityIcon className="h-3 w-3 mr-1" />
                {quality.label}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg">{order.title}</h3>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-indigo-600">
              {order.budget === 'negotiable' ? 'Договорная' : formatPrice(order.budget)}
            </div>
            <div className="text-xs text-gray-500">{order.responsesCount} откликов</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{order.description}</p>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {order.city}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(order.date).toLocaleDateString('ru-RU')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar fallback={order.client.name} size="sm" />
            <div className="text-sm">
              <div className="font-medium">{order.client.name}</div>
              <div className="text-gray-500">★ {order.client.rating}</div>
            </div>
          </div>
          <Button size="sm" className="gap-1">
            <Zap className="h-4 w-4" />
            Откликнуться
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}