import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Check } from 'lucide-react';
import { formatDateKey } from '../../constants';
import { STATUS_CONFIG, PLATFORM_STYLE_TOKENS } from '../../utils';

export const TodayView: React.FC = () => {
  const {
    posts,
    openQuickAdd,
    setSelectedPost,
    selectedPost,
    updatePostStatus,
  } = useApp();

  const todayKey = formatDateKey(new Date());
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  // Posts scheduled for today
  const todayPosts = posts
    .filter((p) => p.scheduledDate === todayKey)
    .sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));

  const pendingPosts = todayPosts.filter((p) => p.status !== 'Posted');
  const publishedPosts = todayPosts.filter((p) => p.status === 'Posted');

  // Overdue posts
  const overduePosts = posts.filter(
    (p) => p.status !== 'Posted' && p.scheduledDate < todayKey
  );

  return (
    <div
      id="today-view"
      className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-[1100px] w-full"
    >
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="page-title">
            {todayFormatted}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            {todayPosts.length === 0
              ? 'Nothing scheduled for today.'
              : `${pendingPosts.length} pending · ${publishedPosts.length} posted`}
          </p>
        </div>

        <button
          id="today-quick-add-button"
          type="button"
          onClick={() => openQuickAdd(todayKey)}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-sm transition-all focus-ring text-sm font-medium"
        >
          <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>New post</span>
        </button>
      </div>

      {/* Overdue Warning Notice if any */}
      {overduePosts.length > 0 && (
        <div className="mb-8 p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 text-sm text-red-700 dark:text-red-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>{overduePosts.length} overdue post{overduePosts.length > 1 ? 's' : ''} from earlier dates</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPost(overduePosts[0])}
            className="text-sm text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors font-medium focus-ring underline underline-offset-4"
          >
            Review first
          </button>
        </div>
      )}

      {/* Daily Agenda List */}
      <div className="space-y-4">
        <div>
          <h2 className="section-title mb-4">
            Schedule
          </h2>

          {todayPosts.length === 0 ? (
            <div className="py-16 text-center border-t border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm font-medium">
                No content scheduled for today.
              </p>
              <button
                type="button"
                onClick={() => openQuickAdd(todayKey)}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 bg-transparent text-slate-900 dark:text-slate-50 shadow-sm transition-all focus-ring"
              >
                Schedule a post
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {todayPosts.map((post) => {
                const isPublished = post.status === 'Posted';
                const statusCfg = STATUS_CONFIG[post.status];
                const primaryPlat = post.platforms[0] || 'instagram';
                const platToken = PLATFORM_STYLE_TOKENS[primaryPlat.toLowerCase()];
                const isSelected = selectedPost?.id === post.id;

                return (
                  <div
                    key={post.id}
                    id={`today-row-${post.id}`}
                    onClick={() => setSelectedPost(post)}
                    className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all focus-ring shadow-sm ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-500/50 dark:bg-indigo-900/20 ring-1 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
                    }`}
                  >
                    {/* Time */}
                    <div className="w-20 shrink-0 text-sm text-slate-500 dark:text-slate-400 tabular-nums font-medium">
                      {post.scheduledTime || '18:00'}
                    </div>

                    <div className="flex items-center gap-3 min-w-0 flex-1 pr-6">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: platToken?.dotColor || '#94a3b8' }}
                        title={primaryPlat}
                      />
                      <span
                        className={`text-sm font-medium truncate ${
                          isPublished
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {post.title}
                      </span>
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-4 shrink-0">
                      {/* Status indicator */}
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 w-28 justify-end font-medium">
                        <span
                          className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: statusCfg.dot }}
                        />
                        <span className="truncate">{statusCfg.label}</span>
                      </div>

                      {/* Mark as posted action */}
                      {!isPublished ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updatePostStatus(post.id, 'Posted');
                          }}
                          className="h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 transition-all shadow-sm focus-ring font-medium"
                        >
                          Mark as posted
                        </button>
                      ) : (
                        <span className="h-8 px-3 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                          <Check className="w-4 h-4 stroke-[2]" />
                          <span>Posted</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
