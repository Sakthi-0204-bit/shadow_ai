import { X, User, MessageCircle, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UserPreferences {
  name: string;
  responseStyle: 'formal' | 'casual' | 'short' | 'detailed';
}

interface PersonalizationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export function PersonalizationSidebar({ 
  isOpen, 
  onClose, 
  preferences, 
  onPreferencesChange 
}: PersonalizationSidebarProps) {
  const handleNameChange = (name: string) => {
    onPreferencesChange({ ...preferences, name });
  };

  const handleStyleChange = (responseStyle: 'formal' | 'casual' | 'short' | 'detailed') => {
    onPreferencesChange({ ...preferences, responseStyle });
  };

  const responseStyles = [
    { value: 'casual', label: 'Casual', description: 'Friendly and conversational' },
    { value: 'formal', label: 'Formal', description: 'Professional and structured' },
    { value: 'short', label: 'Concise', description: 'Brief and to the point' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive explanations' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform shadow-lg",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-sidebar-foreground">Personalization</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-sidebar-foreground hover:bg-sidebar-hover"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* User Profile */}
            <Card className="bg-surface-secondary border-sidebar-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4" />
                  Profile
                </CardTitle>
                <CardDescription>
                  Customize how Shadow addresses you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                  <Input
                    id="name"
                    value={preferences.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-surface border-sidebar-border"
                  />
                  {preferences.name && (
                    <p className="text-xs text-foreground-muted">
                      Shadow will greet you as "{preferences.name}"
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Response Style */}
            <Card className="bg-surface-secondary border-sidebar-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageCircle className="h-4 w-4" />
                  Response Style
                </CardTitle>
                <CardDescription>
                  Choose how Shadow should respond to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={preferences.responseStyle} onValueChange={handleStyleChange}>
                  <SelectTrigger className="bg-surface border-sidebar-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {responseStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{style.label}</span>
                          <span className="text-xs text-foreground-muted">{style.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Preview */}
            {preferences.name && (
              <Card className="bg-surface-secondary border-sidebar-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Preview</CardTitle>
                  <CardDescription>
                    How Shadow will interact with you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-chat-ai-bubble border border-sidebar-border rounded-lg p-3 text-sm">
                    <p className="text-chat-ai-text">
                      Hello {preferences.name}! I'm ready to assist you with a {preferences.responseStyle} approach. 
                      {preferences.responseStyle === 'formal' && ' I will provide professional and structured responses.'}
                      {preferences.responseStyle === 'casual' && ' Let\'s have a friendly conversation!'}
                      {preferences.responseStyle === 'short' && ' I\'ll keep things brief and direct.'}
                      {preferences.responseStyle === 'detailed' && ' I\'ll give you comprehensive explanations.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-foreground-muted text-center">
              Your preferences are saved locally and will persist across sessions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}