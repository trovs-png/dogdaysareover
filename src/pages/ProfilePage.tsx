import { useState } from "react";
import {
  ChevronRight,
  Clock,
  Bot,
  Bell,
  Settings,
  LogOut,
  Smartphone,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ProfilePage() {
  const [silenceOnReply, setSilenceOnReply] = useState(true);
  const [resumeAfterMinutes, setResumeAfterMinutes] = useState([15]);
  const [aiGloballyPaused, setAiGloballyPaused] = useState(false);

  const userName = "Carlos";
  const businessName = "Barbearia do Carlos";
  const whatsappConnected = true;

  return (
    <div className="px-4 pt-6 pb-4 animate-fade-in">
      {/* Profile Header */}
      <header className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] ring-1 ring-white/10">
          <span className="text-2xl font-bold text-white">C</span>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-white tracking-tight">{userName}</h1>
          <p className="text-sm text-zinc-500">{businessName}</p>
        </div>
        <button className="touch-target touch-scale p-2.5 rounded-xl glass-card">
          <Settings className="w-5 h-5 text-zinc-400" />
        </button>
      </header>

      {/* WhatsApp Connection Status */}
      <section className="mb-6">
        <div
          className={cn(
            "p-4 rounded-2xl flex items-center gap-3 backdrop-blur-2xl transition-all duration-500",
            whatsappConnected
              ? "bg-white/[0.02] border border-emerald-500/20 ring-1 ring-inset ring-emerald-500/10 shadow-[0_8px_32px_0_rgba(16,185,129,0.08)]"
              : "bg-white/[0.02] border border-red-500/20 ring-1 ring-inset ring-red-500/10 shadow-[0_8px_32px_0_rgba(239,68,68,0.08)]"
          )}
        >
          <div
            className={cn(
              "p-2.5 rounded-xl",
              whatsappConnected ? "bg-emerald-500/10" : "bg-red-500/10"
            )}
          >
            <Smartphone
              className={cn(
                "w-5 h-5",
                whatsappConnected ? "text-emerald-400" : "text-red-400"
              )}
            />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white tracking-tight">
              WhatsApp {whatsappConnected ? "Conectado" : "Desconectado"}
            </p>
            <p className="text-xs text-zinc-500">
              {whatsappConnected
                ? "+55 11 99999-1234"
                : "Reconecte para receber mensagens"}
            </p>
          </div>
          {!whatsappConnected && (
            <button className="px-3 py-1.5 bg-white/10 text-white text-sm font-medium rounded-lg touch-scale hover:bg-white/20 transition-all">
              Reconectar
            </button>
          )}
        </div>
      </section>

      {/* AI Settings */}
      <section className="mb-6">
        <h2 className="text-xs font-medium text-zinc-500 mb-3 uppercase tracking-widest">
          Assistente IA
        </h2>

        <div className="space-y-3">
          {/* Global Pause Alert */}
          {aiGloballyPaused && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-red-500/20 ring-1 ring-inset ring-red-500/10 flex items-center gap-3 mb-4 shadow-[0_8px_32px_0_rgba(239,68,68,0.08)]">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-sm text-white font-medium">
                IA está pausada globalmente
              </p>
            </div>
          )}

          {/* Silence on Reply */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-500/10">
                  <Bot className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="font-bold text-white tracking-tight">
                    Silenciar ao responder
                  </p>
                  <p className="text-xs text-zinc-500">
                    IA pausa quando você responde manualmente
                  </p>
                </div>
              </div>
              <Switch
                checked={silenceOnReply}
                onCheckedChange={setSilenceOnReply}
              />
            </div>
          </div>

          {/* Resume Timer */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white tracking-tight">
                  Retomar IA após silêncio
                </p>
                <p className="text-xs text-zinc-500">
                  Tempo para IA voltar a responder
                </p>
              </div>
              <StatusBadge variant="info">{resumeAfterMinutes[0]} min</StatusBadge>
            </div>
            <Slider
              value={resumeAfterMinutes}
              onValueChange={setResumeAfterMinutes}
              min={5}
              max={60}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-2">
              <span>5 min</span>
              <span>60 min</span>
            </div>
          </div>

          {/* Emergency Pause */}
          <button
            onClick={() => setAiGloballyPaused(!aiGloballyPaused)}
            className={cn(
              "w-full p-4 rounded-2xl touch-scale transition-all duration-500 flex items-center justify-center gap-2 backdrop-blur-2xl",
              aiGloballyPaused
                ? "bg-white/[0.02] border border-emerald-500/20 ring-1 ring-inset ring-emerald-500/10 text-emerald-400 shadow-[0_8px_32px_0_rgba(16,185,129,0.08)]"
                : "bg-white/[0.02] border border-red-500/20 ring-1 ring-inset ring-red-500/10 text-red-400 shadow-[0_8px_32px_0_rgba(239,68,68,0.08)]"
            )}
          >
            {aiGloballyPaused ? (
              <>
                <Bot className="w-5 h-5" />
                <span className="font-bold tracking-tight">Retomar IA em todas as conversas</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold tracking-tight">Pausar IA em todas as conversas</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Quick Settings */}
      <section>
        <h2 className="text-xs font-medium text-zinc-500 mb-3 uppercase tracking-widest">
          Configurações
        </h2>

        <div className="glass-card rounded-2xl overflow-hidden">
          {[
            { icon: Clock, label: "Horários de trabalho" },
            { icon: Bell, label: "Notificações" },
            { icon: Settings, label: "Preferências" },
          ].map((item, i) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 p-4 touch-scale text-left transition-all hover:bg-white/[0.03]",
                i !== 2 && "border-b border-white/[0.05]"
              )}
            >
              <item.icon className="w-5 h-5 text-zinc-500" />
              <span className="flex-1 font-bold text-white tracking-tight">
                {item.label}
              </span>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full mt-4 p-4 rounded-2xl touch-scale flex items-center justify-center gap-2 bg-white/[0.02] border border-red-500/20 ring-1 ring-inset ring-red-500/10 text-red-400 transition-all duration-500 hover:bg-red-500/10 shadow-[0_8px_32px_0_rgba(239,68,68,0.06)]">
          <LogOut className="w-5 h-5" />
          <span className="font-bold tracking-tight">Sair da conta</span>
        </button>
      </section>
    </div>
  );
}