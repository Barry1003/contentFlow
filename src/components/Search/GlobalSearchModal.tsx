import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    posts,
    ideas,
    settings,
    setSelectedPost,
    setActiveTab,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results: posts
  const matchingPosts = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.hook.toLowerCase().includes(q) ||
          p.caption.toLowerCase().includes(q) ||
          p.hashtags.some((h) => h.toLowerCase().includes(q))
      ).slice(0, 6)
    : [];

  // Search results: ideas
  const matchingIdeas = q
    ? ideas.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.hook?.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  // Search results: templates
  const matchingTemplates = q
    ? settings.templates.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.captionStructure?.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const totalResults = matchingPosts.length + matchingIdeas.length + matchingTemplates.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <div
      id="global-search-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:pt-20 bg-[#1C1C1A]/40 transition-opacity"
      onClick={() => setIsSearchOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        id="global-search-container"
        className="w-full max-w-xl bg-[#FFFFFF] dark:bg-[#232321] rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-[#E9E7E2] dark:border-[#323230]">
          <Search className="w-4 h-4 text-[#6F6C66] dark:text-[#9A978F] shrink-0 stroke-[1.5]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search posts, captions, hashtags, ideas, templates..."
            className="flex-1 bg-transparent text-xs text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] focus:outline-none font-normal"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] p-0.5"
            >
              <X className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#6F6C66] dark:text-[#9A978F] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[3px]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
          {!q && (
            <div className="py-6 text-center text-xs text-[#6F6C66] dark:text-[#9A978F] space-y-0.5 font-normal">
              <p className="text-[#2A2925] dark:text-[#D9D7D1]">
                Search everything across ContentFlow
              </p>
              <p className="text-[11px]">Type keywords, hashtags, or formats. Press ESC to exit.</p>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="py-6 text-center text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              No matching content found for "{query}".
            </div>
          )}

          {/* Posts Category */}
          {matchingPosts.length > 0 && (
            <div>
              <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F] px-2 block mb-1">
                Posts ({matchingPosts.length})
              </span>
              <div className="space-y-0.5">
                {matchingPosts.map((post) => {
                  return (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSelectedPost(post);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] flex items-center justify-between gap-2.5 group transition-colors focus-ring"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] truncate">
                            {post.title}
                          </p>
                          <span className="text-[10px] text-[#6F6C66] dark:text-[#9A978F] px-1.5 py-0.2 rounded-[3px] border border-[#E9E7E2] dark:border-[#323230] shrink-0 font-normal">
                            {post.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal">
                          <span>{post.scheduledDate}</span>
                          <span>•</span>
                          <span className="truncate max-w-[200px] capitalize">{post.platforms.join(', ')}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#6F6C66] group-hover:text-[#2A2925] dark:group-hover:text-[#D9D7D1] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity stroke-[1.5]" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ideas Category */}
          {matchingIdeas.length > 0 && (
            <div>
              <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F] px-2 block mb-1">
                Ideas ({matchingIdeas.length})
              </span>
              <div className="space-y-0.5">
                {matchingIdeas.map((idea) => (
                  <button
                    key={idea.id}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveTab('ideas');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] flex items-center justify-between gap-2.5 group transition-colors focus-ring"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#6F6C66] shrink-0 stroke-[1.5]" />
                        <p className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] truncate">
                          {idea.title}
                        </p>
                      </div>
                      <p className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] truncate font-normal">
                        {idea.hook || idea.tags.join(' ')}
                      </p>
                    </div>
                    <span className="text-xs text-[#2C6E56] dark:text-[#5AA88C] font-normal shrink-0">
                      View
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Templates Category */}
          {matchingTemplates.length > 0 && (
            <div>
              <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F] px-2 block mb-1">
                Templates ({matchingTemplates.length})
              </span>
              <div className="space-y-0.5">
                {matchingTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveTab('calendar');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] flex items-center justify-between gap-2.5 group transition-colors focus-ring"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] truncate">
                        {template.name}
                      </p>
                      <p className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] truncate font-normal">
                        {template.format} • {template.hashtags?.slice(0, 3).join(' ') || 'Standard template'}
                      </p>
                    </div>
                    <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] font-normal">
                      Template
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
