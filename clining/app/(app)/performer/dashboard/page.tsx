import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LiveTicker } from "@/components/client/LiveTicker";
import {
  Briefcase,
  Star,
  TrendingUp,
  Clock,
  Zap,
  Gift,
  Award,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const skills = [
  { name: "Скорость", level: 7, max: 10, effect: "+35% к видимости" },
  { name: "Коммуникация", level: 5, max: 10, effect: "Цветная карточка" },
  { name: "Экономия", level: 3, max: 10, effect: "15% шанс" },
  { name: "Качество", level: 6, max: 10, effect: "+0.2 к рейтингу" },
];

export default function PerformerDashboard() {
  return (
    <div>
      <LiveTicker />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Дашборд исполнителя</h1>
            <p className="text-gray-500">
              Управляйте заказами и развивайте профиль
            </p>
          </div>
          <Link href="/performer/feed">
            <Button>Найти заказы</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-xs">Активные</span>
                  </div>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Star className="h-4 w-4" />
                    <span className="text-xs">Рейтинг</span>
                  </div>
                  <div className="text-2xl font-bold">4.9</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs">Заработано</span>
                  </div>
                  <div className="text-2xl font-bold">4 500 Br</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Отклик</span>
                  </div>
                  <div className="text-2xl font-bold">4 мин</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Card */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-2xl">
                    G
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Золото</h3>
                    <p className="text-sm text-gray-500">2 450 / 3 000 XP</p>
                  </div>
                </div>
                <Progress value={2450} max={3000} className="mb-2" />
                <Badge className="bg-yellow-100 text-yellow-800">
                  82% до платины
                </Badge>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Навыки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-500">
                        {skill.level}/{skill.max}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${(skill.level / skill.max) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{skill.effect}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Gift className="h-4 w-4 text-purple-500" />
                  Сундуки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Ежедневный сундук</div>
                      <div className="text-sm text-gray-500">
                        До 10 кредитов
                      </div>
                    </div>
                    <Button size="sm">Открыть</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
