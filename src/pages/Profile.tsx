import { GlassCard } from "@/components/ui/glass-card";
import { LedIndicator } from "@/components/ui/led-indicator";
import { CyberSlider } from "@/components/ui/cyber-slider";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare,
  Smartphone,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { icon: MessageSquare, label: "Mensagens Rápidas", chevron: true },
  { icon: Settings, label: "Configurações", chevron: true },
  { icon: CreditCard, label: "Assinatura", chevron: true },
  { icon: HelpCircle, label: "Ajuda", chevron: true },
  { icon: LogOut, label: "Sair", chevron: false, danger: true },
];

const Profile = () => {
  const isWhatsAppConnected = true;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="pt-8 pb-4">
        <p className="text-white/40 text-sm">Configurações</p>
        <h1 className="text-2xl font-semibold text-white">Perfil</h1>
      </div>

      {/* WhatsApp Status Card */}
      <GlassCard
        variant={isWhatsAppConnected ? "lime" : "fuchsia"}
        className="p-4 mb-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white/60" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">WhatsApp</p>
            <div className="flex items-center gap-2 mt-1">
              <LedIndicator
                status={isWhatsAppConnected ? "online" : "offline"}
                size="sm"
                pulse
              />
              <span className="text-white/40 text-sm">
                {isWhatsAppConnected ? "Conectado" : "Desconectado"}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* AI Settings */}
      <GlassCard variant="indigo" className="p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-[#5D00FF]" />
          <p className="text-white font-medium">Assistente IA</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Resposta automática</span>
            <Switch defaultChecked />
          </div>

          <CyberSlider
            label="Velocidade de resposta"
            defaultValue={[3]}
            max={10}
            min={1}
            step={1}
            showValue
            unit="s"
          />

          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Modo noturno</span>
            <Switch />
          </div>
        </div>
      </GlassCard>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <GlassCard
            key={index}
            interactive
            className="p-4"
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={`w-5 h-5 ${
                  item.danger ? "text-[#FF2E9A]" : "text-white/40"
                }`}
              />
              <span
                className={`flex-1 ${
                  item.danger ? "text-[#FF2E9A]" : "text-white"
                }`}
              >
                {item.label}
              </span>
              {item.chevron && (
                <ChevronRight className="w-4 h-4 text-white/20" />
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Profile;
