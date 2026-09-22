import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Video,
  ListOrdered,
  Camera,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { ScriptContentData, ScriptSceneRow, ShotListItem } from '../../types';

interface VideoScriptEditorProps {
  script: Partial<ScriptContentData>;
  onChange: (updates: Partial<ScriptContentData>) => void;
  onOpenAi: (mode?: string) => void;
}

export const VideoScriptEditor: React.FC<VideoScriptEditorProps> = ({
  script,
  onChange,
  onOpenAi,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sections' | 'table' | 'shotlist'>('sections');

  // Helper getters
  const hookText = script.hookText || '';
  const bodyText = script.bodyText || '';
  const ctaText = script.callToActionText || '';
  const outroText = script.outroText || '';
  const sceneRows: ScriptSceneRow[] = script.sceneRows || [
    { id: 'sc-1', visual: 'Close up talking head into camera with eye contact', audio: hookText || 'Opening hook line...' },
    { id: 'sc-2', visual: 'Screen recording / B-roll demonstration', audio: 'Explaining key point 1...' },
    { id: 'sc-3', visual: 'Macro detail angle / text on screen', audio: 'Step 2 breakdown...' },
    { id: 'sc-4', visual: 'Return to smiling creator talking head', audio: ctaText || 'Call to action signoff...' },
  ];

  const shotList: ShotListItem[] = script.shotList || [
    { id: 'sh-1', item: 'Talking head desk setup with natural window light', category: 'location', completed: false },
    { id: 'sh-2', item: 'Overhead camera angle / tripod ready', category: 'scene', completed: false },
    { id: 'sh-3', item: 'Clean neutral knit creator outfit', category: 'outfit', completed: false },
  ];

  // Handlers for sections
  const updateHook = (val: string) => onChange({ hookText: val });
  const updateBody = (val: string) => onChange({ bodyText: val });
  const updateCta = (val: string) => onChange({ callToActionText: val });
  const updateOutro = (val: string) => onChange({ outroText: val });

  // Handlers for 2-column table
  const updateSceneRow = (id: string, field: 'visual' | 'audio', val: string) => {
    const updated = sceneRows.map((row) =>
      row.id === id ? { ...row, [field]: val } : row
    );
    onChange({ sceneRows: updated });
  };

  const addSceneRow = () => {
    const newRow: ScriptSceneRow = {
      id: `sc-${Date.now()}`,
      visual: '',
      audio: '',
    };
    onChange({ sceneRows: [...sceneRows, newRow] });
  };

  const removeSceneRow = (id: string) => {
    if (sceneRows.length <= 1) return;
    onChange({ sceneRows: sceneRows.filter((r) => r.id !== id) });
  };

  // Handlers for shot list
  const toggleShotItem = (id: string) => {
    const updated = shotList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onChange({ shotList: updated });
  };

  const addShotItem = (category: 'scene' | 'location' | 'prop' | 'outfit' = 'scene') => {
    const newItem: ShotListItem = {
      id: `shot-${Date.now()}`,
      item: '',
      category,
      completed: false,
    };
    onChange({ shotList: [...shotList, newItem] });
  };

  const updateShotItemText = (id: string, text: string) => {
    const updated = shotList.map((item) =>
      item.id === id ? { ...item, item: text } : item
    );
    onChange({ shotList: updated });
  };

  const removeShotItem = (id: string) => {
    onChange({ shotList: shotList.filter((s) => s.id !== id) });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FBFBFA] dark:bg-[#141413]">
      {/* Sub Mode Switcher Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] shrink-0">
        <div className="flex items-center border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] p-0.5 h-7 bg-[#FBFBFA] dark:bg-[#141413]">
          <button
            type="button"
            onClick={() => setActiveSubTab('sections')}
            className={`px-2.5 h-full rounded-[4px] text-xs transition-colors ${
              activeSubTab === 'sections'
                ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]'
            }`}
          >
            Sections
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('table')}
            className={`px-2.5 h-full rounded-[4px] text-xs transition-colors ${
              activeSubTab === 'table'
                ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]'
            }`}
          >
            Visual + Audio Table
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('shotlist')}
            className={`px-2.5 h-full rounded-[4px] text-xs transition-colors ${
              activeSubTab === 'shotlist'
                ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]'
            }`}
          >
            Shot list ({shotList.filter((s) => s.completed).length}/{shotList.length})
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenAi('hooks')}
          className="text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Hook suggestions</span>
        </button>
      </div>

      {/* Main Video Editor Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 max-w-3xl mx-auto w-full">
        {/* SUBTAB 1: SCRIPT SECTIONS */}
        {activeSubTab === 'sections' && (
          <div className="space-y-4">
            {/* 1. Hook Section */}
            <div className="rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                  Hook (First 3 Seconds)
                </label>
                <button
                  type="button"
                  onClick={() => onOpenAi('hooks')}
                  className="text-xs text-[#6F6C66] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]"
                >
                  Generate options
                </button>
              </div>
              <textarea
                rows={2}
                value={hookText}
                onChange={(e) => updateHook(e.target.value)}
                placeholder="What is the scroll-stopping spoken line in the first 3 seconds?..."
                className="w-full text-sm p-2.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed resize-none"
              />
            </div>

            {/* 2. Body Section */}
            <div className="rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                  Body / Script
                </label>
                <button
                  type="button"
                  onClick={() => onOpenAi('refine')}
                  className="text-xs text-[#6F6C66] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]"
                >
                  Refine
                </button>
              </div>
              <textarea
                rows={9}
                value={bodyText}
                onChange={(e) => updateBody(e.target.value)}
                placeholder="Write the full voiceover script, main points, or story breakdown here..."
                className="w-full text-sm p-3 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed resize-y font-sans"
              />
            </div>

            {/* 3. Call to Action */}
            <div className="rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] p-4 space-y-2">
              <label className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                Call to Action (CTA)
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => updateCta(e.target.value)}
                placeholder="e.g. Save this post before your next video shoot..."
                className="w-full text-sm px-3 py-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF]"
              />
            </div>

            {/* 4. Outro Signoff */}
            <div className="rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] p-4 space-y-2">
              <label className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                Outro / Sign-off
              </label>
              <input
                type="text"
                value={outroText}
                onChange={(e) => updateOutro(e.target.value)}
                placeholder="e.g. Follow for daily creator systems..."
                className="w-full text-sm px-3 py-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF]"
              />
            </div>
          </div>
        )}

        {/* SUBTAB 2: SCRIPT TABLE (VISUAL + AUDIO) */}
        {activeSubTab === 'table' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="text-sm font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                  Scene Director Table
                </h3>
                <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                  Pair visual cues with spoken audio
                </p>
              </div>
              <button
                type="button"
                onClick={addSceneRow}
                className="h-7 px-2.5 rounded-[4px] bg-[#1F5C47] text-white text-xs font-medium hover:bg-[#174A39] flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 stroke-[1.5]" />
                <span>Add row</span>
              </button>
            </div>

            <div className="border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] overflow-hidden bg-[#FFFFFF] dark:bg-[#1C1C1A]">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-[#FBFBFA] dark:bg-[#141413] border-b border-[#E6E4DF] dark:border-[#2A2A27] text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] py-2 px-3">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Visual / Camera / B-roll</div>
                <div className="col-span-5">Audio / Voiceover</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#E6E4DF] dark:divide-[#2A2A27]">
                {sceneRows.map((row, idx) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-12 gap-2 p-2.5 items-start hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
                  >
                    <div className="col-span-1 text-center text-xs text-[#6F6C66] dark:text-[#9E9B93] pt-2">
                      {idx + 1}
                    </div>
                    <div className="col-span-5">
                      <textarea
                        rows={2}
                        value={row.visual}
                        onChange={(e) => updateSceneRow(row.id, 'visual', e.target.value)}
                        placeholder="Angle, B-roll, on-screen text..."
                        className="w-full text-xs p-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] resize-none"
                      />
                    </div>
                    <div className="col-span-5">
                      <textarea
                        rows={2}
                        value={row.audio}
                        onChange={(e) => updateSceneRow(row.id, 'audio', e.target.value)}
                        placeholder="What you say..."
                        className="w-full text-xs p-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] resize-none"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => removeSceneRow(row.id)}
                        className="text-[#6F6C66] hover:text-[#B42318] p-1 rounded transition-colors"
                        title="Delete Scene"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: FILMING SHOT LIST */}
        {activeSubTab === 'shotlist' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="text-sm font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                  Filming Shot List
                </h3>
                <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                  Check off items as you record
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {(['scene', 'location', 'prop', 'outfit'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => addShotItem(cat)}
                    className="h-7 px-2 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] text-xs text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] capitalize flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3 stroke-[1.5]" />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              {shotList.map((item) => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] flex items-center gap-3 transition-colors ${
                    item.completed
                      ? 'bg-[#FBFBFA] dark:bg-[#141413] opacity-60'
                      : 'bg-[#FFFFFF] dark:bg-[#1C1C1A]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleShotItem(item.id)}
                    className="text-[#1F5C47] shrink-0"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Circle className="w-4 h-4 stroke-[1.5] text-[#6F6C66]" />
                    )}
                  </button>

                  <span className="text-[11px] uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] bg-[#F3F2EF] dark:bg-[#242421] text-[#6F6C66] dark:text-[#9E9B93]">
                    {item.category}
                  </span>

                  <input
                    type="text"
                    value={item.item}
                    onChange={(e) => updateShotItemText(item.id, e.target.value)}
                    placeholder="Describe scene, prop, or shot..."
                    className={`flex-1 text-xs bg-transparent focus:outline-none ${
                      item.completed
                        ? 'line-through text-[#6F6C66]'
                        : 'text-[#1C1B19] dark:text-[#F3F2EF]'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => removeShotItem(item.id)}
                    className="text-[#6F6C66] hover:text-[#B42318] p-1 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
