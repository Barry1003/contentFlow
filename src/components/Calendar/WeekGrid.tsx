import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostItem } from '../../types';
import { getWeekDays, PLATFORM_STYLE_TOKENS } from '../../utils';
import { InlineDatePicker } from '../Common/InlineDatePicker';

interface WeekGridProps {
  currentDate: Date;
}

export const WeekGrid: React.FC<WeekGridProps> = ({ currentDate }) => {
  const {
    posts,
    settings,
    filters,
    selectedPost,
    setSelectedPost,
    openCreateModalForDate,
    movePostToDate,
    celebrateMilestone,
  } = useApp();

  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const [moveModalPost, setMoveModalPost] = useState<PostItem | null>(null);

  const weekDays = getWeekDays(currentDate, settings.weekStartsOnMonday);
  const todayKey = new Date().toISOString().split('T')[0];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchHook = post.hook.toLowerCase().includes(q);
      if (!matchTitle && !matchHook) return false;
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

  const postsByDate: Record<string, PostItem[]> = {};
  filteredPosts.forEach((p) => {
    if (!postsByDate[p.scheduledDate]) postsByDate[p.scheduledDate] = [];
    postsByDate[p.scheduledDate].push(p);
  });

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, postId: string) => {
    e.dataTransfer.setData('text/plain', postId);
    setDraggedPostId(postId);
  };

  const handleDragOver = (e: React.DragEvent, dateKey: string) => {
    e.preventDefault();
    if (dragOverDate !== dateKey) setDragOverDate(dateKey);
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

  return (
    <div
      id="calendar-week-grid"
      className="flex-1 flex flex-col min-h-0 bg-[#F7F6F3] dark:bg-[#1C1C1A] select-none"
    >
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

      {/* Weekday Column Headers: hairline bottom border */}
      <div className="grid grid-cols-7 border-b border-[#E9E7E2] dark:border-[#323230] bg-[#FFFFFF] dark:bg-[#232321]">
        {weekDays.map((day) => {
          return (
            <div
              key={day.dateKey}
              className="py-2.5 px-3 flex items-baseline justify-between border-r last:border-r-0 border-[#E9E7E2] dark:border-[#323230]"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
                  {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                {day.isToday ? (
                  <span className="w-5 h-5 rounded-full bg-[#2C6E56] text-[#F3F1EC] flex items-center justify-center text-[11px] font-normal tabular-nums">
                    {day.dayOfMonth}
                  </span>
                ) : (
                  <span className="text-xs font-normal tabular-nums text-[#2A2925] dark:text-[#D9D7D1]">
                    {day.dayOfMonth}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => openCreateModalForDate(day.dateKey)}
                className="opacity-0 hover:opacity-100 p-0.5 text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] rounded-[3px] transition-opacity focus-ring"
                title={`Add post on ${day.dateKey}`}
              >
                <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Week Grid Content: hairline column dividers */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-[#E9E7E2] dark:bg-[#323230] gap-px border-b border-[#E9E7E2] dark:border-[#323230]">
        {weekDays.map((day) => {
          const dayPosts = postsByDate[day.dateKey] || [];
          dayPosts.sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
          const isTarget = dragOverDate === day.dateKey;

          return (
            <div
              key={day.dateKey}
              id={`week-col-${day.dateKey}`}
              onDragOver={(e) => handleDragOver(e, day.dateKey)}
              onDragLeave={() => setDragOverDate(null)}
              onDrop={(e) => handleDrop(e, day.dateKey)}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  openCreateModalForDate(day.dateKey);
                }
              }}
              className={`flex flex-col p-2 space-y-1.5 overflow-y-auto transition-colors ${
                day.isToday
                  ? 'bg-[#FFFFFF] dark:bg-[#232321]'
                  : 'bg-[#FFFFFF] dark:bg-[#232321]'
              } ${isTarget ? 'bg-[#EFECE6] dark:bg-[#2B2B28]' : ''}`}
            >
              {dayPosts.map((post) => {
                const primaryPlat = post.platforms[0] || 'instagram';
                const platToken = PLATFORM_STYLE_TOKENS[primaryPlat.toLowerCase()];
                const platColor = platToken?.dotColor || '#6F6C66';
                const isSelected = selectedPost?.id === post.id;

                return (
                  <div
                    key={post.id}
                    id={`week-post-${post.id}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, post.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                    style={{ borderLeftColor: isSelected ? undefined : platColor }}
                    className={`text-left p-2 rounded-[4px] cursor-pointer text-xs transition-colors select-none focus-ring ${
                      isSelected
                        ? 'border-l-2 border-l-[#2C6E56] dark:border-l-[#5AA88C] bg-[#EFECE6] dark:bg-[#2B2B28]'
                        : 'border-l-2 bg-[#F7F6F3] dark:bg-[#1C1C1A] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                    } ${draggedPostId === post.id ? 'opacity-30' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal">
                        {post.scheduledTime || '18:00'}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: platColor }}
                        title={primaryPlat}
                      />
                    </div>
                    <p className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
