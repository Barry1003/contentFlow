import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Loader2,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostFormat } from '../../types';
import { PlatformBadge } from '../Common/PlatformBadge';

export const AiMonthPlannerModal: React.FC = () => {
  const {
    isAiPlanModalOpen,
    setIsAiPlanModalOpen,
    settings,
    addPost,
    setActiveTab,
    setCurrentDate,
  } = useApp();

  const [postsPerWeek, setPostsPerWeek] = useState(settings.weeklyTargetPosts || 3);
  const [themeFocus, setThemeFocus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [planSchedule, setPlanSchedule] = useState<
    {
      dayNumber: number;
      dateKey: string;
      title: string;
      hook: string;
      pillar: string;
      platforms: string[];
      format: string;
      time: string;
    }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccessAdded, setIsSuccessAdded] = useState(false);

  if (!isAiPlanModalOpen) return null;

  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const monthName = nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsSuccessAdded(false);

    try {
      const res = await fetch('/api/gemini/plan-month', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: settings.niche,
          postsPerWeek,
          themeFocus: themeFocus.trim(),
          pillars: settings.pillars.map((p) => p.name),
          platforms: settings.platforms.map((p) => p.id),
          monthYear: monthName,
        }),
      });

      const data = await res.json();
      if (data.schedule && Array.isArray(data.schedule) && data.schedule.length > 0) {
        const year = nextMonth.getFullYear();
        const month = nextMonth.getMonth();

        const formatted = data.schedule.map((item: any, idx: number) => {
          const dayNum = Math.min(28, Math.max(1, item.dayNumber || (idx + 1) * 2));
          const d = new Date(year, month, dayNum);
          const dateKey = d.toISOString().split('T')[0];
          return {
            dayNumber: dayNum,
            dateKey,
            title: item.title,
            hook: item.hook || '',
            pillar: item.pillar || settings.pillars[0]?.name,
            platforms: item.platforms || ['instagram', 'tiktok'],
            format: item.format || 'Reel/Short',
            time: item.time || '18:00',
          };
        });

        setPlanSchedule(formatted);
      } else {
        const year = nextMonth.getFullYear();
        const month = nextMonth.getMonth();
        const sampleDayOffsets = [2, 5, 8, 11, 14, 17, 20, 23, 26, 28];

        const fallbackItems = sampleDayOffsets.map((dayNum, i) => {
          const d = new Date(year, month, dayNum);
          const dateKey = d.toISOString().split('T')[0];
          const pillar = settings.pillars[i % settings.pillars.length];

          return {
            dayNumber: dayNum,
            dateKey,
            title: `Week ${Math.floor(i / 3) + 1} Focus: ${pillar.name}`,
            hook: 'If you only do one thing this week, start with this.',
            pillar: pillar.name,
            platforms: ['instagram', 'tiktok'],
            format: i % 2 === 0 ? 'Reel/Short' : 'Carousel',
            time: '18:00',
          };
        });

        setPlanSchedule(fallbackItems);
        if (data.error) {
          setErrorMessage('Using curated schedule (configure Gemini API key for dynamic plan).');
        }
      }
    } catch (err: any) {
      console.error('Plan month error:', err);
      const year = nextMonth.getFullYear();
      const month = nextMonth.getMonth();
      const fallbackItems = [2, 6, 9, 13, 16, 20, 23, 27].map((dayNum, i) => {
        const d = new Date(year, month, dayNum);
        return {
          dayNumber: dayNum,
          dateKey: d.toISOString().split('T')[0],
          title: `Pillar ${i + 1}: Key Topic Breakdown`,
          hook: 'The counter-intuitive method to try this week.',
          pillar: settings.pillars[i % settings.pillars.length].name,
          platforms: ['instagram', 'tiktok'],
          format: 'Reel/Short',
          time: '18:00',
        };
      });
      setPlanSchedule(fallbackItems);
      setErrorMessage('Using offline monthly schedule.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAllToCalendar = () => {
    planSchedule.forEach((item) => {
      const matchingPillar =
        settings.pillars.find(
          (p) => p.name.toLowerCase() === (item.pillar || '').toLowerCase()
        ) || settings.pillars[0];

      addPost({
        title: item.title,
        platforms: item.platforms,
        pillarId: matchingPillar?.id || 'tutorials',
        format: (item.format as PostFormat) || 'Reel/Short',
        scheduledDate: item.dateKey,
        scheduledTime: item.time,
        status: 'Idea',
        hook: item.hook,
        caption: `${item.title}\n\nFull breakdown coming soon.`,
        hashtags: ['#creator', '#dailyroutine'],
        callToAction: 'Save for later',
        notes: `AI generated schedule for ${item.pillar}`,
        priority: 'medium',
        isCollaboration: false,
        checklist: [
          { id: '1', label: 'Outline hook & script', completed: false },
          { id: '2', label: 'Record video footage', completed: false },
          { id: '3', label: 'Edit & export', completed: false },
        ],
        assetLinks: [],
      });
    });

    setIsSuccessAdded(true);
    setTimeout(() => {
      setIsAiPlanModalOpen(false);
      setCurrentDate(nextMonth);
      setActiveTab('calendar');
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={() => setIsAiPlanModalOpen(false)}
    >
      <div
        className="bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[8px] w-full max-w-2xl max-h-[88vh] flex flex-col shadow-xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-medium text-sm text-[#1C1B19] dark:text-[#F3F2EF]">
              Monthly content planner
            </h3>
            <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
              Generate a balanced schedule for {monthName}
            </p>
          </div>
          <button
            onClick={() => setIsAiPlanModalOpen(false)}
            className="p-1 text-[#6F6C66] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] rounded-[4px]"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="p-3 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] space-y-2 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                Frequency
              </label>
              <select
                value={postsPerWeek}
                onChange={(e) => setPostsPerWeek(Number(e.target.value))}
                className="w-full px-2.5 py-1 text-xs bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF]"
              >
                <option value={2}>2 posts/week</option>
                <option value={3}>3 posts/week</option>
                <option value={4}>4 posts/week</option>
                <option value={5}>5 posts/week</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-medium uppercase tracking-wider text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                Campaign or theme focus
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Back to school, Product launch, Workflow overhaul"
                  value={themeFocus}
                  onChange={(e) => setThemeFocus(e.target.value)}
                  className="flex-1 px-2.5 py-1 text-xs bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] placeholder-[#6F6C66] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                />
                <button
                  onClick={handleGeneratePlan}
                  disabled={isLoading}
                  className="h-7 px-3 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin stroke-[1.5]" />
                      <span>Planning...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 stroke-[1.5]" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-[#B54708]">{errorMessage}</p>
          )}
        </div>

        {/* Schedule Preview Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {planSchedule.length === 0 && !isLoading && (
            <div className="py-10 text-center">
              <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93] mb-3">
                No schedule generated yet. Click generate to create a plan for {monthName}.
              </p>
              <button
                onClick={handleGeneratePlan}
                className="h-7 px-3 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] transition-colors"
              >
                Generate plan
              </button>
            </div>
          )}

          {planSchedule.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs tabular-nums text-[#6F6C66] dark:text-[#9E9B93] pt-0.5 shrink-0">
                  Day {item.dayNumber}
                </span>

                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93]">
                      {item.pillar}
                    </span>
                    <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93]">
                      • {item.format}
                    </span>
                    <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93] tabular-nums font-mono">
                      • {item.time}
                    </span>
                  </div>
                  <h4 className="font-medium text-xs text-[#1C1B19] dark:text-[#F3F2EF]">
                    {item.title}
                  </h4>
                  {item.hook && (
                    <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93] italic mt-0.5">
                      "{item.hook}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                {item.platforms.map((pId) => (
                  <PlatformBadge key={pId} platformId={pId} size="sm" showName={false} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {planSchedule.length > 0 && (
          <div className="px-4 py-2.5 border-t border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] flex items-center justify-between shrink-0">
            <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
              {planSchedule.length} posts generated
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsAiPlanModalOpen(false)}
                className="h-7 px-2.5 text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]"
              >
                Cancel
              </button>

              <button
                id="add-all-plan-to-calendar-btn"
                onClick={handleAddAllToCalendar}
                disabled={isSuccessAdded}
                className="h-7 px-3 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] transition-colors flex items-center gap-1"
              >
                {isSuccessAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2]" />
                    <span>Added to calendar</span>
                  </>
                ) : (
                  <span>Add all to calendar</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
