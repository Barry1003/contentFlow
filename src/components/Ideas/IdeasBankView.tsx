import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Calendar,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../Common/PlatformBadge';

export const IdeasBankView: React.FC = () => {
  const {
    ideas,
    addIdea,
    deleteIdea,
    convertIdeaToPost,
    settings,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // New Idea Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newPillarId, setNewPillarId] = useState(settings.pillars[0]?.id || 'tutorials');
  const [newPlatforms, setNewPlatforms] = useState<string[]>(['instagram']);
  const [newTags, setNewTags] = useState('');

  // Collect all unique tags
  const allTags = Array.from(
    new Set(ideas.flatMap((idea) => idea.tags || []))
  ).filter(Boolean);

  // Filter ideas
  const filteredIdeas = ideas.filter((idea) => {
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = idea.title.toLowerCase().includes(q);
      const matchNotes = (idea.notes || '').toLowerCase().includes(q);
      const matchTags = (idea.tags || []).some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchNotes && !matchTags) return false;
    }
    if (selectedPillar !== 'all' && idea.pillarId !== selectedPillar) {
      return false;
    }
    if (selectedTag !== 'all' && !idea.tags?.includes(selectedTag)) {
      return false;
    }
    return true;
  });

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedTags = newTags
      .split(/\s+/)
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    addIdea({
      title: newTitle.trim(),
      hook: '',
      suggestedFormat: 'Reel/Short',
      notes: newNotes.trim(),
      pillarId: newPillarId,
      platforms: newPlatforms,
      tags: parsedTags,
    });

    setNewTitle('');
    setNewNotes('');
    setNewTags('');
    setIsAdding(false);
  };

  const toggleNewPlatform = (pId: string) => {
    if (newPlatforms.includes(pId)) {
      if (newPlatforms.length > 1) {
        setNewPlatforms(newPlatforms.filter((p) => p !== pId));
      }
    } else {
      setNewPlatforms([...newPlatforms, pId]);
    }
  };

  return (
    <div id="ideas-bank-container" className="flex-1 flex flex-col h-full overflow-hidden bg-[#F7F6F3] dark:bg-[#1C1C1A]">
      {/* Header Bar */}
      <div className="bg-[#FFFFFF] dark:bg-[#232321] border-b border-[#E9E7E2] dark:border-[#323230] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-medium text-xs text-[#2A2925] dark:text-[#D9D7D1]">
            Ideas bank
          </h2>
          <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
            Unscheduled concepts, hooks, and drafts
          </p>
        </div>

        <div className="flex items-center gap-2">          {/* Add Idea Button */}
          <button
            id="ideas-add-new-btn"
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-normal text-[#F3F1EC] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] rounded-[4px] transition-colors focus-ring"
          >
            <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>New idea</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#FFFFFF] dark:bg-[#232321] border-b border-[#E9E7E2] dark:border-[#323230] px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6F6C66] dark:text-[#9A978F] stroke-[1.5]" />
          <input
            type="text"
            placeholder="Search ideas, hooks, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
          />
        </div>

        {/* Pillar filter pills */}
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => setSelectedPillar('all')}
            className={`px-2 py-0.5 rounded-[4px] text-xs transition-colors font-normal focus-ring ${
              selectedPillar === 'all'
                ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1]'
                : 'bg-[#FFFFFF] dark:bg-[#232321] text-[#6F6C66] dark:text-[#9A978F] border border-[#E9E7E2] dark:border-[#323230] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'
            }`}
          >
            All ({ideas.length})
          </button>
          {settings.pillars.map((pil) => {
            const count = ideas.filter((i) => i.pillarId === pil.id).length;
            const isSelected = selectedPillar === pil.id;
            return (
              <button
                key={pil.id}
                onClick={() => setSelectedPillar(pil.id)}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-xs border transition-colors font-normal focus-ring ${
                  isSelected
                    ? 'border-[#2C6E56] dark:border-[#5AA88C] bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1]'
                    : 'bg-[#FFFFFF] dark:bg-[#232321] text-[#6F6C66] dark:text-[#9A978F] border-[#E9E7E2] dark:border-[#323230] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: pil.color }}
                />
                <span>{pil.name}</span>
                <span className="text-[10px] opacity-70 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Ideas Workspace */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full">
        {/* Quick Add Form Drawer */}
        {isAdding && (
          <form
            onSubmit={handleCreateIdea}
            className="mb-4 p-4 bg-[#FFFFFF] dark:bg-[#232321] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1]">
                New concept
              </h3>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-xs text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]"
              >
                Cancel
              </button>
            </div>

            <div>
              <input
                type="text"
                placeholder="Idea title or working hook..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                className="w-full px-2.5 py-1.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Outline, talking points, inspiration..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full p-2.5 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                  Content pillar
                </label>
                <select
                  value={newPillarId}
                  onChange={(e) => setNewPillarId(e.target.value)}
                  className="w-full px-2 py-1 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1]"
                >
                  {settings.pillars.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-1">
                  {settings.platforms.map((plat) => {
                    const isSelected = newPlatforms.includes(plat.id);
                    return (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => toggleNewPlatform(plat.id)}
                        className={`px-1.5 py-0.5 rounded-[3px] text-[10px] border transition-colors font-normal focus-ring ${
                          isSelected
                            ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] border-[#2C6E56] dark:border-[#5AA88C]'
                            : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#6F6C66] dark:text-[#9A978F] border-[#E9E7E2] dark:border-[#323230]'
                        }`}
                      >
                        {plat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="review tutorial"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-2 py-1 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-1.5 pt-1">
              <button
                type="submit"
                className="h-7 px-3 text-xs font-normal text-[#F3F1EC] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] rounded-[4px] transition-colors focus-ring"
              >
                Save idea
              </button>
            </div>
          </form>
        )}

        {/* Ideas Grid */}
        {filteredIdeas.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] mb-2 font-normal">
              No ideas logged yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredIdeas.map((idea) => {
              const pillar = settings.pillars.find((p) => p.id === idea.pillarId);

              return (
                <div
                  key={idea.id}
                  id={`idea-card-${idea.id}`}
                  className="bg-[#FFFFFF] dark:bg-[#232321] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] p-3.5 flex flex-col justify-between hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors group focus-ring"
                >
                  <div>
                    {/* Top: Platforms and Pillar badge */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1 overflow-hidden">
                        {idea.platforms?.map((pId) => (
                          <PlatformBadge
                            key={pId}
                            platformId={pId}
                            size="sm"
                            showName={false}
                          />
                        ))}
                      </div>

                      {pillar && (
                        <span className="text-[10px] text-[#6F6C66] dark:text-[#9A978F] font-normal flex items-center gap-1">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: pillar.color }}
                          />
                          <span>{pillar.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Idea Title */}
                    <h4 className="font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] mb-1 leading-snug">
                      {idea.title}
                    </h4>

                    {/* Notes / Description */}
                    {idea.notes && (
                      <p className="text-xs text-[#6F6C66] dark:text-[#9A978F] mb-2 line-clamp-3 font-normal">
                        {idea.notes}
                      </p>
                    )}

                    {/* Tags */}
                    {idea.tags && idea.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {idea.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-[#6F6C66] dark:text-[#9A978F] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] px-1 py-0.2 rounded-[2px] font-normal"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions: One-click "Schedule this" & Delete */}
                  <div className="pt-2.5 border-t border-[#E9E7E2] dark:border-[#323230] flex items-center justify-between gap-2">
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="text-[#6F6C66] dark:text-[#9A978F] hover:text-[#B42318] dark:hover:text-[#C54A44] p-1 rounded-[3px] transition-colors focus-ring"
                      title="Delete idea"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                    </button>

                    <button
                      id={`schedule-idea-btn-${idea.id}`}
                      onClick={() => convertIdeaToPost(idea.id)}
                      className="inline-flex items-center gap-1 text-xs font-normal text-[#2C6E56] dark:text-[#5AA88C] hover:underline focus-ring"
                    >
                      <Calendar className="w-3 h-3 stroke-[1.5]" />
                      <span>Schedule</span>
                      <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                    </button>
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
