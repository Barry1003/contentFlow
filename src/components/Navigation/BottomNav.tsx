import React from 'react';
import {
  Sun,
  Calendar as CalendarIcon,
  Plus,
  Kanban,
  Lightbulb,
  PenTool,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, openQuickAdd } = useApp();

  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] dark:bg-[#232321] border-t border-[#E9E7E2] dark:border-[#323230] flex items-center justify-around h-12 select-none"
    >
      <button
        id="mobile-nav-today"
        onClick={() => setActiveTab('today')}
        className={`flex flex-col items-center justify-center flex-1 h-full ${
          activeTab === 'today'
            ? 'text-[#2A2925] dark:text-[#D9D7D1] font-normal'
            : 'text-[#6F6C66] dark:text-[#9A978F]'
        }`}
      >
        <Sun className="w-4 h-4 stroke-[1.5]" />
        <span className="text-[11px] mt-0.5">Today</span>
      </button>

      <button
        id="mobile-nav-calendar"
        onClick={() => setActiveTab('calendar')}
        className={`flex flex-col items-center justify-center flex-1 h-full ${
          activeTab === 'calendar'
            ? 'text-[#2A2925] dark:text-[#D9D7D1] font-normal'
            : 'text-[#6F6C66] dark:text-[#9A978F]'
        }`}
      >
        <CalendarIcon className="w-4 h-4 stroke-[1.5]" />
        <span className="text-[11px] mt-0.5">Calendar</span>
      </button>

      <button
        id="mobile-quick-add-btn"
        onClick={() => openQuickAdd()}
        className="flex flex-col items-center justify-center flex-1 h-full text-[#2C6E56] dark:text-[#5AA88C]"
        aria-label="Add post"
      >
        <Plus className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[11px] mt-0.5">Add</span>
      </button>

      <button
        id="mobile-nav-board"
        onClick={() => setActiveTab('board')}
        className={`flex flex-col items-center justify-center flex-1 h-full ${
          activeTab === 'board'
            ? 'text-[#2A2925] dark:text-[#D9D7D1] font-normal'
            : 'text-[#6F6C66] dark:text-[#9A978F]'
        }`}
      >
        <Kanban className="w-4 h-4 stroke-[1.5]" />
        <span className="text-[11px] mt-0.5">Pipeline</span>
      </button>

      <button
        id="mobile-nav-ideas"
        onClick={() => setActiveTab('ideas')}
        className={`flex flex-col items-center justify-center flex-1 h-full ${
          activeTab === 'ideas'
            ? 'text-[#2A2925] dark:text-[#D9D7D1] font-normal'
            : 'text-[#6F6C66] dark:text-[#9A978F]'
        }`}
      >
        <Lightbulb className="w-4 h-4 stroke-[1.5]" />
        <span className="text-[11px] mt-0.5">Ideas</span>
      </button>
    </nav>
  );
};
