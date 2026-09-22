import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CalendarFiltersBar } from './CalendarFiltersBar';
import { MonthGrid } from './MonthGrid';
import { WeekGrid } from './WeekGrid';
import { ListView } from './ListView';
import { CalendarViewMode } from '../../types';

export const CalendarView: React.FC = () => {
  const {
    calendarViewMode,
    setCalendarViewMode,
    currentDate,
    setCurrentDate,
    openQuickAdd,
    settings,
  } = useApp();

  const goToPrevious = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      if (calendarViewMode === 'week') {
        d.setDate(d.getDate() - 7);
      } else {
        d.setMonth(d.getMonth() - 1);
      }
      return d;
    });
  };

  const goToNext = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      if (calendarViewMode === 'week') {
        d.setDate(d.getDate() + 7);
      } else {
        d.setMonth(d.getMonth() + 1);
      }
      return d;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getHeaderTitle = () => {
    if (calendarViewMode === 'month' || calendarViewMode === 'list') {
      return currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
    }

    const d = new Date(currentDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (settings.weekStartsOnMonday ? (day === 0 ? -6 : 1) : 0);
    const startOfWeek = new Date(d.setDate(diff));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });

    if (startMonth === endMonth) {
      return `${startMonth} ${startOfWeek.getDate()} – ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
    }
    return `${startMonth} ${startOfWeek.getDate()} – ${endMonth} ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
  };

  return (
    <div
      id="calendar-view-container"
      className="flex-1 flex flex-col h-full overflow-hidden bg-[#F7F6F3] dark:bg-[#1C1C1A]"
    >
      {/* Calendar Sub-Header: left-aligned title, hairline dividers, compact controls */}
      <div className="bg-[#FFFFFF] dark:bg-[#232321] border-b border-[#E9E7E2] dark:border-[#323230] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Period title + Navigation */}
        <div className="flex items-center gap-3 sm:gap-4">
          <h2 className="page-title text-2xl sm:text-[28px] text-[#2A2925] dark:text-[#D9D7D1] font-medium">
            {getHeaderTitle()}
          </h2>

          <div className="flex items-center border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] overflow-hidden h-7">
            <button
              type="button"
              onClick={goToPrevious}
              className="px-2 h-full hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-colors focus-ring"
              title="Previous period"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={goToToday}
              className="px-2.5 h-full text-xs font-normal border-x border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] transition-colors focus-ring"
            >
              Today
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="px-2 h-full hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-colors focus-ring"
              title="Next period"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Right: View Mode Segmented Control + Single Accent Button */}
        <div className="flex items-center gap-2">
          {/* Segmented control */}
          <div className="flex items-center border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] p-0.5 h-7 bg-[#F7F6F3] dark:bg-[#1C1C1A]">
            {(
              [
                { id: 'month', label: 'Month' },
                { id: 'week', label: 'Week' },
                { id: 'list', label: 'List' },
              ] as const
            ).map((tab) => {
              const isActive = calendarViewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`view-tab-${tab.id}`}
                  onClick={() => setCalendarViewMode(tab.id as CalendarViewMode)}
                  className={`px-3 h-full text-xs rounded-[3px] transition-colors font-normal focus-ring ${
                    isActive
                      ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1]'
                      : 'text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Single Accent Button */}
          <button
            type="button"
            onClick={() => openQuickAdd()}
            className="inline-flex items-center gap-1.5 h-7 px-3 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
          >
            <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>New post</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <CalendarFiltersBar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {calendarViewMode === 'month' && <MonthGrid currentDate={currentDate} />}
        {calendarViewMode === 'week' && <WeekGrid currentDate={currentDate} />}
        {calendarViewMode === 'list' && <ListView />}
      </div>
    </div>
  );
};
