import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

type ViewMode = "day" | "month";

// Mock busy data
const mockBusyDays = [3, 7, 12, 15, 18, 22, 25, 28];
const mockAppointments = [
  { time: "09:00", duration: 60, title: "Maria Silva - Corte" },
  { time: "11:00", duration: 45, title: "João Santos - Barba" },
  { time: "14:30", duration: 90, title: "Pedro Costa - Corte + Barba" },
  { time: "17:00", duration: 30, title: "Lucas - Sobrancelha" },
];

const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const hour = 7 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { locale: ptBR });
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: addDays(endOfMonth(currentDate), 6 - endOfMonth(currentDate).getDay()),
  });

  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="px-4 pt-6 pb-4 animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Calendário</h1>

        {/* View Toggle */}
        <div className="flex glass-card rounded-xl p-1">
          <button
            onClick={() => setViewMode("day")}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 touch-scale",
              viewMode === "day"
                ? "bg-white/10 text-white shadow-[0_0_15px_-5px_rgba(255,255,255,0.3)]"
                : "text-zinc-500 hover:text-zinc-400"
            )}
          >
            Dia
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 touch-scale",
              viewMode === "month"
                ? "bg-white/10 text-white shadow-[0_0_15px_-5px_rgba(255,255,255,0.3)]"
                : "text-zinc-500 hover:text-zinc-400"
            )}
          >
            Mês
          </button>
        </div>
      </header>

      {viewMode === "month" ? (
        /* Month View */
        <div className="animate-fade-in">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPrevMonth}
              className="touch-target touch-scale p-2.5 rounded-xl glass-card"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <h2 className="text-lg font-bold text-white capitalize tracking-tight">
              {format(currentDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <button
              onClick={goToNextMonth}
              className="touch-target touch-scale p-2.5 rounded-xl glass-card"
            >
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
              <div
                key={i}
                className="text-center text-xs font-medium text-zinc-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              const dayNum = day.getDate();
              const isBusy = mockBusyDays.includes(dayNum);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelected = isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDate(day);
                    setViewMode("day");
                  }}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-xl touch-scale transition-all duration-300",
                    isCurrentMonth
                      ? "text-white"
                      : "text-zinc-600",
                    isSelected && "bg-white/10 text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] ring-1 ring-white/20",
                    isTodayDate && !isSelected && "ring-1 ring-white/20",
                    !isSelected && "hover:bg-white/[0.03]"
                  )}
                >
                  <span className="text-sm font-medium">{dayNum}</span>
                  {/* Busy Indicator Dots */}
                  {isBusy && isCurrentMonth && !isSelected && (
                    <div className="flex gap-0.5 mt-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(16,185,129,0.6)]" />
                      <span className="w-1 h-1 rounded-full bg-orange-400 shadow-[0_0_4px_rgba(249,115,22,0.6)]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Day View */
        <div className="animate-fade-in">
          {/* Day Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, -1))}
              className="touch-target touch-scale p-2.5 rounded-xl glass-card"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold text-white capitalize tracking-tight">
                {format(selectedDate, "EEEE", { locale: ptBR })}
              </h2>
              <p className="text-sm text-zinc-500">
                {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              className="touch-target touch-scale p-2.5 rounded-xl glass-card"
            >
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Time Grid */}
          <div className="relative">
            {timeSlots.map((time) => {
              const appointment = mockAppointments.find(
                (a) => a.time === time
              );

              return (
                <div key={time} className="flex min-h-[60px] border-t border-white/[0.05]">
                  {/* Time Label */}
                  <div className="w-14 py-2 text-xs text-zinc-500 font-medium">
                    {time}
                  </div>

                  {/* Slot */}
                  <div className="flex-1 py-1.5 pl-2">
                    {appointment ? (
                      <div className="flex gap-3 card-glow-confirmed rounded-lg p-3 touch-scale">
                        {/* Glowing Pill */}
                        <div className="glow-pill glow-pill-confirmed" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-white tracking-tight">
                            {appointment.title}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {appointment.duration} min
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}