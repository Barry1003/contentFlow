import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Loader2,
  Check,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostFormat } from '../../types';

export const AiIdeaGeneratorModal: React.FC = () => {
  const {
    isAiIdeaModalOpen,
    setIsAiIdeaModalOpen,
    settings,
    addIdea,
  } = useApp();

  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<
    {
      title: string;
      hook: string;
      pillar: string;
      platforms: string[];
      format: string;
      reasoning: string;
    }[]
  >([]);
  const [savedIndexes, setSavedIndexes] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAiIdeaModalOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSavedIndexes([]);

    try {
      const res = await fetch('/api/gemini/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: settings.niche,
          creatorName: settings.creatorName,
          topic: topic.trim(),
          platforms: settings.platforms.map((p) => p.id),
          pillars: settings.pillars.map((p) => p.name),
        }),
      });

      const data = await res.json();
      if (data.ideas && Array.isArray(data.ideas) && data.ideas.length > 0) {
        setGeneratedIdeas(data.ideas);
      } else {
        setGeneratedIdeas([
          {
            title: `3 Things I Stopped Doing in My ${settings.niche.split('&')[0]} Routine`,
            hook: "I used to do this step until I learned how counterproductive it was.",
            pillar: settings.pillars[0]?.name || 'Educational',
            platforms: ['instagram', 'tiktok'],
            format: 'Reel/Short',
            reasoning: 'Reverse educational framing stops habitual scrolling.',
          },
          {
            title: `Essential Toolkit vs. Overrated Alternatives`,
            hook: "Does price dictate performance? Here is a direct side-by-side test.",
            pillar: settings.pillars[1]?.name || 'Product Reviews',
            platforms: ['tiktok', 'youtube'],
            format: 'Reel/Short',
            reasoning: 'Comparison format drives bookmarks and shares.',
          },
          {
            title: `My End-of-Week Reset Checklist`,
            hook: "The non-negotiable workflow I follow every Friday afternoon.",
            pillar: settings.pillars[2]?.name || 'Behind the Scenes',
            platforms: ['youtube', 'instagram'],
            format: 'Carousel',
            reasoning: 'Structured productivity routines drive high retention.',
          },
          {
            title: `The 60-Second Workflow Tweak That Saved Hours`,
            hook: "A subtle adjustment that changed my entire production process.",
            pillar: settings.pillars[0]?.name || 'Tutorials',
            platforms: ['tiktok', 'instagram'],
            format: 'Reel/Short',
            reasoning: 'Concise, high-utility framing creates curiosity.',
          },
          {
            title: `Lessons Learned from My Earliest Work`,
            hook: "A look back at what worked, what failed, and what to avoid.",
            pillar: settings.pillars[2]?.name || 'Behind the Scenes',
            platforms: ['youtube', 'tiktok'],
            format: 'Long video',
            reasoning: 'Reflective personal experience builds audience trust.',
          },
        ]);
        if (data.error) {
          setErrorMessage('Using curated concepts (configure Gemini API key for dynamic AI).');
        }
      }
    } catch (err: any) {
      console.error('AI ideas error:', err);
      setGeneratedIdeas([
        {
          title: `Stop Making This Major Mistake in ${settings.niche.split('&')[0]}`,
          hook: "Most people approach this backward. Here is the structured formula.",
          pillar: settings.pillars[0]?.name || 'Tutorials',
          platforms: ['instagram', 'tiktok'],
          format: 'Reel/Short',
          reasoning: 'Contrarian hook creates instant retention.',
        },
        {
          title: `Current Core Essentials: Honest Breakdown`,
          hook: "The only tools that remain on my daily recommendation list.",
          pillar: settings.pillars[1]?.name || 'Product Reviews',
          platforms: ['instagram', 'youtube'],
          format: 'Carousel',
          reasoning: 'High bookmark rate for reference.',
        },
      ]);
      setErrorMessage('Using offline concept templates.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToIdeasBank = (idea: any, index: number) => {
    const matchingPillar =
      settings.pillars.find(
        (p) => p.name.toLowerCase() === (idea.pillar || '').toLowerCase()
      ) || settings.pillars[0];

    addIdea({
      title: idea.title,
      hook: idea.hook || '',
      suggestedFormat: (idea.format as PostFormat) || 'Reel/Short',
      notes: `${idea.reasoning || ''}`,
      pillarId: matchingPillar?.id || 'tutorials',
      platforms: idea.platforms?.length ? idea.platforms : ['instagram'],
      tags: ['ai-concept'],
    });

    setSavedIndexes((prev) => [...prev, index]);
  };

  const handleSaveAll = () => {
    generatedIdeas.forEach((idea, idx) => {
      if (!savedIndexes.includes(idx)) {
        handleSaveToIdeasBank(idea, idx);
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={() => setIsAiIdeaModalOpen(false)}
    >
      <div
        className="bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[8px] w-full max-w-xl max-h-[88vh] flex flex-col shadow-xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-medium text-sm text-[#1C1B19] dark:text-[#F3F2EF]">
              Idea generator
            </h3>
            <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
              Generate concepts tailored to {settings.niche}
            </p>
          </div>
          <button
            onClick={() => setIsAiIdeaModalOpen(false)}
            className="p-1 text-[#6F6C66] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] rounded-[4px]"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] space-y-2 shrink-0">
          <label className="block text-[10px] font-medium uppercase tracking-wider text-[#6F6C66] dark:text-[#9E9B93]">
            Custom topic or focus (optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Budget alternatives, Weekly reset, 5-minute workflows"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 px-2.5 py-1 text-xs bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] placeholder-[#6F6C66] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="h-7 px-3 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin stroke-[1.5]" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 stroke-[1.5]" />
                  <span>Generate ideas</span>
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-[#B54708]">{errorMessage}</p>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {generatedIdeas.length === 0 && !isLoading && (
            <div className="py-10 text-center">
              <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93] mb-3">
                No ideas generated yet. Enter a topic above or generate directly.
              </p>
              <button
                onClick={handleGenerate}
                className="h-7 px-3 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] transition-colors"
              >
                Generate ideas
              </button>
            </div>
          )}

          {generatedIdeas.map((idea, idx) => {
            const isSaved = savedIndexes.includes(idx);

            return (
              <div
                key={idx}
                className="p-3 rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93] font-medium">
                        {idea.pillar}
                      </span>
                      <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93]">
                        • {idea.format}
                      </span>
                    </div>
                    <h4 className="font-medium text-xs text-[#1C1B19] dark:text-[#F3F2EF]">
                      {idea.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleSaveToIdeasBank(idea, idx)}
                    disabled={isSaved}
                    className={`inline-flex items-center gap-1 text-xs px-2 h-6 rounded-[4px] border transition-colors shrink-0 ${
                      isSaved
                        ? 'border-transparent text-[#1F5C47] bg-[#1F5C47]/10'
                        : 'border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421]'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3 h-3 stroke-[2]" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 stroke-[1.5]" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Hook */}
                {idea.hook && (
                  <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93] italic">
                    Hook: "{idea.hook}"
                  </p>
                )}

                {/* Strategy */}
                {idea.reasoning && (
                  <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                    Strategy: {idea.reasoning}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {generatedIdeas.length > 0 && (
          <div className="px-4 py-2.5 border-t border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] flex items-center justify-between shrink-0">
            <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
              {savedIndexes.length} of {generatedIdeas.length} saved
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSaveAll}
                className="h-7 px-2.5 text-xs text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#E6E4DF] dark:hover:bg-[#2A2A27] rounded-[4px] transition-colors"
              >
                Save all
              </button>
              <button
                onClick={() => setIsAiIdeaModalOpen(false)}
                className="h-7 px-3 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
