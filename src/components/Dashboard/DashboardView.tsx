import React, { useState } from 'react';
import {
  Flame,
  Target,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  calculatePostingStreak,
  getPostsThisWeekCount,
  calculateEngagement,
  formatFriendlyDate,
} from '../../utils';
import { PlatformBadge } from '../Common/PlatformBadge';

export const DashboardView: React.FC = () => {
  const { posts, settings, setSelectedPost } = useApp();
  const [leaderboardSort, setLeaderboardSort] = useState<'views' | 'engagement' | 'likes' | 'shares'>('views');

  const weeklyTarget = settings.weeklyTargetPosts || 3;

  // 1. Posting streak & week progress
  const streakWeeks = calculatePostingStreak(posts, weeklyTarget);
  const thisWeekPosts = getPostsThisWeekCount(posts, settings.weekStartsOnMonday);
  const weekProgressPercent = Math.min(
    100,
    Math.round((thisWeekPosts / Math.max(1, weeklyTarget)) * 100)
  );

  // 2. Platform Distribution
  const platformCounts: Record<string, number> = {};
  settings.platforms.forEach((p) => {
    platformCounts[p.id] = 0;
  });
  posts.forEach((post) => {
    post.platforms.forEach((pId) => {
      platformCounts[pId] = (platformCounts[pId] || 0) + 1;
    });
  });
  const totalPlatformPosts = Object.values(platformCounts).reduce((a, b) => a + b, 0);

  // 3. Content Pillar Balance & Inactivity Warning
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const twoWeeksAgoKey = twoWeeksAgo.toISOString().split('T')[0];

  const pillarStats = settings.pillars.map((pillar) => {
    const matchingPosts = posts.filter((p) => p.pillarId === pillar.id);
    const recentPosts = matchingPosts.filter((p) => p.scheduledDate >= twoWeeksAgoKey);
    const lastPostDate = matchingPosts
      .map((p) => p.scheduledDate)
      .sort()
      .pop();

    const isNeglected = recentPosts.length === 0;

    return {
      ...pillar,
      count: matchingPosts.length,
      recentCount: recentPosts.length,
      lastPostDate,
      isNeglected,
    };
  });

  // 4. Format Breakdown
  const formatCounts: Record<string, number> = {};
  posts.forEach((p) => {
    formatCounts[p.format] = (formatCounts[p.format] || 0) + 1;
  });

  // 5. Performance Summary
  const postedItems = posts.filter((p) => p.status === 'Posted' && p.metrics);
  const totalViews = postedItems.reduce((acc, p) => acc + (p.metrics?.views || 0), 0);
  const totalFollowersGained = postedItems.reduce(
    (acc, p) => acc + (p.metrics?.followersGained || 0),
    0
  );

  const avgEngagementRate =
    postedItems.length > 0
      ? (
          postedItems.reduce((acc, p) => acc + calculateEngagement(p.metrics).rate, 0) /
          postedItems.length
        ).toFixed(1)
      : '0.0';

  // 6. Top Performing Posts Leaderboard
  const sortedLeaderboard = [...postedItems].sort((a, b) => {
    if (leaderboardSort === 'views') {
      return (b.metrics?.views || 0) - (a.metrics?.views || 0);
    }
    if (leaderboardSort === 'likes') {
      return (b.metrics?.likes || 0) - (a.metrics?.likes || 0);
    }
    if (leaderboardSort === 'shares') {
      return (b.metrics?.shares || 0) - (a.metrics?.shares || 0);
    }
    if (leaderboardSort === 'engagement') {
      return calculateEngagement(b.metrics).rate - calculateEngagement(a.metrics).rate;
    }
    return 0;
  });

  // 7. Best Posting Days / Times Analysis
  const dayNameCounts: Record<string, { count: number; totalViews: number }> = {};
  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach((d) => {
    dayNameCounts[d] = { count: 0, totalViews: 0 };
  });

  postedItems.forEach((p) => {
    const dayName = new Date(p.scheduledDate + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
    });
    if (dayNameCounts[dayName]) {
      dayNameCounts[dayName].count += 1;
      dayNameCounts[dayName].totalViews += p.metrics?.views || 0;
    }
  });

  const topDays = Object.entries(dayNameCounts)
    .sort((a, b) => b[1].totalViews - a[1].totalViews)
    .slice(0, 3);

  return (
    <div id="dashboard-view-container" className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-6">
      {/* Top Stat Cards: one row of stats separated by thin vertical hairlines, on page background without outer card borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E9E7E2] dark:divide-[#323230] py-2">
        {/* Streak Stat */}
        <div className="px-4 py-2 first:pl-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              Posting streak
            </span>
            <Flame className="w-3.5 h-3.5 text-[#6F6C66] dark:text-[#9A978F] stroke-[1.5]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-medium tabular-nums text-[#2A2925] dark:text-[#D9D7D1]">
              {streakWeeks}
            </span>
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">weeks</span>
          </div>
          <p className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] mt-1 font-normal">
            Target: {weeklyTarget} posts/week
          </p>
        </div>

        {/* Weekly Target Progress */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              This week
            </span>
            <Target className="w-3.5 h-3.5 text-[#6F6C66] dark:text-[#9A978F] stroke-[1.5]" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-2xl font-medium tabular-nums text-[#2A2925] dark:text-[#D9D7D1]">
              {thisWeekPosts}
            </span>
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              of {weeklyTarget} posts
            </span>
          </div>
          {/* Progress Bar with 4px height and #2B2B28 track */}
          <div className="w-full bg-[#E9E7E2] dark:bg-[#2B2B28] h-1 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all bg-[#3E8A70]"
              style={{ width: `${weekProgressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] mt-1 block tabular-nums font-normal">
            {weekProgressPercent >= 100 ? 'Goal met' : `${weekProgressPercent}% completed`}
          </span>
        </div>

        {/* Average Engagement */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              Engagement rate
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-[#6F6C66] dark:text-[#9A978F] stroke-[1.5]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-medium tabular-nums text-[#2A2925] dark:text-[#D9D7D1]">
              {avgEngagementRate}%
            </span>
          </div>
          <p className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] mt-1 font-normal">
            Across {postedItems.length} published posts
          </p>
        </div>

        {/* Total Views */}
        <div className="px-4 py-2 last:pr-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              Total reach
            </span>
            <Eye className="w-3.5 h-3.5 text-[#6F6C66] dark:text-[#9A978F] stroke-[1.5]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-medium tabular-nums text-[#2A2925] dark:text-[#D9D7D1]">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">views</span>
          </div>
          <p className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] mt-1 font-normal">
            +{totalFollowersGained} followers logged
          </p>
        </div>
      </div>

      <div className="border-t border-[#E9E7E2] dark:border-[#323230]" />

      {/* Content Pillars Balance: Plain rows without nested bordered tiles */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
            Content pillars balance
          </h3>
          <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
            Track theme frequency to maintain audience interest
          </p>
        </div>

        <div className="divide-y divide-[#E9E7E2] dark:divide-[#323230]">
          {pillarStats.map((pil) => (
            <div
              key={pil.id}
              className="py-2.5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: pil.color }}
                />
                <span className="font-normal text-[#2A2925] dark:text-[#D9D7D1] truncate">
                  {pil.name}
                </span>
                <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] hidden sm:inline truncate max-w-xs font-normal">
                  — {pil.description}
                </span>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-right">
                {pil.isNeglected ? (
                  <span className="inline-flex items-center gap-1 text-[#B42318] dark:text-[#C54A44] text-[11px] font-normal">
                    <AlertTriangle className="w-3 h-3 stroke-[1.5]" />
                    <span>0 posts in 14+ days</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] font-normal">
                    {pil.recentCount} recent
                  </span>
                )}
                {/* Number badge becomes plain muted text */}
                <span className="text-xs tabular-nums text-[#6F6C66] dark:text-[#9A978F] w-6 text-right font-normal">
                  {pil.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E9E7E2] dark:border-[#323230]" />

      {/* Platform Breakdown & Formats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Share */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Platform distribution
            </h3>
            <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              Output spread across connected channels
            </p>
          </div>

          <div className="space-y-2.5">
            {settings.platforms.map((plat) => {
              const count = platformCounts[plat.id] || 0;
              const pct =
                totalPlatformPosts > 0 ? Math.round((count / totalPlatformPosts) * 100) : 0;

              return (
                <div key={plat.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: plat.color }}
                      />
                      <span className="text-[#2A2925] dark:text-[#D9D7D1] font-normal">
                        {plat.name}
                      </span>
                    </div>
                    <span className="text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal">
                      {count} posts ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#E9E7E2] dark:bg-[#2B2B28] h-1 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all bg-[#3E8A70]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Formats & Best Days */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Posting times and formats
            </h3>
            <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              Patterns from highest-reach publications
            </p>
          </div>

          {/* Top days by reach: Plain rows with a small dot, not bordered tiles */}
          <div>
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] block mb-2 font-normal">
              Top days by reach
            </span>
            <div className="divide-y divide-[#E9E7E2] dark:divide-[#323230]">
              {topDays.map(([day, data], idx) => (
                <div key={day} className="py-1.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E8A70]" />
                    <span className="text-[#2A2925] dark:text-[#D9D7D1] font-normal">
                      {day}
                    </span>
                  </div>
                  <span className="text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal">
                    {data.totalViews.toLocaleString()} views
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Format breakdown: chips with subtle fill and secondary text, no borders */}
          <div>
            <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] block mb-2 font-normal">
              Format breakdown
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(formatCounts).map(([fmt, count]) => (
                <div
                  key={fmt}
                  className="px-2.5 py-1 rounded-[4px] bg-[#F0EEEA] dark:bg-[#232321] text-xs text-[#6F6C66] dark:text-[#9A978F] flex items-center gap-1.5"
                >
                  <span className="font-normal">{fmt}:</span>
                  <span className="font-normal text-[#2A2925] dark:text-[#D9D7D1] tabular-nums">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E9E7E2] dark:border-[#323230]" />

      {/* Top Performing Posts Leaderboard */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Content leaderboard
            </h3>
            <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
              Ranked output from published library
            </p>
          </div>

          {/* Sort tabs */}
          <div className="flex items-center gap-1">
            {(
              [
                { id: 'views', label: 'Views' },
                { id: 'engagement', label: 'Engagement' },
                { id: 'likes', label: 'Likes' },
                { id: 'shares', label: 'Shares' },
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => setLeaderboardSort(s.id)}
                className={`h-6 px-2 text-xs rounded-[4px] transition-colors ${
                  leaderboardSort === s.id
                    ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] font-medium'
                    : 'text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        {sortedLeaderboard.length === 0 ? (
          <div className="py-8 text-center text-[#6F6C66] dark:text-[#9A978F] text-xs font-normal">
            No published posts with logged performance metrics yet.
          </div>
        ) : (
          <div className="divide-y divide-[#E9E7E2] dark:divide-[#323230]">
            {sortedLeaderboard.map((post, rank) => {
              const eng = calculateEngagement(post.metrics);
              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] px-2 rounded-[4px] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center font-mono text-xs tabular-nums text-[#6F6C66] dark:text-[#9A978F] font-normal">
                      {rank + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="flex items-center gap-1">
                          {post.platforms.map((pId) => (
                            <PlatformBadge key={pId} platformId={pId} size="sm" showName={false} />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] font-normal">
                          {formatFriendlyDate(post.scheduledDate)}
                        </span>
                      </div>
                      <h4 className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] group-hover:text-[#2C6E56] dark:group-hover:text-[#5AA88C] transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="flex items-center gap-4 text-xs shrink-0 sm:text-right">
                    <div>
                      <span className="font-normal tabular-nums text-[#2A2925] dark:text-[#D9D7D1] block">
                        {(post.metrics?.views || 0).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#6F6C66] dark:text-[#9A978F] font-normal">Views</span>
                    </div>

                    <div>
                      <span className="font-normal tabular-nums text-[#2A2925] dark:text-[#D9D7D1] block">
                        {(post.metrics?.likes || 0).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#6F6C66] dark:text-[#9A978F] font-normal">Likes</span>
                    </div>

                    <div>
                      <span className="font-normal tabular-nums text-[#2A2925] dark:text-[#D9D7D1] block">
                        {eng.rate}%
                      </span>
                      <span className="text-[10px] text-[#6F6C66] dark:text-[#9A978F] font-normal">Engagement</span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 text-[#6F6C66] dark:text-[#9A978F] stroke-[1.5]" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
