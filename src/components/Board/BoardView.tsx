import React, { useState } from 'react';
import { Plus, PenTool } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostItem, PostStatus } from '../../types';
import { ALL_STATUSES, STATUS_CONFIG, PLATFORM_STYLE_TOKENS } from '../../utils';

export const BoardView: React.FC = () => {
  const {
    posts,
    filters,
    selectedPost,
    setSelectedPost,
    updatePostStatus,
    openQuickAdd,
    celebrateMilestone,
    openContentStudio,
  } = useApp();

  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<PostStatus | null>(null);

  const todayKey = new Date().toISOString().split('T')[0];

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

  // Group by status
  const postsByStatus: Record<PostStatus, PostItem[]> = {
    Idea: [],
    'Scripting/Planning': [],
    Creating: [],
    Editing: [],
    Ready: [],
    Scheduled: [],
    Posted: [],
  };

  filteredPosts.forEach((post) => {
    if (postsByStatus[post.status]) {
      postsByStatus[post.status].push(post);
    }
  });

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, postId: string) => {
    e.dataTransfer.setData('text/plain', postId);
    setDraggedPostId(postId);
  };

  const handleDragOver = (e: React.DragEvent, colStatus: PostStatus) => {
    e.preventDefault();
    if (dragOverColumn !== colStatus) {
      setDragOverColumn(colStatus);
    }
  };

  const handleDrop = (e: React.DragEvent, colStatus: PostStatus) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
    if (postId) {
      updatePostStatus(postId, colStatus);
      if (colStatus === 'Posted') {
        celebrateMilestone('Post marked published');
      }
    }
    setDraggedPostId(null);
    setDragOverColumn(null);
  };

  return (
    <div
      id="pipeline-board-view"
      className="flex-1 flex flex-col h-full overflow-hidden bg-[#F7F6F3] dark:bg-[#1C1C1A]"
    >
      {/* Board Top Header Info */}
      <div className="bg-[#FFFFFF] dark:bg-[#232321] border-b border-[#E9E7E2] dark:border-[#323230] px-4 sm:px-6 py-3 flex items-center justify-between transition-colors">
        <div className="flex items-baseline gap-3">
          <h2 className="page-title text-2xl sm:text-[28px] text-[#2A2925] dark:text-[#D9D7D1] font-medium">
            Pipeline
          </h2>
          <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal">
            {filteredPosts.length} posts
          </span>
        </div>

        <button
          type="button"
          onClick={() => openQuickAdd()}
          className="inline-flex items-center gap-1.5 h-7 px-3 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
        >
          <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>New post</span>
        </button>
      </div>

      {/* Kanban Columns: Single level of border around column, cards separated by hairline dividers */}
      <div className="flex-1 overflow-x-auto p-4 sm:p-6 flex gap-3 min-h-0">
        {ALL_STATUSES.map((status) => {
          const colPosts = postsByStatus[status] || [];
          const statusCfg = STATUS_CONFIG[status];
          const isTarget = dragOverColumn === status;

          return (
            <div
              key={status}
              id={`board-col-${status.toLowerCase().replace(/[\/\s]/g, '-')}`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={(e) => handleDrop(e, status)}
              className={`w-72 shrink-0 flex flex-col rounded-[4px] bg-[#FFFFFF] dark:bg-[#232321] border border-[#E9E7E2] dark:border-[#323230] max-h-full ${
                isTarget ? 'bg-[#EFECE6] dark:bg-[#2B2B28]' : ''
              }`}
            >
              {/* Quiet Column Header: Name, count in parentheses, 8px status dot */}
              <div className="px-3 py-2 border-b border-[#E9E7E2] dark:border-[#323230] flex items-center justify-between">
                <span className="text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1]">
                  {statusCfg.humanLabel} ({colPosts.length})
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: statusCfg.dot }}
                />
              </div>

              {/* Cards List: Cards use same panel color, separated by hairline dividers (no card borders) */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#E9E7E2] dark:divide-[#323230]">
                {colPosts.map((post) => {
                  const primaryPlat = post.platforms[0] || 'instagram';
                  const platToken = PLATFORM_STYLE_TOKENS[primaryPlat.toLowerCase()];
                  const isSelected = selectedPost?.id === post.id;
                  const isOverdue =
                    post.status !== 'Posted' && post.scheduledDate < todayKey;

                  return (
                    <div
                      key={post.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, post.id)}
                      onClick={() => setSelectedPost(post)}
                      className={`p-2.5 bg-[#FFFFFF] dark:bg-[#232321] cursor-pointer transition-colors select-none group relative focus-ring ${
                        isSelected
                          ? 'bg-[#EFECE6] dark:bg-[#2B2B28] border-l-2 border-l-[#2C6E56] dark:border-l-[#5AA88C]'
                          : 'hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] border-l-2 border-l-transparent'
                      } ${draggedPostId === post.id ? 'opacity-30' : ''}`}
                    >
                      {/* Top row: Platform 8px dot + title */}
                      <div className="flex items-start gap-2 mb-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0 mt-1"
                          style={{
                            backgroundColor: platToken?.dotColor || '#6F6C66',
                          }}
                          title={primaryPlat}
                        />
                        <h4 className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] line-clamp-2 leading-snug flex-1">
                          {post.title}
                        </h4>
                      </div>

                      {/* Date / Time in muted text */}
                      <div className="flex items-center justify-between text-[11px] text-[#6F6C66] dark:text-[#9A978F] tabular-nums pt-1 font-normal">
                        <span>{post.scheduledDate}</span>
                        {isOverdue ? (
                          <span className="text-[#B42318] dark:text-[#C54A44]">Overdue</span>
                        ) : (
                          post.scheduledTime && <span>{post.scheduledTime}</span>
                        )}
                      </div>

                      {/* Hover action to open content studio */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openContentStudio(post.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 absolute right-2 bottom-1.5 p-1 rounded-[3px] hover:bg-[#E9E7E2] dark:hover:bg-[#323230] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-opacity focus-ring"
                        title="Write content"
                      >
                        <PenTool className="w-3 h-3 stroke-[1.5]" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Quick Add at bottom */}
              <div className="p-1 border-t border-[#E9E7E2] dark:border-[#323230]">
                <button
                  type="button"
                  onClick={() => openQuickAdd()}
                  className="w-full py-1 rounded-[3px] text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] flex items-center justify-center gap-1 transition-colors focus-ring"
                >
                  <Plus className="w-3 h-3 stroke-[1.5]" />
                  <span>New</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
