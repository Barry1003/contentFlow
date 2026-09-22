import React from 'react';
import {
  Sparkles,
  Search,
  Plus,
  X,
  Settings,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    activeTab,
    dueTodayOrTomorrowPosts,
    bannerDismissed,
    setBannerDismissed,
    setSelectedPost,
    openQuickAdd,
    setIsSearchOpen,
    setIsSettingsOpen,
    setIsAiIdeaModalOpen,
  } = useApp();

  const tabLabels: Record<string, string> = {
    today: 'Today',
    calendar: 'Calendar',
    board: 'Pipeline',
    studio: 'Content Studio',
    ideas: 'Ideas',
    insights: 'Insights',
    dashboard: 'Insights',
    analytics: 'Insights',
    settings: 'Settings',
  };

  return (
    <header
      id="app-top-header"
      className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
    >
      {/* Due Soon Reminder: same panel color as sidebar, amber shown only as small dot and text color */}
      {!bannerDismissed && dueTodayOrTomorrowPosts.length > 0 && (
        <div
          id="due-posts-banner"
          className="border-b border-slate-200 dark:border-slate-800 px-4 py-2 text-sm flex items-center justify-between text-slate-700 dark:text-slate-200 bg-amber-50/50 dark:bg-amber-900/10"
        >
          <div className="flex items-center gap-3 overflow-x-auto py-0.5">
            <span className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-500 shrink-0 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Due soon ({dueTodayOrTomorrowPosts.length}):
            </span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {dueTodayOrTomorrowPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="px-3 py-1 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-2 text-sm font-medium border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm"
                >
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">
                    {post.title}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    {post.scheduledTime || '18:00'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setBannerDismissed(true)}
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md transition-colors shrink-0 ml-3"
            title="Dismiss reminder"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4 w-full">
        {/* Left: Screen title */}
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            {tabLabels[activeTab] || 'Workspace'}
          </h1>
        </div>

        {/* Right Actions: Search, Inspire, New Post, Settings */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            id="header-search-btn"
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm flex items-center gap-2 transition-all shadow-sm focus-ring"
            title="Search (/)"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden sm:inline font-medium">Search</span>
            <kbd className="hidden md:inline text-[10px] font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded text-slate-500 dark:text-slate-400 ml-1">
              /
            </kbd>
          </button>

          {/* AI Inspire */}
          <button
            id="header-ai-inspire-btn"
            type="button"
            onClick={() => setIsAiIdeaModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm transition-all shadow-sm font-medium focus-ring"
            title="Brainstorm post concepts with AI"
          >
            <Sparkles className="w-4 h-4 stroke-[1.5] text-indigo-500" />
            <span>Inspire</span>
          </button>

          {/* Single Accent Button: New Post */}
          <button
            id="header-quick-add-btn"
            type="button"
            onClick={() => openQuickAdd()}
            className="inline-flex items-center gap-2 h-8 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium transition-all shadow-sm hover:shadow focus-ring"
          >
            <Plus className="w-4 h-4 stroke-[2]" />
            <span>New post</span>
          </button>

          {/* Settings Trigger */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center justify-center transition-all shadow-sm focus-ring"
            title="Settings"
          >
            <Settings className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};
