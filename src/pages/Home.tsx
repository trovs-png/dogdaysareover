import { GlassCard } from "@/components/ui/glass-card";
import { LedIndicator } from "@/components/ui/led-indicator";
import { TrendingUp, Clock, Activity } from "lucide-react";

const Home = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-8 pb-4">
        <p className="text-white/40 text-sm">Olá,</p>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Revenue Card - Full Width */}
        <GlassCard variant="lime" className="col-span-2 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">Receita Hoje</p>
              <p className="text-3xl font-bold text-[#CFFF04] mt-1">R$ 450</p>
              <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#CFFF04]" />
                +12% vs ontem
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#CFFF04]/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#CFFF04]" />
            </div>
          </div>
        </GlassCard>

        {/* Next Client */}
        <GlassCard variant="indigo" className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[#5D00FF]" />
            <p className="text-white/40 text-xs uppercase tracking-wider">Próximo</p>
          </div>
          <p className="text-white font-medium">João Silva</p>
          <p className="text-white/40 text-sm">14:30 - Corte</p>
          <div className="flex items-center gap-2 mt-2">
            <LedIndicator status="online" size="sm" />
            <span className="text-xs text-white/40">Confirmado</span>
          </div>
        </GlassCard>

        {/* Today Stats */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-white/40" />
            <p className="text-white/40 text-xs uppercase tracking-wider">Hoje</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white/40 text-sm">Agendados</span>
              <span className="text-white font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 text-sm">Concluídos</span>
              <span className="text-white font-medium">3</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <GlassCard className="p-4">
        <h2 className="text-white font-medium mb-4">Atividade Recente</h2>
        <div className="space-y-3">
          {[
            { name: "Maria Santos", action: "agendou", time: "há 5min", status: "ai" as const },
            { name: "Pedro Lima", action: "confirmou", time: "há 15min", status: "online" as const },
            { name: "Ana Costa", action: "cancelou", time: "há 1h", status: "offline" as const },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <LedIndicator status={item.status} size="sm" />
              <div className="flex-1">
                <p className="text-white text-sm">
                  <span className="font-medium">{item.name}</span>{" "}
                  <span className="text-white/40">{item.action}</span>
                </p>
              </div>
              <span className="text-white/30 text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Home;
