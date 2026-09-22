import React, { useState } from 'react';
import {
  Hash,
  Copy,
  Check,
  Sparkles,
  Plus,
} from 'lucide-react';
import { PostItem, ScriptContentData, PlatformCaptionVariation } from '../../types';
import { DEFAULT_PLATFORMS } from '../../constants';

interface CaptionEditorProps {
  post: PostItem;
  script: Partial<ScriptContentData>;
  onChangeScript: (updates: Partial<ScriptContentData>) => void;
  onUpdatePostCaption: (caption: string, hashtags: string[]) => void;
  onOpenAi: (mode?: string) => void;
}

export const CaptionEditor: React.FC<CaptionEditorProps> = ({
  post,
  script,
  onChangeScript,
  onUpdatePostCaption,
  onOpenAi,
}) => {
  const [captionText, setCaptionText] = useState(post.caption || '');
  const [hashtags, setHashtags] = useState<string[]>(post.hashtags || []);
  const [newHashtag, setNewHashtag] = useState('');
  const [copied, setCopied] = useState(false);
  const [activePlatformTab, setActivePlatformTab] = useState<string>('master');

  const platformVariations = script.platformVariations || [];

  const handleCaptionChange = (val: string) => {
    setCaptionText(val);
    onUpdatePostCaption(val, hashtags);
  };

  const handleAddHashtag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = newHashtag.trim().replace(/^#/, '');
    if (!tag) return;
    const formatted = `#${tag}`;
    if (!hashtags.includes(formatted)) {
      const updated = [...hashtags, formatted];
      setHashtags(updated);
      onUpdatePostCaption(captionText, updated);
    }
    setNewHashtag('');
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    const updated = hashtags.filter((t) => t !== tagToRemove);
    setHashtags(updated);
    onUpdatePostCaption(captionText, updated);
  };

  const copyToClipboard = () => {
    const full = `${captionText}\n\n${hashtags.join(' ')}`.trim();
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Cross-platform adaptations
  const createPlatformVariation = (platId: string) => {
    if (platformVariations.some((v) => v.platformId === platId)) {
      setActivePlatformTab(platId);
      return;
    }
    const newVar: PlatformCaptionVariation = {
      platformId: platId,
      caption: captionText,
    };
    const updated = [...platformVariations, newVar];
    onChangeScript({ platformVariations: updated });
    setActivePlatformTab(platId);
  };

  const updateVariationCaption = (platId: string, val: string) => {
    const updated = platformVariations.map((v) =>
      v.platformId === platId ? { ...v, caption: val } : v
    );
    onChangeScript({ platformVariations: updated });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FBFBFA] dark:bg-[#141413]">
      {/* Top Platform Switcher Bar */}
      <div className="px-4 sm:px-6 py-2 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <div className="flex items-center border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] p-0.5 h-7 bg-[#FBFBFA] dark:bg-[#141413]">
            <button
              type="button"
              onClick={() => setActivePlatformTab('master')}
              className={`px-2.5 h-full rounded-[4px] text-xs transition-colors ${
                activePlatformTab === 'master'
                  ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium'
                  : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]'
              }`}
            >
              Master
            </button>

            {platformVariations.map((v) => {
              const plat = DEFAULT_PLATFORMS.find((p) => p.id === v.platformId);
              const isTabActive = activePlatformTab === v.platformId;
              return (
                <button
                  key={v.platformId}
                  type="button"
                  onClick={() => setActivePlatformTab(v.platformId)}
                  className={`px-2.5 h-full rounded-[4px] text-xs transition-colors ${
                    isTabActive
                      ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium'
                      : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19]'
                  }`}
                >
                  {plat?.name || v.platformId}
                </button>
              );
            })}
          </div>

          {/* Adapt For Platform Dropdown */}
          <div className="flex items-center gap-1 ml-1">
            {DEFAULT_PLATFORMS.filter(
              (p) => !platformVariations.some((v) => v.platformId === p.id)
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => createPlatformVariation(p.id)}
                className="h-6 px-1.5 rounded-[4px] text-[11px] text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
              >
                + {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={copyToClipboard}
            className="h-7 px-2.5 rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] text-xs text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] flex items-center gap-1 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#1F5C47]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[1.5] text-[#6F6C66]" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => onOpenAi('script_to_caption')}
            className="h-7 px-2.5 rounded-[4px] text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>AI assist</span>
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-4">
        {/* Caption Box */}
        <div className="rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
              {activePlatformTab === 'master'
                ? 'Master Caption'
                : `${DEFAULT_PLATFORMS.find((p) => p.id === activePlatformTab)?.name} Version`}
            </span>

            {/* Platform Limits */}
            <div className="flex items-center gap-2">
              {DEFAULT_PLATFORMS.slice(0, 4).map((plat) => {
                const len =
                  activePlatformTab === 'master'
                    ? captionText.length
                    : (platformVariations.find((v) => v.platformId === activePlatformTab)?.caption || '').length;
                const isOver = len > plat.charLimit;
                return (
                  <span
                    key={plat.id}
                    className={`text-[11px] tabular-nums ${
                      isOver
                        ? 'text-[#B42318] font-medium'
                        : 'text-[#6F6C66] dark:text-[#9E9B93]'
                    }`}
                  >
                    {plat.name.split(' ')[0]}: {len}/{plat.charLimit}
                  </span>
                );
              })}
            </div>
          </div>

          <textarea
            rows={8}
            value={
              activePlatformTab === 'master'
                ? captionText
                : platformVariations.find((v) => v.platformId === activePlatformTab)?.caption || ''
            }
            onChange={(e) => {
              if (activePlatformTab === 'master') {
                handleCaptionChange(e.target.value);
              } else {
                updateVariationCaption(activePlatformTab, e.target.value);
              }
            }}
            placeholder="Write your caption with clean spacing and call to action..."
            className="w-full text-sm p-3 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed resize-y font-sans"
          />
        </div>

        {/* Hashtags Section */}
        <div className="rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
              <Hash className="w-3.5 h-3.5 stroke-[1.5] text-[#6F6C66]" />
              <span>Hashtags ({hashtags.length})</span>
            </div>
            <span className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
              Recommended: 3–8 tags
            </span>
          </div>

          {/* Tag Chips */}
          <div className="flex flex-wrap gap-1.5 min-h-[28px]">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-[4px] bg-[#F3F2EF] dark:bg-[#242421] text-[#1C1B19] dark:text-[#F3F2EF] border border-[#E6E4DF] dark:border-[#2A2A27]"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHashtag(tag)}
                  className="text-[#6F6C66] hover:text-[#B42318] ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add Hashtag Input */}
          <form onSubmit={handleAddHashtag} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add hashtag (e.g. contentcreator)..."
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              className="flex-1 text-xs px-2.5 py-1.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF]"
            />
            <button
              type="submit"
              className="h-7 px-2.5 rounded-[4px] bg-[#1F5C47] text-white text-xs font-medium hover:bg-[#174A39] flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3 stroke-[1.5]" />
              <span>Add</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
