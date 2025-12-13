'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Send, Bot, User, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { Document } from '@/lib/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Document[];
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<{ answer: string; sources: Document[] }>;
}

export function ChatInterface({ onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '안녕하세요! SMR-BRAIN Assist Agent입니다. 🤖\n\ni-SMR 운영에 관한 질문을 자연어로 물어보세요. 실시간 상태 분석, 절차서 검색, 규제 문서 조회 등을 도와드립니다.\n\n예시 질문:\n• "급수펌프 베어링 상태가 어떤가요?"\n• "현재 발전소 출력 상태를 알려주세요"\n• "정비 일정이 어떻게 되나요?"',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // 초기 로드 시에는 스크롤하지 않음
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 타이핑 인디케이터 추가
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: typingId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    }]);

    try {
      const response = await onSendMessage(userMessage.content);
      
      // 타이핑 인디케이터 제거하고 실제 응답 추가
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
      }));
    } catch (error) {
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: '죄송합니다. 요청을 처리하는 중 오류가 발생했습니다. 다시 시도해 주세요.',
        timestamp: new Date(),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-xl shadow-sm border border-gray-100">
      {/* 메시지 영역 */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요... (예: 급수펌프 상태가 어떤가요?)"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-assist/20 focus:border-assist"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "p-3 rounded-xl transition-all",
              input.trim() && !isLoading
                ? "bg-assist text-white hover:bg-assist/90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  if (message.isTyping) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-assist/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-assist" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser ? "bg-primary" : "bg-assist/10"
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-assist" />
        )}
      </div>

      <div className={cn(
        "max-w-[70%] space-y-2",
        isUser && "items-end"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3",
          isUser 
            ? "bg-primary text-white rounded-tr-sm" 
            : "bg-gray-100 text-gray-900 rounded-tl-sm"
        )}>
          <p className="text-sm whitespace-pre-line">{message.content}</p>
        </div>

        {/* 참조 문서 */}
        {message.sources && message.sources.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-gray-500 px-1">📚 참조 문서:</p>
            {message.sources.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center gap-2 px-3 py-2 bg-assist/5 rounded-lg border border-assist/20 cursor-pointer hover:bg-assist/10 transition-colors"
              >
                <FileText className="w-4 h-4 text-assist" />
                <span className="text-xs text-gray-700 flex-1">{doc.title}</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 px-1">
          {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

// 추천 질문 컴포넌트
interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  const questions = [
    { icon: '🔧', text: '급수펌프 베어링 상태는 어떤가요?' },
    { icon: '📊', text: '현재 발전소 출력 상태를 알려주세요' },
    { icon: '📅', text: '예정된 정비 일정이 있나요?' },
    { icon: '🛡️', text: '안전 계통 상태를 확인해주세요' },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">💡 추천 질문</h3>
      <div className="space-y-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q.text)}
            className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-assist/5 rounded-lg text-sm text-gray-700 hover:text-assist transition-colors flex items-center gap-2"
          >
            <span>{q.icon}</span>
            <span>{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
