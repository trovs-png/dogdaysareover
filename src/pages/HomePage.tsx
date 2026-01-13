import { useState } from "react";
import { Bell, TrendingUp, Clock } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

// Mock data for visual prototype
const mockAppointments = [
  {
    id: "1",
    time: "09:00",
    clientName: "Maria Silva",
    service: "Corte + Barba",
    status: "confirmed" as const,
    depositPaid: 25,
    aiPaused: false,
  },
  {
    id: "2",
    time: "10:30",
    clientName: "João Santos",
    service: "Corte Masculino",
    status: "pending" as const,
    depositPaid: 0,
    aiPaused: true,
  },
  {
    id: "3",
    time: "12:00",
    clientName: "Pedro Costa",
    service: "Barba",
    status: "confirmed" as const,
    depositPaid: 15,
    aiPaused: false,
  },
  {
    id: "4",
    time: "14:00",
    clientName: "Lucas Oliveira",
    service: "Corte + Sobrancelha",
    status: "confirmed" as const,
    depositPaid: 0,
    aiPaused: false,
  },
  {
    id: "5",
    time: "15:30",
    clientName: "Rafael Lima",
    service: "Corte Degradê",
    status: "pending" as const,
    depositPaid: 20,
    aiPaused: false,
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default function HomePage() {
  const [hasNotifications] = useState(false);
  const userName = "Carlos";

  const todayRevenue = mockAppointments.length * 45; // Mock R$45 per service

  const nextAppointment = mockAppointments[0];

  return (
    <div className="px-4 pt-6 pb-4 animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {getGreeting()}, {userName} 👋
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Hoje, {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <button className="touch-target touch-scale relative p-2.5 rounded-xl glass-card">
          <Bell className="w-5 h-5 text-zinc-400" />
          {hasNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          )}
        </button>
      </header>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-2 gap-3 mb-6">
        {/* Today's Revenue */}
        <div className="bento-revenue p-4 group">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              Hoje
            </span>
          </div>
          <p className="text-3xl font-extrabold tracking-tighter text-price-gradient">
            R$ {todayRevenue}
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            {mockAppointments.length} agendamentos
          </p>
        </div>

        {/* Next Client */}
        <div className="bento-next p-4 group">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-violet-500/10">
              <Clock className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              Próximo
            </span>
          </div>
          <p className="text-lg font-bold text-white truncate tracking-tight">
            {nextAppointment.clientName}
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            {nextAppointment.time} • {nextAppointment.service}
          </p>
        </div>
      </section>

      {/* Today's Agenda Timeline */}
      <section>
        <h2 className="text-xs font-medium text-zinc-500 mb-3 uppercase tracking-widest">
          Agenda de Hoje
        </h2>
        <div className="space-y-3">
          {mockAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="flex gap-3 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Time Column */}
              <div className="w-12 text-sm font-medium text-zinc-500 pt-4">
                {appointment.time}
              </div>

              {/* Appointment Card with Glowing Pill */}
              <div
                className={cn(
                  "flex-1 flex gap-3 rounded-xl p-4 touch-scale overflow-hidden",
                  appointment.status === "confirmed"
                    ? "card-glow-confirmed"
                    : "card-glow-pending"
                )}
              >
                {/* Glowing Status Pill */}
                <div
                  className={cn(
                    "glow-pill",
                    appointment.status === "confirmed"
                      ? "glow-pill-confirmed"
                      : "glow-pill-pending"
                  )}
                />

                {/* Card Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-white truncate tracking-tight">
                        {appointment.clientName}
                      </h3>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {appointment.service}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <StatusBadge
                      variant={appointment.status === "confirmed" ? "success" : "warning"}
                    >
                      {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                    </StatusBadge>

                    {appointment.depositPaid > 0 && (
                      <StatusBadge variant="info">
                        Sinal R${appointment.depositPaid}
                      </StatusBadge>
                    )}

                    {appointment.aiPaused && (
                      <StatusBadge variant="destructive" icon={<span>🔴</span>}>
                        IA Pausada
                      </StatusBadge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}