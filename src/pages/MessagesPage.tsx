import { useState } from "react";
import { Search, Bot, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock conversations
const mockConversations = [
  {
    id: "1",
    clientName: "Maria Silva",
    clientPhone: "+55 11 99999-1234",
    lastMessage: "Perfeito! Confirmo às 14h então. Obrigada!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    unreadCount: 2,
    isAiHandling: true,
    avatar: null,
  },
  {
    id: "2",
    clientName: "João Santos",
    clientPhone: "+55 11 98888-5678",
    lastMessage: "Quero agendar um corte pra amanhã, tem horário?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    unreadCount: 0,
    isAiHandling: true,
    avatar: null,
  },
  {
    id: "3",
    clientName: "Pedro Costa",
    clientPhone: "+55 11 97777-9012",
    lastMessage: "Você: Beleza Pedro, vou te ver às 10h!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
    unreadCount: 0,
    isAiHandling: false, // You took over
    avatar: null,
  },
  {
    id: "4",
    clientName: "Lucas Oliveira",
    clientPhone: "+55 11 96666-3456",
    lastMessage: "Obrigado pelo atendimento! 👍",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
    unreadCount: 0,
    isAiHandling: true,
    avatar: null,
  },
  {
    id: "5",
    clientName: "Rafael Lima",
    clientPhone: "+55 11 95555-7890",
    lastMessage: "Preciso remarcar para sexta-feira",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 1,
    isAiHandling: true,
    avatar: null,
  },
];

function formatMessageTime(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays === 1) return "ontem";
  return format(date, "dd/MM", { locale: ptBR });
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.clientPhone.includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] animate-fade-in">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-extrabold text-white mb-4 tracking-tight">Mensagens</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Buscar conversa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/[0.02] backdrop-blur-2xl border-white/[0.05] ring-1 ring-inset ring-white/5 focus:border-white/10 focus:ring-white/10 transition-all text-white placeholder:text-zinc-500"
          />
        </div>
      </header>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 space-y-2">
        {filteredConversations.map((conversation, index) => (
          <button
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation.id)}
            className={cn(
              "w-full flex items-start gap-3 p-3 rounded-xl glass-card text-left",
              "animate-fade-in-up",
              selectedConversation === conversation.id && "ring-1 ring-white/20 bg-white/[0.04]"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center ring-1 ring-white/10">
                <span className="text-lg font-bold text-zinc-300">
                  {conversation.clientName.charAt(0)}
                </span>
              </div>
              {/* AI/Manual Indicator */}
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#050505]",
                  conversation.isAiHandling 
                    ? "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]" 
                    : "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                )}
              >
                {conversation.isAiHandling ? (
                  <Bot className="w-3 h-3 text-white" />
                ) : (
                  <UserIcon className="w-3 h-3 text-white" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-white truncate tracking-tight">
                  {conversation.clientName}
                </h3>
                <span className="text-xs text-zinc-500 shrink-0">
                  {formatMessageTime(conversation.lastMessageTime)}
                </span>
              </div>

              <p className="text-sm text-zinc-500 truncate mt-0.5">
                {conversation.lastMessage}
              </p>

              {/* Badges Row */}
              <div className="flex items-center gap-2 mt-1.5">
                {conversation.isAiHandling ? (
                  <StatusBadge variant="magic" icon={<Bot className="w-3 h-3" />}>
                    IA respondendo
                  </StatusBadge>
                ) : (
                  <StatusBadge variant="info">
                    Você assumiu
                  </StatusBadge>
                )}

                {conversation.unreadCount > 0 && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-bold bg-emerald-500 text-white rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}