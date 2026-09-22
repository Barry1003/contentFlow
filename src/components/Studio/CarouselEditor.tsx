import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
} from 'lucide-react';
import { CarouselSlide, ScriptContentData } from '../../types';

interface CarouselEditorProps {
  script: Partial<ScriptContentData>;
  onChange: (updates: Partial<ScriptContentData>) => void;
  onOpenAi: (mode?: string) => void;
}

export const CarouselEditor: React.FC<CarouselEditorProps> = ({
  script,
  onChange,
  onOpenAi,
}) => {
  const slides: CarouselSlide[] = script.slides && script.slides.length > 0
    ? script.slides
    : [
        {
          id: 'sl-1',
          slideNumber: 1,
          heading: 'Hook Title: The #1 Thing Holding Creators Back',
          body: 'Swipe through to learn the 4-step framework that changes your growth trajectory.',
          visualNote: 'Cover Slide: Bold centered typography, high contrast, clean neutral background.',
        },
        {
          id: 'sl-2',
          slideNumber: 2,
          heading: '01. Stop Over-Editing',
          body: 'Viewers care about clarity and pacing, not 5-layer motion blur. Clean cuts win every time.',
          visualNote: 'Side-by-side comparison graphics with clean minimal frames.',
        },
        {
          id: 'sl-3',
          slideNumber: 3,
          heading: '02. Hook in 3 Seconds',
          body: 'The first line determines 80% of retention. Never start with "Hey guys, today I want to talk about..."',
          visualNote: 'Highlight box with clear Dos and Donts.',
        },
        {
          id: 'sl-4',
          slideNumber: 4,
          heading: 'Save This For Later',
          body: 'Bookmark this carousel before your next post brainstorm. Which slide hit closest to home?',
          visualNote: 'Final CTA Slide: Large bookmark prompt and comment prompt.',
        },
      ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = slides[activeSlideIndex] || slides[0];

  const updateActiveSlide = (field: keyof CarouselSlide, value: any) => {
    const updated = slides.map((s, idx) =>
      idx === activeSlideIndex ? { ...s, [field]: value } : s
    );
    onChange({ slides: updated });
  };

  const addSlide = () => {
    const newSlide: CarouselSlide = {
      id: `sl-${Date.now()}`,
      slideNumber: slides.length + 1,
      heading: `Slide ${slides.length + 1}`,
      body: '',
      visualNote: '',
    };
    const updated = [...slides, newSlide];
    onChange({ slides: updated });
    setActiveSlideIndex(updated.length - 1);
  };

  const duplicateSlide = (idx: number) => {
    const source = slides[idx];
    const copy: CarouselSlide = {
      ...source,
      id: `sl-${Date.now()}`,
      slideNumber: slides.length + 1,
      heading: `${source.heading} (Copy)`,
    };
    const updated = [...slides.slice(0, idx + 1), copy, ...slides.slice(idx + 1)].map(
      (s, i) => ({ ...s, slideNumber: i + 1 })
    );
    onChange({ slides: updated });
    setActiveSlideIndex(idx + 1);
  };

  const deleteSlide = (idx: number) => {
    if (slides.length <= 1) return;
    const updated = slides
      .filter((_, i) => i !== idx)
      .map((s, i) => ({ ...s, slideNumber: i + 1 }));
    onChange({ slides: updated });
    setActiveSlideIndex(Math.max(0, idx - 1));
  };

  const moveSlide = (fromIdx: number, direction: 'left' | 'right') => {
    const toIdx = direction === 'left' ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= slides.length) return;
    const newSlides = [...slides];
    const temp = newSlides[fromIdx];
    newSlides[fromIdx] = newSlides[toIdx];
    newSlides[toIdx] = temp;
    const reindexed = newSlides.map((s, i) => ({ ...s, slideNumber: i + 1 }));
    onChange({ slides: reindexed });
    setActiveSlideIndex(toIdx);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FBFBFA] dark:bg-[#141413]">
      {/* Top Slide Horizontal Thumbnails Strip */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] flex items-center gap-2.5 overflow-x-auto shrink-0">
        <span className="text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] shrink-0">
          Slides ({slides.length}):
        </span>

        <div className="flex items-center gap-1.5">
          {slides.map((slide, idx) => {
            const isActive = idx === activeSlideIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlideIndex(idx)}
                className={`w-20 h-12 rounded-[4px] border p-1.5 text-left flex flex-col justify-between shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] border-[#1F5C47] outline outline-1 outline-[#1F5C47]'
                    : 'bg-[#FBFBFA] dark:bg-[#141413] border-[#E6E4DF] dark:border-[#2A2A27] hover:border-[#6F6C66]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93]">
                    #{slide.slideNumber}
                  </span>
                  {idx === 0 && (
                    <span className="text-[9px] text-[#6F6C66]">Cover</span>
                  )}
                </div>
                <p className="text-[10px] text-[#1C1B19] dark:text-[#F3F2EF] font-normal truncate">
                  {slide.heading || 'Untitled'}
                </p>
              </button>
            );
          })}

          <button
            type="button"
            onClick={addSlide}
            className="w-12 h-12 rounded-[4px] border border-dashed border-[#E6E4DF] dark:border-[#2A2A27] hover:border-[#6F6C66] text-[#6F6C66] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] flex items-center justify-center shrink-0 transition-colors"
            title="Add Slide"
          >
            <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>

        <div className="ml-auto shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenAi('script_to_carousel')}
            className="text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>AI generate</span>
          </button>
        </div>
      </div>

      {/* Main Slide Editor View */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-4">
        {/* Slide Header Toolbar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E6E4DF] dark:border-[#2A2A27]">
          <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
            Slide {activeSlide.slideNumber} of {slides.length}
            {activeSlideIndex === 0 && ' (Cover)'}
            {activeSlideIndex === slides.length - 1 && ' (CTA)'}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => moveSlide(activeSlideIndex, 'left')}
              disabled={activeSlideIndex === 0}
              className="p-1 text-[#6F6C66] hover:text-[#1C1B19] disabled:opacity-30 rounded hover:bg-[#F3F2EF] dark:hover:bg-[#242421]"
              title="Move Left"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={() => moveSlide(activeSlideIndex, 'right')}
              disabled={activeSlideIndex === slides.length - 1}
              className="p-1 text-[#6F6C66] hover:text-[#1C1B19] disabled:opacity-30 rounded hover:bg-[#F3F2EF] dark:hover:bg-[#242421]"
              title="Move Right"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={() => duplicateSlide(activeSlideIndex)}
              className="p-1 text-[#6F6C66] hover:text-[#1C1B19] rounded hover:bg-[#F3F2EF] dark:hover:bg-[#242421]"
              title="Duplicate"
            >
              <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={() => deleteSlide(activeSlideIndex)}
              disabled={slides.length <= 1}
              className="p-1 text-[#6F6C66] hover:text-[#B42318] disabled:opacity-30 rounded hover:bg-[#F3F2EF] dark:hover:bg-[#242421]"
              title="Delete Slide"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Slide Canvas Card */}
        <div className="rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] p-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF] block mb-1">
              Headline
            </label>
            <input
              type="text"
              value={activeSlide.heading}
              onChange={(e) => updateActiveSlide('heading', e.target.value)}
              placeholder="Headline (e.g. 01. The Core Idea)..."
              className="w-full text-sm font-medium px-3 py-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF]"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF] block mb-1">
              Body Copy
            </label>
            <textarea
              rows={4}
              value={activeSlide.body}
              onChange={(e) => updateActiveSlide('body', e.target.value)}
              placeholder="Short, punchy paragraphs or insights..."
              className="w-full text-sm p-3 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-[#6F6C66] dark:text-[#9E9B93] block mb-1 flex items-center gap-1">
              <Eye className="w-3 h-3 stroke-[1.5]" />
              <span>Design / Visual Note</span>
            </label>
            <input
              type="text"
              value={activeSlide.visualNote || ''}
              onChange={(e) => updateActiveSlide('visualNote', e.target.value)}
              placeholder="e.g. Minimal diagram, high contrast card..."
              className="w-full text-xs px-3 py-1.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
