import React from 'react';
import { PenTool } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostItem } from '../../types';
import { STATUS_CONFIG, PLATFORM_STYLE_TOKENS } from '../../utils';

export const ListView: React.FC = () => {
  const { posts, filters, setSelectedPost, openContentStudio, setIsCreateModalOpen } = useApp();
  const todayKey = new Date().toISOString().split('T')[0];

  const tom = new Date();
  tom.setDate(tom.getDate() + 1);
  const tomKey = tom.toISOString().split('T')[0];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchHook = post.hook.toLowerCase().includes(q);
      const matchTags = post.hashtags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchHook && !matchTags) return false;
    }
    if (filters.platforms.length > 0) {
      if (!post.platforms.some((p) => filters.platforms.includes(p))) return false;
    }
    if (filters.statuses.length > 0 && !filters.statuses.includes(post.status)) {
      return false;
    }
    if (filters.pillars.length > 0 && !filters.pillars.includes(post.pillarId)) {
      return false;
    }
    if (filters.formats.length > 0 && !filters.formats.includes(post.format)) {
      return false;
    }
    if (filters.onlyOverdue) {
      if (post.status === 'Posted' || post.scheduledDate >= todayKey) return false;
    }
    return true;
  });

  const overdue: PostItem[] = [];
  const today: PostItem[] = [];
  const tomorrow: PostItem[] = [];
  const upcoming: PostItem[] = [];
  const postedHistory: PostItem[] = [];

  filteredPosts.forEach((post) => {
    if (post.status === 'Posted') {
      postedHistory.push(post);
    } else if (post.scheduledDate < todayKey) {
      overdue.push(post);
    } else if (post.scheduledDate === todayKey) {
      today.push(post);
    } else if (post.scheduledDate === tomKey) {
      tomorrow.push(post);
    } else {
      upcoming.push(post);
    }
  });

  overdue.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
  today.sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
  tomorrow.sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
  upcoming.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
  postedHistory.sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));

  const renderSection = (title: string, items: PostItem[]) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-[#E9E7E2] dark:border-[#323230]">
          <h3 className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]">
            {title}
          </h3>
          <span className="text-xs tabular-nums text-[#6F6C66] dark:text-[#9A978F] font-normal">
            {items.length}
          </span>
        </div>

        <div className="divide-y divide-[#E9E7E2] dark:divide-[#323230]">
          {items.map((post) => {
            const statusInfo = STATUS_CONFIG[post.status];
            const primaryPlat = post.platforms[0] || 'instagram';
            const platToken = PLATFORM_STYLE_TOKENS[primaryPlat.toLowerCase()];

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group flex items-center justify-between py-2.5 px-2 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] cursor-pointer transition-colors focus-ring"
              >
                {/* Left: Platform dot + Title */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-4">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: platToken?.dotColor || '#6F6C66' }}
                    title={primaryPlat}
                  />
                  <span className="text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] truncate">
                    {post.title}
                  </span>
                </div>

                {/* Right: Date, Time, Status dot + text, Inline action */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal">
                    <span>{post.scheduledDate}</span>
                    {post.scheduledTime && (
                      <>
                        <span>·</span>
                        <span>{post.scheduledTime}</span>
                      </>
                    )}
                  </div>

                  {/* Status dot + plain text */}
                  <div className="flex items-center gap-1.5 text-xs text-[#2A2925] dark:text-[#D9D7D1] w-24 justify-end font-normal">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: statusInfo.dot }}
                    />
                    <span className="truncate">{statusInfo.label}</span>
                  </div>

                  {/* Hover inline action button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openContentStudio(post.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-opacity focus-ring"
                    title="Write content or edit script"
                  >
                    <PenTool className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      id="calendar-list-view"
      className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-[1100px] w-full"
    >
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] mb-3 font-normal">
            No posts matching current filters.
          </p>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-3 py-1.5 rounded-[4px] text-xs font-normal bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] transition-colors focus-ring"
          >
            Create post
          </button>
        </div>
      ) : (
        <>
          {renderSection('Overdue', overdue)}
          {renderSection('Today', today)}
          {renderSection('Tomorrow', tomorrow)}
          {renderSection('Upcoming', upcoming)}
          {renderSection('Published', postedHistory)}
        </>
      )}
    </div>
  );
};
