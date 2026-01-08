'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SendHorizonal, Loader2, Sparkles, User } from 'lucide-react';
import { getPersonalizedGuidance } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { marked } from 'marked';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type TutorClientProps = {
  userProfile: {
    name: string;
    learningStyle: string;
    knowledgeGaps: string;
  };
};

export function TutorClient({ userProfile }: TutorClientProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello ${userProfile.name.split(' ')[0]}! I'm your AI tutor. How can I help you understand STEM concepts better today? Feel free to ask me anything.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await getPersonalizedGuidance({
        learningStyle: userProfile.learningStyle,
        knowledgeGaps: userProfile.knowledgeGaps,
        studentQuestion: input,
      });

      if (result.guidance.includes("I am having trouble")) {
        toast({
            title: "AI Tutor Error",
            description: "Sorry, I'm having a little trouble right now. Please try your question again in a moment.",
            variant: "destructive",
        });
      }

      const assistantMessage: Message = { role: 'assistant', content: result.guidance };
      setMessages((prev) => [...prev, assistantMessage]);
    });
  };

  return (
    <div className="flex flex-col h-full flex-1 bg-card border rounded-lg overflow-hidden">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : ''
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-prose rounded-lg p-3 text-sm prose prose-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                )}
                dangerouslySetInnerHTML={{
                  __html: message.role === 'assistant' 
                    ? marked.parse(message.content) as string
                    : message.content
                }}
              />
              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className='flex items-start gap-3'>
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary rounded-lg p-3 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a concept..."
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isPending}>
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
