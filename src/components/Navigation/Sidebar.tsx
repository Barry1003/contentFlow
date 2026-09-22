import React from 'react';
import {
  Sun,
  Calendar as CalendarIcon,
  Kanban,
  Lightbulb,
  TrendingUp,
  Plus,
  Search,
  Settings,
  HelpCircle,
  PenTool,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    openQuickAdd,
    overduePosts,
    settings,
    setIsSearchOpen,
    setIsShortcutsOpen,
    setIsSettingsOpen,
  } = useApp();

  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    {
      id: 'today',
      label: 'Today',
      icon: Sun,
      badge: overduePosts.length > 0 ? overduePosts.length : undefined,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: CalendarIcon,
    },
    {
      id: 'board',
      label: 'Pipeline',
      icon: Kanban,
    },
    {
      id: 'studio',
      label: 'Content Studio',
      icon: PenTool,
    },
    {
      id: 'ideas',
      label: 'Ideas',
      icon: Lightbulb,
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: TrendingUp,
    },
  ];

  return (
    <aside
      id="desktop-sidebar"
      className="hidden md:flex flex-col w-[240px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 h-screen select-none px-4 py-4 shrink-0 z-30 justify-between transition-colors shadow-sm"
    >
      <div className="space-y-3">
        {/* Workspace Brand / Header */}
        <div className="flex items-center justify-between px-1.5 pt-1">
          <div
            onClick={() => setActiveTab('today')}
            className="cursor-pointer"
          >
            <span className="font-editorial text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50 block leading-none">
              ContentFlow
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsShortcutsOpen(true)}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
            title="Shortcuts (?)"
          >
            <HelpCircle className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>

        {/* Global Action: Single Accent Button */}
        <button
          id="sidebar-quick-post-btn"
          type="button"
          onClick={() => openQuickAdd()}
          className="w-full flex items-center justify-between h-9 px-3 mt-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium text-sm transition-all shadow-sm hover:shadow focus-ring"
        >
          <div className="flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>New post</span>
          </div>
          <kbd className="text-[10px] opacity-75 font-mono">N</kbd>
        </button>

        {/* Search Input Trigger */}
        <button
          id="sidebar-search-btn"
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 transition-colors focus-ring"
        >
          <div className="flex items-center gap-2 font-normal">
            <Search className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Search</span>
          </div>
          <kbd className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800 px-1 rounded">/</kbd>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeTab === item.id ||
              (item.id === 'insights' &&
                (activeTab === 'dashboard' || activeTab === 'analytics'));

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`group w-full flex items-center justify-between px-3 py-2 text-sm transition-all focus-ring rounded-lg ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 stroke-[1.5] shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="text-[11px] tabular-nums font-medium bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Settings */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className="w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center justify-between text-left transition-colors text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 focus-ring"
        >
          <span className="truncate font-medium">{settings.creatorName || 'Settings'}</span>
          <Settings className="w-4 h-4 stroke-[1.5] shrink-0" />
        </button>
      </div>
    </aside>
  );
};
