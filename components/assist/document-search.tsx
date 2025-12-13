'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, FileText, BookOpen, Scale, FileCheck, Tag, Clock } from 'lucide-react';
import { Document } from '@/lib/types';

interface DocumentSearchProps {
  documents: Document[];
}

export function DocumentSearch({ documents }: DocumentSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const typeConfig: Record<string, { label: string; icon: typeof FileText; color: string }> = {
    procedure: { label: '절차서', icon: FileCheck, color: 'text-monitor bg-monitor/10' },
    regulation: { label: '규제문서', icon: Scale, color: 'text-danger bg-danger/10' },
    manual: { label: '기술문서', icon: BookOpen, color: 'text-predict bg-predict/10' },
    report: { label: '보고서', icon: FileText, color: 'text-assist bg-assist/10' },
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📚 문서 검색</h3>
        
        {/* 검색 입력 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="문서명 또는 태그로 검색..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-assist/20"
          />
        </div>

        {/* 타입 필터 */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              selectedType === 'all' 
                ? "bg-gray-900 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            전체
          </button>
          {Object.entries(typeConfig).map(([type, config]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                selectedType === type 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* 문서 목록 */}
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {filteredDocs.map((doc) => {
          const config = typeConfig[doc.type];
          const Icon = config.icon;

          return (
            <div 
              key={doc.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg", config.color)}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-xs px-2 py-0.5 rounded", config.color)}>
                      {config.label}
                    </span>
                    <span className="text-xs text-gray-400">{doc.category}</span>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{doc.title}</h4>
                  
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{doc.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      {doc.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doc.lastUpdated.toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredDocs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 최근 조회 문서
interface RecentDocumentsProps {
  documents: Document[];
}

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">🕐 최근 조회 문서</h3>
      <div className="space-y-2">
        {documents.slice(0, 5).map((doc) => (
          <div 
            key={doc.id}
            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700 truncate flex-1">{doc.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
