import React, { useState } from 'react';
import {
  Download,
  Upload,
  Trash2,
  Check,
  Repeat,
  RotateCcw,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ContentPillar, RecurringSchedule, UserSettings } from '../../types';
import { ACCENT_COLORS } from '../../utils';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    clearSampleData,
    restoreSampleData,
    exportJsonBackup,
    importJsonBackup,
    exportCsvCalendar,
    applyRecurringSchedules,
    posts,
    ideas,
    addToast,
  } = useApp();

  // Pillar editing state
  const [newPillarName, setNewPillarName] = useState('');
  const [newPillarColor, setNewPillarColor] = useState('#2C6E56');
  const [newPillarDesc, setNewPillarDesc] = useState('');

  // Recurring post state
  const [newRecurringTitle, setNewRecurringTitle] = useState('');
  const [newRecurringDay, setNewRecurringDay] = useState(1); // Monday
  const [newRecurringTime, setNewRecurringTime] = useState('18:00');
  const [newRecurringPillar, setNewRecurringPillar] = useState(
    settings.pillars[0]?.id || 'tutorials'
  );

  const [recurringGeneratedMessage, setRecurringGeneratedMessage] = useState<string | null>(null);

  // Add new pillar
  const handleAddPillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPillarName.trim()) return;

    const newPillar: ContentPillar = {
      id: `pil-${Date.now()}`,
      name: newPillarName.trim(),
      color: newPillarColor,
      description: newPillarDesc.trim() || 'Custom content pillar',
    };

    updateSettings({
      pillars: [...settings.pillars, newPillar],
    });

    setNewPillarName('');
    setNewPillarDesc('');
    addToast('Pillar added', undefined, 'success');
  };

  const handleDeletePillar = (id: string) => {
    if (settings.pillars.length <= 1) {
      alert('You must keep at least one content pillar.');
      return;
    }
    updateSettings({
      pillars: settings.pillars.filter((p) => p.id !== id),
    });
    addToast('Pillar removed', undefined, 'info');
  };

  // Add new recurring schedule
  const handleAddRecurring = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecurringTitle.trim()) return;

    const newRec: RecurringSchedule = {
      id: `rec-${Date.now()}`,
      title: newRecurringTitle.trim(),
      daysOfWeek: [Number(newRecurringDay)],
      time: newRecurringTime,
      pillarId: newRecurringPillar,
      platforms: ['instagram', 'tiktok'],
      format: 'Reel/Short',
      isActive: true,
    };

    updateSettings({
      recurringSchedules: [...settings.recurringSchedules, newRec],
    });

    setNewRecurringTitle('');
    addToast('Recurring series added', undefined, 'success');
  };

  const handleToggleRecurring = (id: string) => {
    updateSettings({
      recurringSchedules: settings.recurringSchedules.map((r) =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      ),
    });
  };

  const handleDeleteRecurring = (id: string) => {
    updateSettings({
      recurringSchedules: settings.recurringSchedules.filter((r) => r.id !== id),
    });
  };

  const handleTriggerRecurringGeneration = () => {
    const count = applyRecurringSchedules(4);
    setRecurringGeneratedMessage(
      `Generated ${count} recurring posts across the next 4 weeks.`
    );
    addToast(`Generated ${count} recurring posts`, undefined, 'success');
    setTimeout(() => setRecurringGeneratedMessage(null), 4000);
  };

  // File import ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importJsonBackup(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div
      id="settings-view-container"
      className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-3xl mx-auto w-full space-y-6"
    >
      <div className="border-b border-[#E9E7E2] dark:border-[#323230] pb-3">
        <h1 className="text-sm font-medium text-[#2A2925] dark:text-[#D9D7D1]">
          Settings
        </h1>
        <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mt-0.5">
          Manage creator profile, content pillars, series automation, and data backups
        </p>
      </div>

      <div className="bg-[#FFFFFF] dark:bg-[#232321] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] divide-y divide-[#E9E7E2] dark:divide-[#323230]">
        {/* 1. Creator Profile */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <h2 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Creator profile
            </h2>
            <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]">
              Creator name, niche, cadence targets, and calendar preferences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                Creator name
              </label>
              <input
                id="settings-creator-name-input"
                type="text"
                value={settings.creatorName}
                onChange={(e) => updateSettings({ creatorName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                Niche / Topic
              </label>
              <input
                id="settings-creator-niche-input"
                type="text"
                value={settings.niche}
                onChange={(e) => updateSettings({ niche: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                Weekly target posts
              </label>
              <input
                type="number"
                min={1}
                max={21}
                value={settings.weeklyTargetPosts || 3}
                onChange={(e) =>
                  updateSettings({ weeklyTargetPosts: Number(e.target.value) || 1 })
                }
                className="w-full px-3 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                Week starts on
              </label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => updateSettings({ weekStartsOnMonday: true })}
                  className={`flex-1 h-7 text-xs font-normal rounded-[4px] border transition-colors focus-ring ${
                    settings.weekStartsOnMonday
                      ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] border-[#2C6E56] dark:border-[#5AA88C]'
                      : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#6F6C66] dark:text-[#9A978F] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                  }`}
                >
                  Monday
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings({ weekStartsOnMonday: false })}
                  className={`flex-1 h-7 text-xs font-normal rounded-[4px] border transition-colors focus-ring ${
                    !settings.weekStartsOnMonday
                      ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] border-[#2C6E56] dark:border-[#5AA88C]'
                      : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#6F6C66] dark:text-[#9A978F] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                  }`}
                >
                  Sunday
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Color Vibe & Accent Selection */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <h2 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Accent color
            </h2>
            <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]">
              Selected tone for highlights and primary indicators
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
            {ACCENT_COLORS.map((col) => {
              const isSelected = settings.accentColor === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() =>
                    updateSettings({
                      accentColor: col.id as UserSettings['accentColor'],
                    })
                  }
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] border text-xs transition-colors focus-ring ${
                    isSelected
                      ? 'border-[#2C6E56] dark:border-[#5AA88C] bg-[#EFECE6] dark:bg-[#2B2B28]'
                      : 'border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="font-normal text-[#2A2925] dark:text-[#D9D7D1] truncate">
                    {col.name}
                  </span>
                  {isSelected && <Check className="w-3 h-3 text-[#2C6E56] dark:text-[#5AA88C] ml-auto shrink-0 stroke-[1.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Content Pillars */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <h2 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Content pillars
            </h2>
            <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]">
              Themes used to balance your distribution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {settings.pillars.map((pil) => (
              <div
                key={pil.id}
                className="flex items-center justify-between px-3 py-2 rounded-[4px] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: pil.color }}
                  />
                  <div>
                    <span className="font-normal text-[#2A2925] dark:text-[#D9D7D1] block">
                      {pil.name}
                    </span>
                    <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F]">
                      {pil.description}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeletePillar(pil.id)}
                  className="p-1 text-[#6F6C66] dark:text-[#9A978F] hover:text-[#9E3A34] dark:hover:text-[#C45B53] rounded-[3px] transition-colors focus-ring"
                  title="Remove pillar"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Pillar Form */}
          <form
            onSubmit={handleAddPillar}
            className="pt-2 border-t border-[#E9E7E2] dark:border-[#323230] space-y-2"
          >
            <span className="text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1]">
              Add custom pillar
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Pillar name"
                value={newPillarName}
                onChange={(e) => setNewPillarName(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
              <input
                type="text"
                placeholder="Description"
                value={newPillarDesc}
                onChange={(e) => setNewPillarDesc(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C] sm:col-span-2"
              />
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newPillarColor}
                  onChange={(e) => setNewPillarColor(e.target.value)}
                  className="w-8 h-7 p-0.5 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] cursor-pointer bg-transparent"
                />
                <button
                  type="submit"
                  className="flex-1 h-7 text-xs font-normal text-[#F3F1EC] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] rounded-[4px] transition-colors focus-ring"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 4. Recurring Series */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
                Recurring series
              </h2>
              <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]">
                Automatically schedule weekly recurring franchises
              </p>
            </div>

            <button
              type="button"
              onClick={handleTriggerRecurringGeneration}
              className="h-7 px-3 text-xs font-normal text-[#F3F1EC] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] rounded-[4px] transition-colors flex items-center gap-1.5 focus-ring"
            >
              <Repeat className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Generate 4 weeks</span>
            </button>
          </div>

          {recurringGeneratedMessage && (
            <div className="p-2.5 rounded-[4px] bg-[#2C6E56]/10 border border-[#2C6E56]/20 text-xs font-normal text-[#2C6E56] dark:text-[#5AA88C]">
              {recurringGeneratedMessage}
            </div>
          )}

          <div className="space-y-1.5 pt-1">
            {settings.recurringSchedules.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between px-3 py-2 rounded-[4px] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={rec.isActive}
                    onChange={() => handleToggleRecurring(rec.id)}
                    className="rounded-[3px] accent-[#2C6E56]"
                  />
                  <div>
                    <span className="font-normal text-[#2A2925] dark:text-[#D9D7D1] block">
                      {rec.title}
                    </span>
                    <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F]">
                      Every {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][rec.daysOfWeek[0]]} at{' '}
                      {rec.time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteRecurring(rec.id)}
                  className="p-1 text-[#6F6C66] dark:text-[#9A978F] hover:text-[#9E3A34] dark:hover:text-[#C45B53] rounded-[3px] transition-colors focus-ring"
                  title="Delete series"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Recurring Schedule Form */}
          <form
            onSubmit={handleAddRecurring}
            className="pt-2 border-t border-[#E9E7E2] dark:border-[#323230] space-y-2"
          >
            <span className="text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1]">
              Add recurring series
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Series title (e.g. Weekly Wins)"
                value={newRecurringTitle}
                onChange={(e) => setNewRecurringTitle(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
              <select
                value={newRecurringDay}
                onChange={(e) => setNewRecurringDay(Number(e.target.value))}
                className="px-2.5 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              >
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => (
                  <option key={day} value={i}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={newRecurringTime}
                onChange={(e) => setNewRecurringTime(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
              <button
                type="submit"
                className="h-7 text-xs font-normal text-[#F3F1EC] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] rounded-[4px] transition-colors focus-ring"
              >
                Add series
              </button>
            </div>
          </form>
        </div>

        {/* 5. Data Management, Export & Backup */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <h2 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
              Data persistence & backups
            </h2>
            <p className="text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]">
              Data is persisted locally in real-time. Back up or export anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* JSON Export */}
            <button
              onClick={exportJsonBackup}
              className="p-3 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors text-left flex flex-col justify-between focus-ring"
            >
              <div>
                <Download className="w-4 h-4 text-[#6F6C66] dark:text-[#9A978F] mb-2 stroke-[1.5]" />
                <span className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] block">
                  Export JSON backup
                </span>
                <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F]">
                  Full snapshot ({posts.length} posts, {ideas.length} ideas)
                </span>
              </div>
            </button>

            {/* CSV Export */}
            <button
              onClick={exportCsvCalendar}
              className="p-3 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors text-left flex flex-col justify-between focus-ring"
            >
              <div>
                <FileSpreadsheet className="w-4 h-4 text-[#6F6C66] dark:text-[#9A978F] mb-2 stroke-[1.5]" />
                <span className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] block">
                  Export CSV spreadsheet
                </span>
                <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F]">
                  Open in Excel, Sheets, or Notion
                </span>
              </div>
            </button>

            {/* JSON Import */}
            <label className="p-3 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors text-left flex flex-col justify-between cursor-pointer focus-ring">
              <div>
                <Upload className="w-4 h-4 text-[#6F6C66] dark:text-[#9A978F] mb-2 stroke-[1.5]" />
                <span className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] block">
                  Restore from JSON
                </span>
                <span className="text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F]">
                  Upload a previously saved backup
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset & Clear */}
          <div className="pt-3 border-t border-[#E9E7E2] dark:border-[#323230] flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={restoreSampleData}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[4px] text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Reset sample data</span>
            </button>

            <button
              onClick={clearSampleData}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[4px] text-xs font-normal text-[#9E3A34] dark:text-[#C45B53] hover:bg-[#9E3A34]/10 border border-[#9E3A34]/20 transition-colors focus-ring"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Clear all data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
