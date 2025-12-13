'use client';

import { useCallback, useRef } from 'react';
import { Header } from '@/components/layout/header';
import { ChatInterface, ChatInterfaceHandle, SuggestedQuestions } from '@/components/assist/chat-interface';
import { DocumentSearch, RecentDocuments } from '@/components/assist/document-search';
import { documents, chatResponses } from '@/lib/mock-data';
import { Document } from '@/lib/types';

export default function AssistPage() {
  const chatRef = useRef<ChatInterfaceHandle>(null);

  // AI 응답 시뮬레이션
  const handleSendMessage = useCallback(async (message: string): Promise<{ answer: string; sources: Document[] }> => {
    // 시뮬레이션 딜레이
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // 키워드 매칭으로 응답 찾기
    const keywords = Object.keys(chatResponses);
    const matchedKeyword = keywords.find(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matchedKeyword) {
      return chatResponses[matchedKeyword];
    }

    // 기본 응답
    return {
      answer: `"${message}"에 대한 질문을 분석했습니다.\n\n현재 SMR-BRAIN 시스템에서 관련 정보를 검색 중입니다. 보다 정확한 답변을 위해 다음 키워드로 질문해 보세요:\n\n• 베어링 / 급수펌프 - 기기 상태 조회\n• 정비 - 정비 일정 확인\n• 출력 - 발전소 출력 현황\n• 안전 - 안전 계통 상태`,
      sources: [],
    };
  }, []);

  const handleSelectQuestion = (question: string) => {
    // 추천 질문 클릭 시 자동으로 채팅 전송
    chatRef.current?.sendMessage(question);
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Assist Agent"
        subtitle="LLM + RAG 기반 자연어 운전원 지원"
      />

      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* 메인 채팅 영역 */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ChatInterface ref={chatRef} onSendMessage={handleSendMessage} />
          </div>

          {/* 사이드바 */}
          <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
            <SuggestedQuestions onSelect={handleSelectQuestion} />
            <div className="hidden lg:block">
              <RecentDocuments documents={documents} />
            </div>
          </div>
        </div>

        {/* 문서 검색 */}
        <div className="mt-4 lg:mt-6">
          <DocumentSearch documents={documents} />
        </div>
      </div>
    </div>
  );
}
