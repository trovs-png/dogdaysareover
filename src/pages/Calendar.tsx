import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { LedIndicator } from "@/components/ui/led-indicator";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const mockAppointments = [
  { id: 1, time: "09:00", client: "Carlos Mendes", service: "Corte + Barba", status: "confirmed" as const },
  { id: 2, time: "10:30", client: "Roberto Alves", service: "Corte Degradê", status: "pending" as const },
  { id: 3, time: "14:00", client: "João Silva", service: "Barba", status: "confirmed" as const },
  { id: 4, time: "15:30", client: "Lucas Santos", service: "Corte", status: "cancelled" as const },
  { id: 5, time: "17:00", client: "Felipe Costa", service: "Corte + Barba", status: "confirmed" as const },
];

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const today = new Date();

  const getVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "lime";
      case "pending":
        return "indigo";
      case "cancelled":
        return "fuchsia";
      default:
        return undefined;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return { label: "Confirmado", led: "online" as const };
      case "pending":
        return { label: "Pendente", led: "pending" as const };
      case "cancelled":
        return { label: "Cancelado", led: "offline" as const };
      default:
        return { label: status, led: "offline" as const };
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="pt-8 pb-4">
        <p className="text-white/40 text-sm">
          {today.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </p>
        <h1 className="text-2xl font-semibold text-white">Agenda</h1>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {daysOfWeek.map((day, index) => {
          const date = new Date(today);
          date.setDate(today.getDate() - today.getDay() + index);
          const isSelected = index === selectedDay;
          const isToday = date.toDateString() === today.toDateString();

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              className={cn(
                "flex flex-col items-center min-w-[48px] py-3 px-2 rounded-xl transition-all",
                isSelected
                  ? "bg-white/10 border border-white/20"
                  : "bg-white/[0.02] border border-transparent"
              )}
            >
              <span className="text-white/40 text-xs">{day}</span>
              <span
                className={cn(
                  "text-lg font-semibold mt-1",
                  isSelected ? "text-white" : "text-white/60"
                )}
              >
                {date.getDate()}
              </span>
              {isToday && (
                <div className="w-1 h-1 rounded-full bg-[#CFFF04] mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="space-y-3 mt-4">
        {mockAppointments.map((apt) => {
          const { label, led } = getStatusLabel(apt.status);
          return (
            <GlassCard
              key={apt.id}
              variant={getVariant(apt.status)}
              interactive
              className="p-4"
            >
              <div className="flex items-start gap-4">
                <div className="text-center">
                  <p className="text-white font-semibold">{apt.time}</p>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{apt.client}</p>
                  <p className="text-white/40 text-sm">{apt.service}</p>
                </div>
                <div className="flex items-center gap-2">
                  <LedIndicator status={led} size="sm" />
                  <span className="text-white/40 text-xs">{label}</span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
