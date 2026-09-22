import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  LayoutTemplate,
  Tv,
  History,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  FileText,
  Video,
  Layers,
  AlignLeft,
  Download,
} from 'lucide-react';
import { PostItem, ScriptContentData } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { ScriptTemplateDefinition } from '../../constants';
import { VideoScriptEditor } from './VideoScriptEditor';
import { CarouselEditor } from './CarouselEditor';
import { WrittenPostEditor } from './WrittenPostEditor';
import { CaptionEditor } from './CaptionEditor';
import { TeleprompterModal } from './TeleprompterModal';
import { StudioTemplatesModal } from './StudioTemplatesModal';
import { VersionHistoryModal } from './VersionHistoryModal';
import { AiWritingModal } from './AiWritingModal';

interface StudioEditorProps {
  postId: string;
  onBack: () => void;
}

export const StudioEditor: React.FC<StudioEditorProps> = ({ postId, onBack }) => {
  const {
    posts,
    updatePost,
    updatePostScriptContent,
    saveScriptVersion,
    restoreScriptVersion,
  } = useAppContext();

  const post = posts.find((p) => p.id === postId);

  // Fallback if post not found
  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1]">
        <p className="text-xs font-normal mb-3">Post not found in studio.</p>
        <button
          type="button"
          onClick={onBack}
          className="px-3 py-1.5 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
        >
          Return to Studio Directory
        </button>
      </div>
    );
  }

  // Active script content
  const scriptContent: ScriptContentData = post.scriptContent || {
    hasContent: false,
    targetSeconds: 60,
    hookText: post.hook || '',
    bodyText: '',
    callToActionText: '',
    sceneRows: [],
    shotList: [],
    slides: [],
    platformVariations: [],
    versions: [],
  };

  // Modals state
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiInitialMode, setAiInitialMode] = useState<string>('draft');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const isVideoFormat = ['Reel', 'Short', 'TikTok', 'Video', 'Live'].some((term) =>
    post.format.toLowerCase().includes(term.toLowerCase())
  );
  const isCarouselFormat = post.format.toLowerCase().includes('carousel');

  const defaultTab = isCarouselFormat ? 'carousel' : isVideoFormat ? 'script' : 'written';
  const [activeEditorTab, setActiveEditorTab] = useState<'script' | 'carousel' | 'written' | 'caption'>(
    defaultTab
  );

  // Inline post title editing
  const [titleText, setTitleText] = useState(post.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Save title on blur
  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (titleText.trim() && titleText !== post.title) {
      updatePost(post.id, { title: titleText.trim() });
    }
  };

  const allSpokenText = React.useMemo(() => {
    const parts = [
      scriptContent.hookText,
      scriptContent.bodyText,
      scriptContent.callToActionText,
      scriptContent.outroText,
      scriptContent.writtenText,
      ...(scriptContent.sceneRows || []).map((r) => r.audio),
      ...(scriptContent.slides || []).map((s) => `${s.heading} ${s.body}`),
    ];
    return parts.filter(Boolean).join(' ');
  }, [scriptContent]);

  const wordCount = React.useMemo(() => {
    const trimmed = allSpokenText.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [allSpokenText]);

  const estimatedSeconds = Math.round(wordCount / 2.33);
  const targetSeconds = scriptContent.targetSeconds || 60;
  const isOverTarget = estimatedSeconds > targetSeconds + 5;

  const handleScriptChange = (updates: Partial<ScriptContentData>) => {
    updatePostScriptContent(post.id, {
      ...updates,
      hasContent: true,
    });
  };

  const handleTargetSecondsChange = (seconds: number) => {
    handleScriptChange({ targetSeconds: seconds });
  };

  const handleApplyTemplate = (tmpl: ScriptTemplateDefinition) => {
    handleScriptChange({
      targetSeconds: tmpl.targetSeconds || 60,
      hookText: tmpl.hookText,
      bodyText: tmpl.bodyText,
      callToActionText: tmpl.callToActionText,
      sceneRows: tmpl.sceneRows?.map((r, idx) => ({
        id: `sc-tmpl-${Date.now()}-${idx}`,
        visual: r.visual,
        audio: r.audio,
      })) || [],
      shotList: tmpl.shotList?.map((s, idx) => ({
        id: `shot-tmpl-${Date.now()}-${idx}`,
        item: s.item,
        category: s.category || 'scene',
        completed: false,
      })) || [],
    });
    saveScriptVersion(post.id, `Applied ${tmpl.name} framework`);
  };

  const handleCopyFormattedScript = () => {
    const formatted = `TITLE: ${post.title}\nPLATFORMS: ${post.platforms.join(', ')}\nFORMAT: ${post.format}\n\n=== HOOK (First 3s) ===\n${scriptContent.hookText || '(none)'}\n\n=== CORE BODY ===\n${scriptContent.bodyText || scriptContent.writtenText || '(none)'}\n\n=== CALL TO ACTION ===\n${scriptContent.callToActionText || '(none)'}\n\n=== OUTRO ===\n${scriptContent.outroText || '(none)'}\n\n=== CAPTION ===\n${post.caption || '(none)'}\n${(post.hashtags || []).join(' ')}`.trim();
    navigator.clipboard.writeText(formatted);
    setCopiedNotification('Script copied to clipboard');
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleDownloadMarkdown = () => {
    const md = `# ${post.title}\n**Format:** ${post.format} | **Pillar:** ${post.pillarId} | **Target:** ${targetSeconds}s\n\n## Hook\n> ${scriptContent.hookText || ''}\n\n## Script Content\n${scriptContent.bodyText || scriptContent.writtenText || ''}\n\n## Call to Action\n${scriptContent.callToActionText || ''}\n\n## Caption\n${post.caption || ''}\n\n${(post.hashtags || []).join(' ')}`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_script.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="content-studio-editor"
      className="fixed inset-0 z-40 bg-[#F7F6F3] dark:bg-[#1C1C1A] flex flex-col overflow-hidden select-text"
    >
      {/* Top Studio Header Bar */}
      {!isFocusMode && (
        <header className="h-11 px-4 sm:px-6 border-b border-[#E9E7E2] dark:border-[#323230] bg-[#FFFFFF] dark:bg-[#232321] flex items-center justify-between shrink-0">
          {/* Left: Back Arrow + Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="p-1 -ml-1 rounded-[4px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors shrink-0 focus-ring"
              title="Return to Studio (Esc)"
            >
              <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                    onBlur={handleTitleBlur}
                    onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
                    autoFocus
                    className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1] bg-[#FFFFFF] dark:bg-[#1C1C1A] px-2 py-0.5 rounded-[4px] border border-[#2C6E56] dark:border-[#5AA88C] focus:outline-none"
                  />
                ) : (
                  <h1
                    onClick={() => setIsEditingTitle(true)}
                    className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1] truncate cursor-pointer hover:underline"
                    title="Click to rename"
                  >
                    {post.title}
                  </h1>
                )}

                <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] shrink-0 font-normal">
                  · {post.format}
                </span>

                <span className="text-[11px] text-[#6F6C66] dark:text-[#9A978F] font-normal">
                  Saved
                </span>
              </div>
            </div>
          </div>

          {/* Center: Live Word Count, Speaking Time & Target Setting */}
          <div className="hidden md:flex items-center gap-3 text-xs text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal">
            <span>{wordCount} words</span>
            <span>·</span>
            <span className={isOverTarget ? 'text-[#B42318] dark:text-[#C54A44]' : ''}>
              ~{estimatedSeconds}s spoken
            </span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <span>Target:</span>
              <select
                value={targetSeconds}
                onChange={(e) => handleTargetSecondsChange(Number(e.target.value))}
                className="text-xs bg-transparent border-0 text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none cursor-pointer font-normal"
              >
                <option value={30}>30s</option>
                <option value={60}>60s</option>
                <option value={90}>90s</option>
                <option value={180}>3m</option>
              </select>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* AI Assistant */}
            <button
              type="button"
              onClick={() => {
                setAiInitialMode('draft');
                setShowAiModal(true);
              }}
              className="h-7 px-2.5 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal flex items-center gap-1.5 transition-colors focus-ring"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden sm:inline">AI Assist</span>
            </button>

            {/* Templates */}
            <button
              type="button"
              onClick={() => setShowTemplates(true)}
              className="h-7 px-2 rounded-[4px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
              title="Creator Templates"
            >
              <LayoutTemplate className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>

            {/* Teleprompter */}
            <button
              type="button"
              onClick={() => setShowTeleprompter(true)}
              className="h-7 px-2 rounded-[4px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
              title="Open Fullscreen Teleprompter"
            >
              <Tv className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>

            {/* Version History */}
            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className="h-7 px-2 rounded-[4px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
              title="Snapshot History"
            >
              <History className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>

            {/* Focus Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsFocusMode(true)}
              className="h-7 px-2 rounded-[4px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
              title="Focus Mode"
            >
              <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>

            {/* Export Menu / Quick Copy */}
            <button
              type="button"
              onClick={handleCopyFormattedScript}
              className="h-7 px-2.5 rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] flex items-center gap-1.5 transition-colors focus-ring"
            >
              <Copy className="w-3.5 h-3.5 stroke-[1.5] text-[#6F6C66] dark:text-[#9A978F]" />
              <span className="hidden sm:inline">Copy</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="h-7 px-2 rounded-[4px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
              title="Export as Markdown"
            >
              <Download className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </header>
      )}

      {/* Floating Exit Focus Mode button */}
      {isFocusMode && (
        <div className="fixed top-4 right-4 z-50">
          <button
            type="button"
            onClick={() => setIsFocusMode(false)}
            className="h-7 px-3 rounded-[4px] bg-[#FFFFFF] dark:bg-[#232321] border border-[#E9E7E2] dark:border-[#323230] text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] flex items-center gap-1.5 hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] focus-ring"
          >
            <Minimize2 className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Exit focus</span>
          </button>
        </div>
      )}

      {/* Main Studio View Switcher Tabs */}
      {!isFocusMode && (
        <div className="h-9 px-4 sm:px-6 border-b border-[#E9E7E2] dark:border-[#323230] bg-[#FFFFFF] dark:bg-[#232321] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveEditorTab('script')}
              className={`h-9 border-b-2 text-xs flex items-center gap-1.5 transition-colors focus-ring ${
                activeEditorTab === 'script'
                  ? 'border-b-[#2C6E56] dark:border-b-[#5AA88C] text-[#2A2925] dark:text-[#D9D7D1] font-normal'
                  : 'border-b-transparent text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] font-normal'
              }`}
            >
              <Video className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Video Script</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveEditorTab('carousel')}
              className={`h-9 border-b-2 text-xs flex items-center gap-1.5 transition-colors focus-ring ${
                activeEditorTab === 'carousel'
                  ? 'border-b-[#2C6E56] dark:border-b-[#5AA88C] text-[#2A2925] dark:text-[#D9D7D1] font-normal'
                  : 'border-b-transparent text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] font-normal'
              }`}
            >
              <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Carousel Slides</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveEditorTab('written')}
              className={`h-9 border-b-2 text-xs flex items-center gap-1.5 transition-colors focus-ring ${
                activeEditorTab === 'written'
                  ? 'border-b-[#2C6E56] dark:border-b-[#5AA88C] text-[#2A2925] dark:text-[#D9D7D1] font-normal'
                  : 'border-b-transparent text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] font-normal'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Written Post</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveEditorTab('caption')}
              className={`h-9 border-b-2 text-xs flex items-center gap-1.5 transition-colors focus-ring ${
                activeEditorTab === 'caption'
                  ? 'border-b-[#2C6E56] dark:border-b-[#5AA88C] text-[#2A2925] dark:text-[#D9D7D1] font-normal'
                  : 'border-b-transparent text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] font-normal'
              }`}
            >
              <FileText className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Caption & Tags</span>
            </button>
          </div>

          <span className="text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal">
            {post.platforms.join(', ')}
          </span>
        </div>
      )}

      {/* Editor Body */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#F7F6F3] dark:bg-[#1C1C1A]">
        {activeEditorTab === 'script' && (
          <VideoScriptEditor
            script={scriptContent}
            onChange={handleScriptChange}
            onOpenAi={(mode) => {
              setAiInitialMode(mode || 'draft');
              setShowAiModal(true);
            }}
          />
        )}

        {activeEditorTab === 'carousel' && (
          <CarouselEditor
            script={scriptContent}
            onChange={handleScriptChange}
            onOpenAi={(mode) => {
              setAiInitialMode(mode || 'script_to_carousel');
              setShowAiModal(true);
            }}
          />
        )}

        {activeEditorTab === 'written' && (
          <WrittenPostEditor
            script={scriptContent}
            onChange={handleScriptChange}
            onOpenAi={(mode) => {
              setAiInitialMode(mode || 'refine');
              setShowAiModal(true);
            }}
          />
        )}

        {activeEditorTab === 'caption' && (
          <CaptionEditor
            post={post}
            script={scriptContent}
            onChangeScript={handleScriptChange}
            onUpdatePostCaption={(caption, hashtags) => {
              updatePost(post.id, { caption, hashtags });
            }}
            onOpenAi={(mode) => {
              setAiInitialMode(mode || 'script_to_caption');
              setShowAiModal(true);
            }}
          />
        )}
      </div>

      {/* Copied notification toast */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-3 py-2 rounded-[4px] bg-[#232321] border border-[#323230] text-[#D9D7D1] text-xs font-normal flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#5AA88C]" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Teleprompter Modal */}
      <TeleprompterModal
        isOpen={showTeleprompter}
        onClose={() => setShowTeleprompter(false)}
        title={post.title}
        scriptText={allSpokenText}
      />

      {/* Templates Modal */}
      <StudioTemplatesModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onApplyTemplate={handleApplyTemplate}
        currentScript={scriptContent}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        versions={scriptContent.versions || []}
        onRestore={(versionId) => restoreScriptVersion(post.id, versionId)}
        onSaveSnapshot={(label) => saveScriptVersion(post.id, label)}
      />

      {/* AI Assistant Modal */}
      <AiWritingModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        post={post}
        currentScript={scriptContent}
        onAcceptDraft={(draft) => {
          handleScriptChange(draft);
          saveScriptVersion(post.id, 'Applied AI Draft');
        }}
        onAcceptHook={(hook) => {
          handleScriptChange({ hookText: hook });
          updatePost(post.id, { hook });
        }}
        onAcceptCaption={(caption, hashtags) => {
          updatePost(post.id, { caption, hashtags });
        }}
        onAcceptCarousel={(slides) => {
          handleScriptChange({ slides });
          setActiveEditorTab('carousel');
        }}
        onAcceptRefinedText={(refined) => {
          handleScriptChange({ bodyText: refined, writtenText: refined });
        }}
      />
    </div>
  );
};
