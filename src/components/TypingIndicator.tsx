import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start animate-fade-in">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-chat">
        <Bot className="h-4 w-4 text-primary-foreground" />
      </div>

      {/* Typing Animation */}
      <div className="bg-chat-ai-bubble border border-sidebar-border text-chat-ai-text rounded-2xl rounded-bl-sm px-4 py-3 shadow-chat">
        <div className="flex gap-1 items-center">
          <span className="text-sm text-foreground-muted">Shadow is typing</span>
          <div className="flex gap-1 ml-2">
            <div className="w-2 h-2 bg-foreground-muted rounded-full animate-typing" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-foreground-muted rounded-full animate-typing" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-foreground-muted rounded-full animate-typing" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}