import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALL_FORMATS, ALL_STATUSES, STATUS_CONFIG } from '../../utils';
import { PostFormat, PostStatus } from '../../types';

export const CalendarFiltersBar: React.FC = () => {
  const { filters, setFilters, settings, overduePosts } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    filters.platforms.length +
    filters.statuses.length +
    filters.pillars.length +
    filters.formats.length +
    (filters.onlyOverdue ? 1 : 0);

  const clearAllFilters = () => {
    setFilters({
      search: '',
      platforms: [],
      statuses: [],
      pillars: [],
      formats: [],
      onlyOverdue: false,
    });
  };

  const togglePlatform = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(id)
        ? prev.platforms.filter((p) => p !== id)
        : [...prev.platforms, id],
    }));
  };

  const toggleStatus = (st: PostStatus) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(st)
        ? prev.statuses.filter((s) => s !== st)
        : [...prev.statuses, st],
    }));
  };

  const togglePillar = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      pillars: prev.pillars.includes(id)
        ? prev.pillars.filter((p) => p !== id)
        : [...prev.pillars, id],
    }));
  };

  const toggleFormat = (fmt: PostFormat) => {
    setFilters((prev) => ({
      ...prev,
      formats: prev.formats.includes(fmt)
        ? prev.formats.filter((f) => f !== fmt)
        : [...prev.formats, fmt],
    }));
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#232321] border-b border-[#E9E7E2] dark:border-[#323230] px-4 py-2 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="w-3.5 h-3.5 stroke-[1.5] absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6F6C66] dark:text-[#9A978F]" />
          <input
            id="calendar-search-input"
            type="text"
            placeholder="Search posts..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full h-7 pl-8 pr-7 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]"
            >
              <X className="w-3 h-3 stroke-[1.5]" />
            </button>
          )}
        </div>

        {/* Quick Filter Badges & Toggle */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Overdue quick toggle */}
          {overduePosts.length > 0 && (
            <button
              id="filter-overdue-toggle"
              type="button"
              onClick={() =>
                setFilters((prev) => ({ ...prev, onlyOverdue: !prev.onlyOverdue }))
              }
              className={`h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] text-xs border transition-colors focus-ring font-normal ${
                filters.onlyOverdue
                  ? 'border-[#B42318] dark:border-[#C54A44] text-[#B42318] dark:text-[#C54A44] bg-[#EFECE6] dark:bg-[#2B2B28]'
                  : 'border-[#E9E7E2] dark:border-[#323230] text-[#B42318] dark:text-[#C54A44] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#B42318] dark:bg-[#C54A44]" />
              <span>Overdue ({overduePosts.length})</span>
            </button>
          )}

          {/* Filter dropdown button */}
          <button
            id="calendar-filter-toggle-btn"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] text-xs border transition-colors focus-ring font-normal ${
              isOpen || activeFilterCount > 0
                ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230]'
                : 'text-[#6F6C66] dark:text-[#9A978F] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'
            }`}
          >
            <Filter className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#2C6E56] dark:bg-[#5AA88C] text-[#F3F1EC] dark:text-[#1C1C1A] text-[10px] flex items-center justify-center tabular-nums">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={`w-3 h-3 stroke-[1.5] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Clear Filters button */}
          {activeFilterCount > 0 && (
            <button
              id="clear-filters-btn"
              type="button"
              onClick={clearAllFilters}
              className="h-7 inline-flex items-center gap-1 text-xs text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] px-2 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring font-normal"
            >
              <RotateCcw className="w-3 h-3 stroke-[1.5]" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filter Row */}
      {isOpen && (
        <div className="pt-3 mt-2 border-t border-[#E9E7E2] dark:border-[#323230] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Platform Filter */}
          <div>
            <label className="block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal">
              Platform
            </label>
            <div className="flex flex-wrap gap-1">
              {settings.platforms.map((p) => {
                const isSelected = filters.platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`text-xs px-2 py-1 rounded-[4px] border transition-colors focus-ring font-normal ${
                      isSelected
                        ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]'
                        : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal">
              Status
            </label>
            <div className="flex flex-wrap gap-1">
              {ALL_STATUSES.map((st) => {
                const isSelected = filters.statuses.includes(st);
                const cfg = STATUS_CONFIG[st];
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => toggleStatus(st)}
                    className={`text-xs px-2 py-1 rounded-[4px] border transition-colors focus-ring font-normal ${
                      isSelected
                        ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]'
                        : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                    }`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pillar Filter */}
          <div>
            <label className="block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal">
              Pillar
            </label>
            <div className="flex flex-wrap gap-1">
              {settings.pillars.map((pil) => {
                const isSelected = filters.pillars.includes(pil.id);
                return (
                  <button
                    key={pil.id}
                    type="button"
                    onClick={() => togglePillar(pil.id)}
                    className={`text-xs px-2 py-1 rounded-[4px] border transition-colors flex items-center gap-1.5 focus-ring font-normal ${
                      isSelected
                        ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]'
                        : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: pil.color }}
                    />
                    <span>{pil.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Format Filter */}
          <div>
            <label className="block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal">
              Format
            </label>
            <div className="flex flex-wrap gap-1">
              {ALL_FORMATS.slice(0, 5).map((fmt) => {
                const isSelected = filters.formats.includes(fmt);
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => toggleFormat(fmt)}
                    className={`text-xs px-2 py-1 rounded-[4px] border transition-colors focus-ring font-normal ${
                      isSelected
                        ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]'
                        : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
