import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostItem } from '../../types';
import {
  getMonthMatrix,
  getDaysOfWeekLabels,
  PLATFORM_STYLE_TOKENS,
} from '../../utils';
import { InlineDatePicker } from '../Common/InlineDatePicker';

interface MonthGridProps {
  currentDate: Date;
}

export const MonthGrid: React.FC<MonthGridProps> = ({ currentDate }) => {
  const {
    posts,
    settings,
    filters,
    selectedPost,
    setSelectedPost,
    openCreateModalForDate,
    movePostToDate,
    updatePost,
    celebrateMilestone,
  } = useApp();

  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const [moveModalPost, setMoveModalPost] = useState<PostItem | null>(null);
  const [expandedDayKey, setExpandedDayKey] = useState<string | null>(null);
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineTitleValue, setInlineTitleValue] = useState('');

  const dayLabels = getDaysOfWeekLabels(settings.weekStartsOnMonday);
  const monthWeeks = getMonthMatrix(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    settings.weekStartsOnMonday
  );

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
      const matchPlat = post.platforms.some((p) => filters.platforms.includes(p));
      if (!matchPlat) return false;
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

  // Group posts by date
  const postsByDate: Record<string, PostItem[]> = {};
  filteredPosts.forEach((post) => {
    if (!postsByDate[post.scheduledDate]) {
      postsByDate[post.scheduledDate] = [];
    }
    postsByDate[post.scheduledDate].push(post);
  });

  // Drag and Drop
  const handleDragStart = (e: React.DragEvent, postId: string) => {
    e.dataTransfer.setData('text/plain', postId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedPostId(postId);
  };

  const handleDragOver = (e: React.DragEvent, dateKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverDate !== dateKey) {
      setDragOverDate(dateKey);
    }
  };

  const handleDragLeave = () => {
    setDragOverDate(null);
  };

  const handleDrop = (e: React.DragEvent, targetDateKey: string) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
    if (postId) {
      movePostToDate(postId, targetDateKey);
      celebrateMilestone('Post rescheduled');
    }
    setDraggedPostId(null);
    setDragOverDate(null);
  };

  const startInlineEdit = (post: PostItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setInlineEditingId(post.id);
    setInlineTitleValue(post.title);
  };

  const saveInlineEdit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inlineTitleValue.trim()) {
      updatePost(postId, { title: inlineTitleValue.trim() });
    }
    setInlineEditingId(null);
  };

  return (
    <div
      id="calendar-month-grid"
      className="flex-1 flex flex-col min-h-0 bg-[#F7F6F3] dark:bg-[#1C1C1A] select-none"
    >
      {/* Move to date modal */}
      {moveModalPost && (
        <InlineDatePicker
          currentDateKey={moveModalPost.scheduledDate}
          onSelectDate={(newDate) => {
            movePostToDate(moveModalPost.id, newDate);
            celebrateMilestone('Post rescheduled');
          }}
          onClose={() => setMoveModalPost(null)}
        />
      )}

      {/* Weekday headers: hairline border */}
      <div className="grid grid-cols-7 border-b border-[#E9E7E2] dark:border-[#323230] bg-[#FFFFFF] dark:bg-[#232321]">
        {dayLabels.map((lbl, idx) => (
          <div
            key={idx}
            className="py-2 px-3 text-left font-normal text-xs text-[#6F6C66] dark:text-[#9A978F]"
          >
            {lbl}
          </div>
        ))}
      </div>

      {/* Month Days Matrix: hairline divider lines */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-[#E9E7E2] dark:bg-[#323230] gap-px border-b border-[#E9E7E2] dark:border-[#323230]">
        {monthWeeks.flat().map((day) => {
          const dayPosts = postsByDate[day.dateKey] || [];
          const isDropTarget = dragOverDate === day.dateKey;
          const maxVisible = 3;
          const hasOverflow = dayPosts.length > maxVisible && expandedDayKey !== day.dateKey;
          const visiblePosts = hasOverflow ? dayPosts.slice(0, maxVisible) : dayPosts;

          return (
            <div
              key={day.dateKey}
              id={`calendar-day-${day.dateKey}`}
              onDragOver={(e) => handleDragOver(e, day.dateKey)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, day.dateKey)}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  openCreateModalForDate(day.dateKey);
                }
              }}
              className={`flex flex-col p-1.5 transition-colors relative group min-h-[90px] sm:min-h-[110px] ${
                day.isCurrentMonth
                  ? 'bg-[#FFFFFF] dark:bg-[#232321]'
                  : 'bg-[#F7F6F3] dark:bg-[#1C1C1A]'
              } ${
                isDropTarget
                  ? 'bg-[#EFECE6] dark:bg-[#2B2B28]'
                  : ''
              }`}
            >
              {/* Day Number Header: small top-left, today is restrained accent circle */}
              <div className="flex items-center justify-between mb-1">
                {day.isToday ? (
                  <span className="w-5 h-5 rounded-full bg-[#2C6E56] text-[#F3F1EC] flex items-center justify-center text-[11px] font-normal tabular-nums">
                    {day.dayOfMonth}
                  </span>
                ) : (
                  <span
                    className={`text-xs tabular-nums font-normal ${
                      day.isCurrentMonth
                        ? 'text-[#2A2925] dark:text-[#D9D7D1]'
                        : 'text-[#9A978F] dark:text-[#6B6963]'
                    }`}
                  >
                    {day.dayOfMonth}
                  </span>
                )}

                {/* Hover Quick Add "+" */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openCreateModalForDate(day.dateKey);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-[#6F6C66] hover:text-[#2A2925] dark:text-[#9A978F] dark:hover:text-[#D9D7D1] rounded-[3px] transition-opacity focus-ring"
                  title={`Add post on ${day.dateKey}`}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>

              {/* Single-line rows for posts: 8px platform dot, truncated title, muted time */}
              <div className="flex-1 space-y-0.5 overflow-y-auto max-h-[120px]">
                {visiblePosts.map((post) => {
                  const primaryPlat = post.platforms[0] || 'instagram';
                  const platToken = PLATFORM_STYLE_TOKENS[primaryPlat.toLowerCase()];
                  const isInlineEditing = inlineEditingId === post.id;
                  const isSelected = selectedPost?.id === post.id;

                  return (
                    <div
                      key={post.id}
                      id={`post-row-${post.id}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, post.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                      }}
                      className={`group/row flex items-center gap-1.5 px-1 py-0.5 text-xs transition-colors rounded-[3px] cursor-pointer focus-ring ${
                        isSelected
                          ? 'border-l-2 border-l-[#2C6E56] dark:border-l-[#5AA88C] bg-[#EFECE6] dark:bg-[#2B2B28]'
                          : 'border-l-2 border-l-transparent hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                      } ${draggedPostId === post.id ? 'opacity-30' : ''}`}
                    >
                      {/* 8px platform dot */}
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: platToken?.dotColor || '#6F6C66',
                        }}
                        title={`Platform: ${primaryPlat}`}
                      />

                      {/* Truncated title */}
                      {isInlineEditing ? (
                        <form
                          onSubmit={(e) => saveInlineEdit(post.id, e)}
                          className="flex items-center gap-1 flex-1 min-w-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            autoFocus
                            type="text"
                            value={inlineTitleValue}
                            onChange={(e) => setInlineTitleValue(e.target.value)}
                            className="w-full text-xs px-1 py-0 rounded-[3px] border border-[#2C6E56] dark:border-[#5AA88C] bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] outline-none"
                          />
                          <button type="submit" className="text-[#2C6E56] dark:text-[#5AA88C]">
                            <Check className="w-3 h-3 stroke-[1.5]" />
                          </button>
                        </form>
                      ) : (
                        <span
                          onDoubleClick={(e) => startInlineEdit(post, e)}
                          className="truncate flex-1 font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1]"
                          title={post.title}
                        >
                          {post.title}
                        </span>
                      )}

                      {/* Time in muted text */}
                      {post.scheduledTime && (
                        <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] tabular-nums shrink-0 font-normal">
                          {post.scheduledTime}
                        </span>
                      )}
                    </div>
                  );
                })}

                {/* "+X more" chip in plain muted text */}
                {hasOverflow && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedDayKey(day.dateKey);
                    }}
                    className="w-full py-0.5 text-[11px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] text-left px-1 transition-colors font-normal"
                  >
                    +{dayPosts.length - maxVisible} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
