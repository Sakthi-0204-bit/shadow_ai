import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Settings, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { PersonalizationSidebar } from "./PersonalizationSidebar";
import { FileUpload } from "./FileUpload";

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

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Shadow, your AI assistant. I can help you with conversations, reasoning, coding, explanations, and much more. What would you like to talk about today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    name: '',
    responseStyle: 'casual'
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() && uploadedFiles.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setUploadedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const greeting = userPreferences.name ? `${userPreferences.name}, ` : '';
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `${greeting}I understand you want to discuss "${input}". I'm here to help with detailed explanations, coding assistance, or any questions you might have. This is a placeholder response - in a real implementation, this would connect to an AI API.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-gradient-chat">
      {/* Personalization Sidebar */}
      <PersonalizationSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        preferences={userPreferences}
        onPreferencesChange={setUserPreferences}
      />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-sidebar-border bg-surface shadow-sm">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Shadow AI</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-foreground-secondary hover:text-foreground hover:bg-secondary-hover"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto chat-scrollbar p-4 space-y-4 bg-chat-background">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message}
              preferences={userPreferences}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-sidebar-border bg-surface p-4">
          {/* File Upload Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md text-sm">
                  <Paperclip className="h-3 w-3" />
                  <span className="text-foreground-secondary">{file.name}</span>
                  <button
                    onClick={() => removeUploadedFile(index)}
                    className="text-foreground-muted hover:text-destructive ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-3 items-end">
            <FileUpload onFileUpload={handleFileUpload} />
            
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={userPreferences.name ? `Hi ${userPreferences.name}, what would you like to discuss?` : "Type your message..."}
                className="min-h-[52px] max-h-32 resize-none border-chat-input-border bg-chat-input text-foreground placeholder:text-foreground-muted focus:ring-2 focus:ring-primary/20 transition-smooth"
                disabled={isTyping}
              />
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={(!input.trim() && uploadedFiles.length === 0) || isTyping}
              className="bg-primary hover:bg-primary-hover text-primary-foreground transition-smooth shadow-md h-[52px] px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}