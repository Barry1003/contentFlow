import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Check,
  RotateCcw,
  Sliders,
  Scissors,
  Coffee,
  Briefcase,
  Maximize2,
  CheckCheck,
  Copy,
  Layers,
  FileText,
} from 'lucide-react';
import { PostItem, ScriptContentData, CarouselSlide } from '../../types';

interface AiWritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostItem;
  currentScript: Partial<ScriptContentData>;
  onAcceptDraft: (draft: Partial<ScriptContentData>) => void;
  onAcceptHook: (hook: string) => void;
  onAcceptCaption: (caption: string, hashtags: string[]) => void;
  onAcceptCarousel: (slides: CarouselSlide[]) => void;
  selectedText?: string;
  onAcceptRefinedText: (refinedText: string) => void;
}

type AiMode = 'draft' | 'hooks' | 'refine' | 'script_to_caption' | 'script_to_carousel';

export const AiWritingModal: React.FC<AiWritingModalProps> = ({
  isOpen,
  onClose,
  post,
  currentScript,
  onAcceptDraft,
  onAcceptHook,
  onAcceptCaption,
  onAcceptCarousel,
  selectedText = '',
  onAcceptRefinedText,
}) => {
  const [activeMode, setActiveMode] = useState<AiMode>(
    selectedText.trim() ? 'refine' : 'draft'
  );
  const [isLoading, setIsLoading] = useState(false);

  // Draft generation state
  const [targetLength, setTargetLength] = useState<number>(currentScript.targetSeconds || 60);
  const [customToneNotes, setCustomToneNotes] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState<Partial<ScriptContentData> | null>(null);

  // Hook options state
  const [hookOptions, setHookOptions] = useState<
    { hook: string; type: string; trigger: string }[]
  >([]);

  // Refine text state
  const [refineInputText, setRefineInputText] = useState(selectedText || currentScript.bodyText || '');
  const [refineAction, setRefineAction] = useState<string>('punchier');
  const [refinedResult, setRefinedResult] = useState<{ text: string; note?: string } | null>(null);

  // Script to Caption state
  const [generatedCaption, setGeneratedCaption] = useState<{
    caption: string;
    hashtags: string[];
    callToAction: string;
  } | null>(null);

  // Script to Carousel state
  const [carouselSlideCount, setCarouselSlideCount] = useState<number>(6);
  const [generatedSlides, setGeneratedSlides] = useState<CarouselSlide[] | null>(null);

  if (!isOpen) return null;

  // 1. Generate Full Draft
  const handleGenerateDraft = async () => {
    setIsLoading(true);
    setGeneratedDraft(null);

    try {
      const res = await fetch('/api/gemini/write-script-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          pillar: post.pillarId,
          format: post.format,
          targetSeconds: targetLength,
          niche: 'Modern Creator',
          notes: customToneNotes || post.notes,
        }),
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setGeneratedDraft({
        hookText: data.hookText,
        bodyText: data.bodyText,
        callToActionText: data.callToActionText,
        outroText: data.outroText,
        targetSeconds: targetLength,
      });
    } catch {
      // Clean fallback draft
      setGeneratedDraft({
        hookText: `Here is the one simple shift behind ${post.title.toLowerCase()}.`,
        bodyText: `Most creators overcomplicate the process by trying to do everything simultaneously.\n\nInstead, focus on one single constraint: define the single key takeaway before recording a single frame.\n\nWhen clarity leads, production speed triples.`,
        callToActionText: `Save this post and apply it to your next draft.`,
        outroText: `See you in tomorrow's breakdown.`,
        targetSeconds: targetLength,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Generate 5 Hook Options
  const handleGenerateHooks = async () => {
    setIsLoading(true);
    setHookOptions([]);

    try {
      const res = await fetch('/api/gemini/generate-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          format: post.format,
          bodySummary: currentScript.bodyText || post.notes || post.title,
        }),
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      if (Array.isArray(data.hooks)) {
        setHookOptions(data.hooks);
      }
    } catch {
      setHookOptions([
        {
          type: 'Curiosity Gap',
          hook: `The reason most people fail at ${post.title.toLowerCase()} is not what you think.`,
          trigger: 'Creates an unresolved knowledge gap in seconds.',
        },
        {
          type: 'Contrarian Truth',
          hook: `Stop doing this immediately if you want real results with ${post.title.toLowerCase()}.`,
          trigger: 'Challenges conventional assumptions directly.',
        },
        {
          type: 'Quantifiable Proof',
          hook: `This single adjustment saved me 12 hours every week on content production.`,
          trigger: 'Concrete metrics validate authority instantly.',
        },
        {
          type: 'Direct Problem Callout',
          hook: `If you have been feeling completely stuck on your workflow, watch this.`,
          trigger: 'Filters for exact viewer pain points.',
        },
        {
          type: 'Actionable Framework',
          hook: `The exact 3-step checklist to master ${post.title.toLowerCase()} starting today.`,
          trigger: 'Promises clear, structured utility.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Refine & Polish Selected Text
  const handleRefineText = async (actionKey: string) => {
    if (!refineInputText.trim()) return;
    setIsLoading(true);
    setRefineAction(actionKey);
    setRefinedResult(null);

    try {
      const res = await fetch('/api/gemini/refine-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: refineInputText,
          instruction: actionKey,
        }),
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setRefinedResult({
        text: data.refinedText,
        note: data.notes,
      });
    } catch {
      let processed = refineInputText.trim();
      if (actionKey === 'shorter') {
        processed = processed.split('. ').slice(0, 2).join('. ') + '.';
      } else if (actionKey === 'punchier') {
        processed = processed.replace(/\bvery\b|\breally\b|\bactually\b/gi, '').trim();
      } else if (actionKey === 'casual') {
        processed = `Here is the quick breakdown: ${processed}`;
      }
      setRefinedResult({
        text: processed,
        note: 'Offline adjustment applied.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Script to Caption
  const handleScriptToCaption = async () => {
    const fullScript = [
      currentScript.hookText ? `Hook: ${currentScript.hookText}` : '',
      currentScript.bodyText ? `Body: ${currentScript.bodyText}` : '',
      currentScript.callToActionText ? `CTA: ${currentScript.callToActionText}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    setIsLoading(true);
    setGeneratedCaption(null);

    try {
      const res = await fetch('/api/gemini/script-to-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          scriptText: fullScript || post.title,
          platforms: post.platforms,
          tone: 'clean, direct, clear',
        }),
      });

      if (!res.ok) throw new Error('Failed to convert script to caption');
      const data = await res.json();
      setGeneratedCaption({
        caption: data.caption,
        hashtags: data.hashtags || post.hashtags,
        callToAction: data.callToAction || 'Share your thoughts in the comments.',
      });
    } catch {
      setGeneratedCaption({
        caption: `${post.title}\n\nThe full breakdown is here: focus on clarity over noise every single time.\n\nSave this for your next workflow review.`,
        hashtags: ['#creatorlife', '#productivity', '#systems', '#clarity'],
        callToAction: 'Save this post for reference.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Script to Carousel
  const handleScriptToCarousel = async () => {
    const fullScript = [
      currentScript.hookText,
      currentScript.bodyText,
      currentScript.callToActionText,
    ]
      .filter(Boolean)
      .join('\n\n');

    setIsLoading(true);
    setGeneratedSlides(null);

    try {
      const res = await fetch('/api/gemini/script-to-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          scriptText: fullScript || post.title,
          slideCount: carouselSlideCount,
        }),
      });

      if (!res.ok) throw new Error('Failed to convert to carousel');
      const data = await res.json();
      if (Array.isArray(data.slides)) {
        setGeneratedSlides(
          data.slides.map((s: any, idx: number) => ({
            id: `slide-gen-${Date.now()}-${idx}`,
            slideNumber: s.slideNumber || idx + 1,
            heading: s.heading,
            body: s.body,
            visualNote: s.visualNote,
          }))
        );
      }
    } catch {
      setGeneratedSlides([
        {
          id: 'slide-1',
          slideNumber: 1,
          heading: post.title,
          body: 'The complete framework broken down into 4 clear principles.',
          visualNote: 'Cover typography with clean neutral background',
        },
        {
          id: 'slide-2',
          slideNumber: 2,
          heading: '01. Remove Low-Impact Noise',
          body: 'Eliminate tasks that do not directly move the needle.',
          visualNote: 'Side-by-side comparison graphics',
        },
        {
          id: 'slide-3',
          slideNumber: 3,
          heading: '02. Protect Focus Blocks',
          body: 'Schedule 60 uninterrupted minutes each morning before checking inbox.',
          visualNote: 'Timeline block indicator',
        },
        {
          id: 'slide-4',
          slideNumber: 4,
          heading: 'Save This Framework',
          body: 'Bookmark this guide for your next planning session.',
          visualNote: 'Bookmark prompt',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141413]/50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] dark:bg-[#1C1C1A] w-full max-w-3xl rounded-[8px] border border-[#E6E4DF] dark:border-[#2A2A27] flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in duration-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 stroke-[1.5] text-[#6F6C66] dark:text-[#9E9B93]" />
            <h2 className="text-sm font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
              AI Writing Assistant
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] rounded hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] overflow-x-auto">
          {[
            { id: 'draft' as AiMode, label: 'First Draft', icon: FileText },
            { id: 'hooks' as AiMode, label: 'Hook Options', icon: Sparkles },
            { id: 'refine' as AiMode, label: 'Refine Text', icon: Sliders },
            { id: 'script_to_caption' as AiMode, label: 'Script → Caption', icon: Copy },
            { id: 'script_to_carousel' as AiMode, label: 'Script → Carousel', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveMode(tab.id)}
                className={`h-7 px-2.5 rounded-[4px] text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium border border-[#E6E4DF] dark:border-[#2A2A27]'
                    : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* MODE 1: WRITE FIRST DRAFT */}
          {activeMode === 'draft' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[6px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                    Post: "{post.title}"
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">Target length:</span>
                    <select
                      value={targetLength}
                      onChange={(e) => setTargetLength(Number(e.target.value))}
                      className="text-xs px-2 py-1 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF]"
                    >
                      <option value={30}>30s (~75 words)</option>
                      <option value={60}>60s (~150 words)</option>
                      <option value={90}>90s (~225 words)</option>
                      <option value={180}>3 mins (~450 words)</option>
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Optional direction notes (e.g. 'direct and concise')..."
                  value={customToneNotes}
                  onChange={(e) => setCustomToneNotes(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF]"
                />

                <button
                  type="button"
                  onClick={handleGenerateDraft}
                  disabled={isLoading}
                  className="h-8 px-3 rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>{isLoading ? 'Generating draft...' : 'Generate full draft'}</span>
                </button>
              </div>

              {/* Generated Draft Preview with Accept/Reject */}
              {generatedDraft && (
                <div className="border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] p-4 space-y-3 bg-[#FFFFFF] dark:bg-[#1C1C1A]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E6E4DF] dark:border-[#2A2A27]">
                    <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                      Generated Draft Preview
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGeneratedDraft(null)}
                        className="text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]"
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onAcceptDraft(generatedDraft);
                          onClose();
                        }}
                        className="h-7 px-2.5 rounded-[4px] bg-[#1F5C47] text-white text-xs font-medium hover:bg-[#174A39] flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[1.5]" />
                        <span>Accept draft</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93]">
                        Hook:
                      </span>
                      <p className="p-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] mt-0.5 text-[#1C1B19] dark:text-[#F3F2EF]">
                        {generatedDraft.hookText}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93]">
                        Body:
                      </span>
                      <p className="p-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] mt-0.5 text-[#1C1B19] dark:text-[#F3F2EF] whitespace-pre-line leading-relaxed">
                        {generatedDraft.bodyText}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93]">
                        Call to Action:
                      </span>
                      <p className="p-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] mt-0.5 text-[#1C1B19] dark:text-[#F3F2EF]">
                        {generatedDraft.callToActionText}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: HOOK OPTIONS */}
          {activeMode === 'hooks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                    Hook Angles
                  </h3>
                  <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                    Options designed to capture attention in the opening 3 seconds
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateHooks}
                  disabled={isLoading}
                  className="h-7 px-2.5 rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3 stroke-[1.5]" />
                  <span>{isLoading ? 'Generating...' : 'Generate 5 hooks'}</span>
                </button>
              </div>

              {hookOptions.length > 0 ? (
                <div className="space-y-2">
                  {hookOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-[#6F6C66] dark:text-[#9E9B93] bg-[#F3F2EF] dark:bg-[#242421] px-1.5 py-0.5 rounded-[3px]">
                          {opt.type}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onAcceptHook(opt.hook);
                            onClose();
                          }}
                          className="h-6 px-2 text-xs rounded-[3px] border border-[#E6E4DF] dark:border-[#2A2A27] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] text-[#1C1B19] dark:text-[#F3F2EF] flex items-center gap-1 transition-colors"
                        >
                          <Check className="w-3 h-3 stroke-[1.5]" />
                          <span>Use</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed">
                        "{opt.hook}"
                      </p>
                      <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                        {opt.trigger}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center rounded-[6px] border border-dashed border-[#E6E4DF] dark:border-[#2A2A27] text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                  Click "Generate 5 hooks" to produce opening angles for "{post.title}".
                </div>
              )}
            </div>
          )}

          {/* MODE 3: REFINE & POLISH */}
          {activeMode === 'refine' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF] block">
                  Text to refine:
                </label>
                <textarea
                  rows={4}
                  value={refineInputText}
                  onChange={(e) => setRefineInputText(e.target.value)}
                  placeholder="Paste or type sentences here..."
                  className="w-full text-xs p-2.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed resize-none"
                />
              </div>

              {/* Quick Actions */}
              <div>
                <span className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93] block mb-1.5">
                  Transformation:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: 'punchier', label: 'More punchy', icon: Sparkles },
                    { id: 'shorter', label: 'Shorter', icon: Scissors },
                    { id: 'casual', label: 'More casual', icon: Coffee },
                    { id: 'professional', label: 'Professional', icon: Briefcase },
                    { id: 'expand', label: 'Expand points', icon: Maximize2 },
                    { id: 'fix_grammar', label: 'Fix grammar', icon: CheckCheck },
                    { id: 'rewrite', label: 'Rewrite', icon: RotateCcw },
                  ].map((act) => {
                    const Icon = act.icon;
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => handleRefineText(act.id)}
                        disabled={isLoading || !refineInputText.trim()}
                        className={`h-7 px-2 rounded-[4px] border text-xs font-normal flex items-center justify-center gap-1.5 transition-colors ${
                          refineAction === act.id
                            ? 'bg-[#1F5C47] text-white border-[#1F5C47]'
                            : 'bg-[#FFFFFF] dark:bg-[#1C1C1A] border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421]'
                        } disabled:opacity-50`}
                      >
                        <Icon className="w-3 h-3 stroke-[1.5]" />
                        <span>{act.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Refinement Result */}
              {refinedResult && (
                <div className="border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] p-3 bg-[#FFFFFF] dark:bg-[#1C1C1A] space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#E6E4DF] dark:border-[#2A2A27]">
                    <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                      Refined Result
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setRefinedResult(null)}
                        className="text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]"
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onAcceptRefinedText(refinedResult.text);
                          onClose();
                        }}
                        className="h-6 px-2 rounded-[3px] bg-[#1F5C47] text-white text-xs font-medium hover:bg-[#174A39] flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3 h-3 stroke-[1.5]" />
                        <span>Apply</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed p-2.5 bg-[#FBFBFA] dark:bg-[#141413] rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27]">
                    {refinedResult.text}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* MODE 4: SCRIPT TO CAPTION */}
          {activeMode === 'script_to_caption' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                    Script to Social Caption
                  </h3>
                  <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                    Formats script text into a clean post caption
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleScriptToCaption}
                  disabled={isLoading}
                  className="h-7 px-2.5 rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3 stroke-[1.5]" />
                  <span>{isLoading ? 'Converting...' : 'Generate caption'}</span>
                </button>
              </div>

              {generatedCaption && (
                <div className="border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] p-3 bg-[#FFFFFF] dark:bg-[#1C1C1A] space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#E6E4DF] dark:border-[#2A2A27]">
                    <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                      Generated Caption
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGeneratedCaption(null)}
                        className="text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]"
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onAcceptCaption(generatedCaption.caption, generatedCaption.hashtags);
                          onClose();
                        }}
                        className="h-6 px-2 rounded-[3px] bg-[#1F5C47] text-white text-xs font-medium hover:bg-[#174A39] flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3 h-3 stroke-[1.5]" />
                        <span>Apply caption</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#FBFBFA] dark:bg-[#141413] rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] text-xs text-[#1C1B19] dark:text-[#F3F2EF] whitespace-pre-line leading-relaxed">
                    {generatedCaption.caption}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {generatedCaption.hashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-1.5 py-0.5 rounded-[3px] bg-[#F3F2EF] dark:bg-[#242421] text-[#1C1B19] dark:text-[#F3F2EF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 5: SCRIPT TO CAROUSEL */}
          {activeMode === 'script_to_carousel' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                    Script to Carousel Slides
                  </h3>
                  <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                    Extracts slide headlines and body copy from script
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <select
                    value={carouselSlideCount}
                    onChange={(e) => setCarouselSlideCount(Number(e.target.value))}
                    className="text-xs px-2 py-1 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF]"
                  >
                    <option value={4}>4 Slides</option>
                    <option value={5}>5 Slides</option>
                    <option value={6}>6 Slides</option>
                    <option value={8}>8 Slides</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleScriptToCarousel}
                    disabled={isLoading}
                    className="h-7 px-2.5 rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 stroke-[1.5]" />
                    <span>{isLoading ? 'Converting...' : 'Generate slides'}</span>
                  </button>
                </div>
              </div>

              {generatedSlides && (
                <div className="border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] p-3 bg-[#FFFFFF] dark:bg-[#1C1C1A] space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#E6E4DF] dark:border-[#2A2A27]">
                    <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                      Generated {generatedSlides.length} Slides
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGeneratedSlides(null)}
                        className="text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]"
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onAcceptCarousel(generatedSlides);
                          onClose();
                        }}
                        className="h-6 px-2 rounded-[3px] bg-[#1F5C47] text-white text-xs font-medium hover:bg-[#174A39] flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3 h-3 stroke-[1.5]" />
                        <span>Apply slides</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto">
                    {generatedSlides.map((slide) => (
                      <div
                        key={slide.id}
                        className="p-2.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] space-y-1"
                      >
                        <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93]">
                          Slide {slide.slideNumber}
                        </span>
                        <h4 className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                          {slide.heading}
                        </h4>
                        <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                          {slide.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between bg-[#FFFFFF] dark:bg-[#1C1C1A]">
          <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
            Suggestions are only applied when you accept
          </span>
          <button
            type="button"
            onClick={onClose}
            className="h-7 px-3 text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
