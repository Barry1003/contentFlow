import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  FlipHorizontal,
  Type,
  Gauge,
  Maximize,
  Minimize,
} from 'lucide-react';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  scriptText: string;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  title,
  scriptText,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 to 5
  const [fontSize, setFontSize] = useState<number>(36); // in px
  const [isMirrored, setIsMirrored] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Clean script text: remove visual notes / stage directions
  const cleanedText = React.useMemo(() => {
    if (!scriptText) return 'No script text entered yet. Write your script in the editor to use the teleprompter.';
    return scriptText
      .replace(/\[visual:.*?\]/gi, '')
      .replace(/\(camera:.*?\)/gi, '')
      .replace(/scene \d+:?/gi, '')
      .trim();
  }, [scriptText]);

  // Smooth scrolling loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    const scrollStep = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (containerRef.current) {
        const pixelsPerSecond = scrollSpeed * 28;
        containerRef.current.scrollTop += (pixelsPerSecond * delta) / 1000;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setIsPlaying(false);
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, scrollSpeed]);

  // Keyboard shortcut listener (Space to play/pause, Esc to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setScrollSpeed((prev) => Math.min(5, prev + 0.5));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setScrollSpeed((prev) => Math.max(0.5, prev - 0.5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleReset = () => {
    setIsPlaying(false);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="teleprompter-modal"
      className="fixed inset-0 z-50 bg-[#141413] text-[#F3F2EF] flex flex-col select-none overflow-hidden"
    >
      {/* Top Control Bar */}
      <header className="h-12 px-6 border-b border-[#2A2A27] flex items-center justify-between bg-[#1C1C1A] shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-7 px-2.5 rounded-[4px] border border-[#2A2A27] hover:bg-[#242421] text-[#9E9B93] hover:text-[#F3F2EF] text-xs flex items-center gap-1.5 transition-colors"
          >
            <X className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Exit (Esc)</span>
          </button>
          <span className="text-xs text-[#9E9B93] truncate max-w-xs">
            {title || 'Teleprompter'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[4px] border border-[#2A2A27] bg-[#141413]">
            <Type className="w-3 h-3 stroke-[1.5] text-[#9E9B93]" />
            <input
              type="range"
              min={24}
              max={64}
              step={2}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-16 accent-[#1F5C47] cursor-pointer"
              title="Font Size"
            />
            <span className="text-[11px] text-[#9E9B93] tabular-nums w-8 text-right">{fontSize}px</span>
          </div>

          {/* Speed */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] border border-[#2A2A27] bg-[#141413]">
            <Gauge className="w-3 h-3 stroke-[1.5] text-[#9E9B93]" />
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="w-16 accent-[#1F5C47] cursor-pointer"
              title="Scroll Speed"
            />
            <span className="text-[11px] text-[#9E9B93] tabular-nums w-6 text-right">{scrollSpeed}x</span>
          </div>

          {/* Mirror Flip */}
          <button
            type="button"
            onClick={() => setIsMirrored((prev) => !prev)}
            className={`h-7 px-2 rounded-[4px] border text-xs transition-colors ${
              isMirrored
                ? 'bg-[#1F5C47] text-white border-[#1F5C47]'
                : 'border-[#2A2A27] text-[#9E9B93] hover:text-[#F3F2EF] hover:bg-[#242421]'
            }`}
            title="Mirror Horizontally"
          >
            <FlipHorizontal className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="h-7 px-2 rounded-[4px] border border-[#2A2A27] text-[#9E9B93] hover:text-[#F3F2EF] hover:bg-[#242421] transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5 stroke-[1.5]" /> : <Maximize className="w-3.5 h-3.5 stroke-[1.5]" />}
          </button>
        </div>
      </header>

      {/* Prompter Text Stage */}
      <div
        ref={containerRef}
        onClick={() => setIsPlaying((prev) => !prev)}
        className={`flex-1 overflow-y-auto px-8 md:px-24 lg:px-48 py-24 cursor-pointer text-center scroll-smooth ${
          isMirrored ? 'scale-x-[-1]' : ''
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="max-w-4xl mx-auto min-h-screen flex flex-col justify-start">
          {/* Eyeline guide indicator line */}
          <div className="fixed top-1/3 left-0 right-0 h-px border-t border-dashed border-[#2A2A27] pointer-events-none z-10 flex items-center justify-between px-6">
            <span className="text-[10px] text-[#9E9B93] uppercase tracking-wider bg-[#141413] px-2 py-0.5">
              Eyeline
            </span>
          </div>

          <div
            className="font-sans font-normal text-[#F3F2EF] leading-[1.8] tracking-normal whitespace-pre-wrap select-none"
            style={{ fontSize: `${fontSize}px` }}
          >
            {cleanedText}
          </div>

          {/* Bottom buffer */}
          <div className="h-[60vh] flex items-center justify-center text-[#6F6C66] text-xs">
            End of script
          </div>
        </div>
      </div>

      {/* Bottom Floating Playback Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1C1C1A] px-4 py-2 rounded-[6px] border border-[#2A2A27] flex items-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="p-1.5 text-[#9E9B93] hover:text-[#F3F2EF] hover:bg-[#242421] rounded transition-colors"
          title="Restart from top"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>

        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="h-7 px-3 rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-white stroke-0" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white stroke-0" />
              <span>Play</span>
            </>
          )}
        </button>

        <span className="text-xs text-[#9E9B93] tabular-nums">
          {isPlaying ? 'Playing' : 'Paused'}
        </span>
      </div>
    </div>
  );
};
