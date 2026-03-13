"use client";

import { useState, useMemo } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

function toYMD(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function fromYMD(s: string): Date | null {
    if (!s) return null;
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d;
}

function getMonthGrid(viewDate: Date): { date: Date; isCurrentMonth: boolean }[] {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    // Понедельник = 0
    const firstWeekday = (first.getDay() + 6) % 7;
    const startPadding = firstWeekday;
    const totalDays = last.getDate();
    const totalCells = 42; // 6 weeks
    const grid: { date: Date; isCurrentMonth: boolean }[] = [];

    // Предыдущий месяц
    for (let i = 0; i < startPadding; i++) {
        const d = new Date(year, month, 1 - (startPadding - i));
        grid.push({ date: d, isCurrentMonth: false });
    }
    // Текущий месяц
    for (let day = 1; day <= totalDays; day++) {
        grid.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    // Следующий месяц до 42 ячеек
    const remaining = totalCells - grid.length;
    for (let i = 1; i <= remaining; i++) {
        grid.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return grid;
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isToday(d: Date): boolean {
    const t = new Date();
    return isSameDay(d, t);
}

function isBefore(a: Date, b: Date): boolean {
    return new Date(a.getFullYear(), a.getMonth(), a.getDate()) < new Date(b.getFullYear(), b.getMonth(), b.getDate());
}

interface DatePickerDropdownProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    /** Минимальная допустимая дата (в формате YYYY-MM-DD). Более ранние даты будут заблокированы. */
    minDate?: string;
}

export function DatePickerDropdown({
    value,
    onChange,
    placeholder = "Выберите дату",
    className,
    minDate,
}: DatePickerDropdownProps) {
    const parsed = fromYMD(value);
    const minParsed = minDate ? fromYMD(minDate) : null;
    const [viewDate, setViewDate] = useState(() => parsed || new Date());
    const [open, setOpen] = useState(false);

    const displayText = value ? (() => {
        const d = fromYMD(value);
        if (!d) return value;
        return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
    })() : placeholder;

    const grid = useMemo(() => getMonthGrid(viewDate), [viewDate]);
    const selectedDate = parsed ? parsed.getTime() : null;

    const handleDayClick = (d: Date) => {
        if (minParsed && isBefore(d, minParsed)) return;
        onChange(toYMD(d));
        setOpen(false);
    };

    const goPrevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
    const goNextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));

    const goToToday = () => {
        const t = new Date();
        if (minParsed && isBefore(t, minParsed)) return;
        setViewDate(t);
        onChange(toYMD(t));
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        "w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-left text-slate-900 dark:text-white",
                        "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0",
                        "hover:border-slate-300 dark:hover:border-slate-600 transition-colors",
                        "flex items-center gap-2",
                        !value && "text-slate-500 dark:text-slate-400",
                        className
                    )}
                >
                    <CalendarIcon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden />
                    <span>{displayText}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-auto p-0 overflow-hidden rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg"
            >
                <div className="p-3">
                    {/* Месяц / год и навигация */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={goPrevMonth}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Предыдущий месяц"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                        </span>
                        <button
                            type="button"
                            onClick={goNextMonth}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Следующий месяц"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Дни недели */}
                    <div className="grid grid-cols-7 gap-0.5 mb-1">
                        {WEEKDAYS.map((day) => (
                            <div
                                key={day}
                                className="h-8 flex items-center justify-center text-xs font-medium text-slate-500 dark:text-slate-400"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Сетка дней */}
                    <div className="grid grid-cols-7 gap-0.5">
                        {grid.map(({ date, isCurrentMonth }, i) => {
                            const ts = date.getTime();
                            const selected = selectedDate === ts;
                            const today = isToday(date);
                            const disabled = minParsed ? isBefore(date, minParsed) : false;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => handleDayClick(date)}
                                    className={cn(
                                        "h-9 rounded-lg text-sm transition-colors",
                                        disabled
                                            ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                                            : isCurrentMonth
                                                ? "text-slate-900 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
                                                : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                                        selected && !disabled && "bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 font-medium",
                                        today && !selected && !disabled && "ring-1 ring-cyan-500/50 ring-inset font-medium"
                                    )}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={goToToday}
                        className="mt-2 w-full py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                    >
                        Сегодня
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
