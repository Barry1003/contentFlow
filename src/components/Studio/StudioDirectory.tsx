import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { PLATFORM_STYLE_TOKENS } from '../../utils';

interface StudioDirectoryProps {
  onSelectPost: (postId: string) => void;
}

type FilterTab = 'all' | 'needs_script' | 'has_script' | 'videos' | 'carousels';

export const StudioDirectory: React.FC<StudioDirectoryProps> = ({ onSelectPost }) => {
  const { posts, setIsCreateModalOpen } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<FilterTab>('all');

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const hasContent =
        post.scriptContent?.hasContent ||
        Boolean(post.scriptContent?.hookText?.trim() || post.scriptContent?.bodyText?.trim());

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesHook = (post.hook || post.scriptContent?.hookText || '').toLowerCase().includes(query);
        const matchesBody = (post.scriptContent?.bodyText || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesHook && !matchesBody) return false;
      }

      // Tab match
      if (selectedTab === 'needs_script' && hasContent) return false;
      if (selectedTab === 'has_script' && !hasContent) return false;
      if (selectedTab === 'videos') {
        const isVideo = ['Reel', 'Short', 'TikTok', 'Video', 'Live'].some((v) =>
          post.format.toLowerCase().includes(v.toLowerCase())
        );
        if (!isVideo) return false;
      }
      if (selectedTab === 'carousels') {
        if (!post.format.toLowerCase().includes('carousel')) return false;
      }

      return true;
    });
  }, [posts, searchQuery, selectedTab]);

  return (
    <div id="content-studio-directory" className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-[1100px] w-full">
      {/* Top Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 mb-6 border-b border-[#E9E7E2] dark:border-[#323230]">
        <div>
          <h1 className="page-title text-2xl sm:text-[28px] text-[#2A2925] dark:text-[#D9D7D1] font-medium">
            Content Studio
          </h1>
          <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] mt-1 font-normal">
            Draft scripts, copy, and captions for your pipeline.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 h-7 px-3 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
        >
          <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>New draft</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        {/* Segmented filter control */}
        <div className="flex items-center border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] p-0.5 h-7 bg-[#F7F6F3] dark:bg-[#1C1C1A]">
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'needs_script', label: 'Needs script' },
              { id: 'has_script', label: 'Drafted' },
              { id: 'videos', label: 'Video' },
              { id: 'carousels', label: 'Carousel' },
            ] as const
          ).map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3 h-full text-xs rounded-[3px] transition-colors font-normal focus-ring ${
                  isActive
                    ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1]'
                    : 'text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 stroke-[1.5] absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6F6C66] dark:text-[#9A978F]" />
          <input
            type="text"
            placeholder="Search scripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-7 pl-8 pr-3 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
          />
        </div>
      </div>

      {/* Directory Table Rows */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center border-t border-[#E9E7E2] dark:border-[#323230]">
          <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] mb-3 font-normal">
            No scripts matching current filters.
          </p>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-3 py-1.5 rounded-[4px] text-xs font-normal border border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] transition-colors focus-ring"
          >
            Create new post
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[#E9E7E2] dark:divide-[#323230] border-t border-b border-[#E9E7E2] dark:border-[#323230]">
          {filteredPosts.map((post) => {
            const primaryPlat = post.platforms[0] || 'instagram';
            const platToken = PLATFORM_STYLE_TOKENS[primaryPlat.toLowerCase()];
            const hasDraft =
              post.scriptContent?.hasContent ||
              Boolean(post.scriptContent?.hookText || post.scriptContent?.bodyText);

            const allText = `${post.scriptContent?.hookText || ''} ${post.scriptContent?.bodyText || ''} ${post.scriptContent?.writtenText || ''}`;
            const wordCount = allText.trim() ? allText.trim().split(/\s+/).length : 0;

            return (
              <div
                key={post.id}
                onClick={() => onSelectPost(post.id)}
                className="group flex items-center justify-between py-3 px-2 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] cursor-pointer transition-colors focus-ring"
              >
                {/* Left: Platform dot + Title + Format */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-4">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: platToken?.dotColor || '#6F6C66' }}
                    title={primaryPlat}
                  />
                  <span className="text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] truncate">
                    {post.title}
                  </span>
                  <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] shrink-0 font-normal">
                    · {post.format}
                  </span>
                </div>

                {/* Right: Word count, Status, Action */}
                <div className="flex items-center gap-4 shrink-0 text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
                  <span className="tabular-nums">
                    {hasDraft ? `${wordCount} words` : 'No draft'}
                  </span>
                  <span className="tabular-nums">{post.scheduledDate}</span>
                  <button
                    type="button"
                    className="h-7 px-2.5 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] group-hover:border-[#6F6C66] text-xs text-[#2A2925] dark:text-[#D9D7D1] transition-colors focus-ring"
                  >
                    Open
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
