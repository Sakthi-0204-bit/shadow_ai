import { format } from "date-fns";
import { User, Bot, FileText, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  files?: File[];
}

interface UserPreferences {
  name: string;
  responseStyle: 'formal' | 'casual' | 'short' | 'detailed';
}

interface ChatMessageProps {
  message: Message;
  preferences: UserPreferences;
}

export function ChatMessage({ message, preferences }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className={cn(
      "flex gap-3 group animate-message-enter",
      isUser ? "justify-end" : "justify-start"
    )}>
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-chat">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
      )}

      {/* Message Content */}
      <div className={cn(
        "max-w-[70%] space-y-2",
        isUser ? "items-end" : "items-start"
      )}>
        {/* Message Bubble */}
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-chat transition-smooth",
          isUser 
            ? "bg-chat-user-bubble text-chat-user-text rounded-br-sm" 
            : "bg-chat-ai-bubble text-chat-ai-text border border-sidebar-border rounded-bl-sm"
        )}>
          {/* Files Preview */}
          {message.files && message.files.length > 0 && (
            <div className="mb-3 space-y-2">
              {message.files.map((file, index) => (
                <div key={index} className={cn(
                  "flex items-center gap-2 p-2 rounded-lg text-sm",
                  isUser 
                    ? "bg-chat-user-text/10 text-chat-user-text/80" 
                    : "bg-chat-ai-text/10 text-chat-ai-text/80"
                )}>
                  {getFileIcon(file)}
                  <span className="font-medium">{file.name}</span>
                  <span className="text-xs opacity-70">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* Message Text */}
          <div className="leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>

        {/* Timestamp */}
        <div className={cn(
          "text-xs text-foreground-muted opacity-0 group-hover:opacity-100 transition-smooth px-1",
          isUser ? "text-right" : "text-left"
        )}>
          {format(message.timestamp, 'h:mm a')}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-chat">
          <User className="h-4 w-4 text-foreground" />
        </div>
      )}
    </div>
  );
}