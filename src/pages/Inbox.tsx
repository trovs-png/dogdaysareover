import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { LedIndicator } from "@/components/ui/led-indicator";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const mockContacts = [
  { id: 1, name: "Maria Santos", lastMessage: "Olá, gostaria de agendar...", time: "10:30", unread: 2, aiActive: true },
  { id: 2, name: "Pedro Lima", lastMessage: "Confirmado para amanhã!", time: "09:15", unread: 0, aiActive: false },
  { id: 3, name: "Ana Costa", lastMessage: "Preciso remarcar", time: "Ontem", unread: 1, aiActive: true },
  { id: 4, name: "Carlos Mendes", lastMessage: "Qual o valor do corte?", time: "Ontem", unread: 0, aiActive: true },
];

const mockMessages = [
  { id: 1, sender: "client", text: "Olá, gostaria de agendar um corte para amanhã", time: "10:25" },
  { id: 2, sender: "ai", text: "Olá Maria! 👋 Claro, temos horários disponíveis amanhã. Qual período fica melhor para você: manhã ou tarde?", time: "10:26" },
  { id: 3, sender: "client", text: "Prefiro à tarde, depois das 14h", time: "10:28" },
  { id: 4, sender: "ai", text: "Perfeito! Temos disponível às 14:30 ou 16:00. Qual prefere?", time: "10:29" },
  { id: 5, sender: "client", text: "14:30 está ótimo!", time: "10:30" },
];

const Inbox = () => {
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const selectedContactData = mockContacts.find((c) => c.id === selectedContact);

  if (selectedContact && selectedContactData) {
    return (
      <div className="flex flex-col h-screen bg-[#050505]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 pt-12 border-b border-white/5">
          <button
            onClick={() => setSelectedContact(null)}
            className="p-2 -ml-2 text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="text-white font-medium">{selectedContactData.name}</p>
            <div className="flex items-center gap-2">
              <LedIndicator status={selectedContactData.aiActive ? "ai" : "offline"} size="sm" />
              <span className="text-white/40 text-xs">
                {selectedContactData.aiActive ? "IA ativa" : "IA pausada"}
              </span>
            </div>
          </div>
          <button className="p-2 text-[#5D00FF]">
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[80%] p-3 rounded-2xl",
                msg.sender === "client"
                  ? "bg-zinc-800/50 ml-auto rounded-br-sm"
                  : "bg-[#5D00FF]/10 border border-[#5D00FF]/20 mr-auto rounded-bl-sm"
              )}
            >
              {msg.sender === "ai" && (
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-[#5D00FF]" />
                  <span className="text-[#5D00FF] text-xs">IA</span>
                </div>
              )}
              <p className="text-white text-sm">{msg.text}</p>
              <p className="text-white/30 text-xs mt-1 text-right">{msg.time}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 bg-white/5 rounded-full p-2 pl-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none"
            />
            <button className="p-2 bg-[#5D00FF] rounded-full">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="pt-8 pb-4">
        <p className="text-white/40 text-sm">Conversas</p>
        <h1 className="text-2xl font-semibold text-white">Inbox</h1>
      </div>

      {/* Contact List */}
      <div className="space-y-2">
        {mockContacts.map((contact) => (
          <GlassCard
            key={contact.id}
            interactive
            className="p-4"
            onClick={() => setSelectedContact(contact.id)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {contact.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                {contact.aiActive && (
                  <div className="absolute -bottom-0.5 -right-0.5 p-1 bg-[#050505] rounded-full">
                    <LedIndicator status="ai" size="sm" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">{contact.name}</p>
                  <span className="text-white/30 text-xs">{contact.time}</span>
                </div>
                <p className="text-white/40 text-sm truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#5D00FF] flex items-center justify-center">
                  <span className="text-white text-xs">{contact.unread}</span>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
