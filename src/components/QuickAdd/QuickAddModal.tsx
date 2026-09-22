import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, ArrowUpRight } from 'lucide-react';
import { formatDateKey } from '../../constants';

export const QuickAddModal: React.FC = () => {
  const {
    isQuickAddOpen,
    setIsQuickAddOpen,
    initialDateForNewPost,
    quickAddPost,
    openCreateModalForDate,
    settings,
  } = useApp();

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [scheduledDate, setScheduledDate] = useState(
    initialDateForNewPost || formatDateKey(new Date())
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isQuickAddOpen) {
      setTitle('');
      setScheduledDate(initialDateForNewPost || formatDateKey(new Date()));
      const firstEnabled = settings.platforms[0]?.id || 'instagram';
      setPlatform(firstEnabled);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isQuickAddOpen, initialDateForNewPost, settings.platforms]);

  if (!isQuickAddOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    quickAddPost(title.trim(), platform, scheduledDate);
    setIsQuickAddOpen(false);
  };

  const handleOpenFull = () => {
    setIsQuickAddOpen(false);
    openCreateModalForDate(scheduledDate);
  };

  return (
    <div
      id="quick-add-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1A]/40 transition-opacity"
      onClick={() => setIsQuickAddOpen(false)}
    >
      <div
        id="quick-add-sheet"
        className="w-full max-w-sm bg-[#FFFFFF] dark:bg-[#232321] rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] p-5 space-y-4 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Quick add post
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsQuickAddOpen(false)}
            className="text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] p-1 rounded-[3px] focus-ring"
          >
            <X className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Post Concept / Title Input */}
          <div>
            <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
              Title
            </label>
            <input
              ref={inputRef}
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 Morning Habit Secrets"
              className="w-full px-3 py-1.5 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] text-xs focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
            />
          </div>

          {/* Platform Pills */}
          <div>
            <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
              Platform
            </label>
            <div className="flex flex-wrap gap-1">
              {settings.platforms.map((p) => {
                const isSelected = platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-xs transition-colors border font-normal focus-ring ${
                      isSelected
                        ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] border-[#2C6E56] dark:border-[#5AA88C]'
                        : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#6F6C66] dark:text-[#9A978F] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                    }`}
                  >
                    <span className="capitalize">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3 py-1.5 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] text-xs focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleOpenFull}
              className="text-xs font-normal text-[#2C6E56] dark:text-[#5AA88C] hover:underline inline-flex items-center gap-1 focus-ring"
            >
              <span>Full editor</span>
              <ArrowUpRight className="w-3 h-3 stroke-[1.5]" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsQuickAddOpen(false)}
                className="h-7 px-2.5 rounded-[4px] text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="inline-flex items-center gap-1 h-7 px-3 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] disabled:opacity-50 text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
              >
                <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
