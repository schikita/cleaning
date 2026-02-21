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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <LiveTicker />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Дашборд исполнителя
            </h1>
            <p className="text-muted-foreground mt-1">
              Управляйте заказами и развивайте профиль
            </p>
          </div>
          <Link href="/performer/feed" className="shrink-0">
            <Button>Найти заказы</Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs font-medium">Активные</span>
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium">Рейтинг</span>
              </div>
              <div className="text-2xl font-bold text-foreground">4.9</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium">Заработано</span>
              </div>
              <div className="text-2xl font-bold text-foreground">4 500 Br</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4 text-cyan-500" />
                <span className="text-xs font-medium">Отклик</span>
              </div>
              <div className="text-2xl font-bold text-foreground">4 мин</div>
            </CardContent>
          </Card>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Level Card */}
          <Card className="border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-amber-500/25">
                  G
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Золото</h3>
                  <p className="text-sm text-muted-foreground">2 450 / 3 000 XP</p>
                </div>
              </div>
              <Progress value={2450} max={3000} className="mb-3 h-2" />
              <Badge className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-0">
                82% до платины
              </Badge>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-amber-500" />
                Навыки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">
                      {skill.level}/{skill.max}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full transition-all"
                      style={{ width: `${(skill.level / skill.max) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{skill.effect}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chests */}
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Gift className="h-4 w-4 text-purple-500" />
                Сундуки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="font-medium text-foreground">Ежедневный сундук</div>
                    <div className="text-sm text-muted-foreground">До 10 кредитов</div>
                  </div>
                  <Button size="sm" className="shrink-0">Открыть</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
