import React, { useRef } from 'react';
import {
  Bold,
  Italic,
  List,
  Quote,
  Sparkles,
  Split,
  Plus,
  Trash2,
} from 'lucide-react';
import { ScriptContentData } from '../../types';

interface WrittenPostEditorProps {
  script: Partial<ScriptContentData>;
  onChange: (updates: Partial<ScriptContentData>) => void;
  onOpenAi: (mode?: string) => void;
}

export const WrittenPostEditor: React.FC<WrittenPostEditorProps> = ({
  script,
  onChange,
  onOpenAi,
}) => {
  const isThreadMode = script.isThreadMode || false;
  const writtenText = script.writtenText || script.bodyText || '';
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Compute thread parts
  const threadParts = React.useMemo(() => {
    if (!isThreadMode) return [];
    const rawParts = writtenText.split(/\n\s*---\s*\n/).filter((p) => p.trim());
    return rawParts.length > 0 ? rawParts : [writtenText];
  }, [writtenText, isThreadMode]);

  const toggleThreadMode = () => {
    onChange({ isThreadMode: !isThreadMode });
  };

  const handleTextChange = (val: string) => {
    onChange({ writtenText: val, bodyText: val });
  };

  // Quick formatting buttons that wrap selected text in markdown
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const selected = current.substring(start, end);

    const replacement = `${prefix}${selected || 'text'}${suffix}`;
    const newText = current.substring(0, start) + replacement + current.substring(end);

    handleTextChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected.length || 4)
      );
    }, 10);
  };

  // Handlers for thread mode updates
  const updateThreadPart = (idx: number, newPartText: string) => {
    const newParts = [...threadParts];
    newParts[idx] = newPartText;
    handleTextChange(newParts.join('\n\n---\n\n'));
  };

  const addThreadPart = () => {
    const newParts = [...threadParts, ''];
    handleTextChange(newParts.join('\n\n---\n\n'));
  };

  const removeThreadPart = (idx: number) => {
    if (threadParts.length <= 1) return;
    const newParts = threadParts.filter((_, i) => i !== idx);
    handleTextChange(newParts.join('\n\n---\n\n'));
  };

  const wordCount = writtenText.trim() ? writtenText.trim().split(/\s+/).length : 0;
  const charCount = writtenText.length;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FBFBFA] dark:bg-[#141413]">
      {/* Top Toolbar */}
      <div className="px-4 sm:px-6 py-2 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormatting('**', '**')}
            className="p-1 rounded-[4px] text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('*', '*')}
            className="p-1 rounded-[4px] text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('\n• ')}
            className="p-1 rounded-[4px] text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
            title="Bullet point"
          >
            <List className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('\n> ')}
            className="p-1 rounded-[4px] text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
            title="Quote"
          >
            <Quote className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>

          <div className="h-4 w-px bg-[#E6E4DF] dark:bg-[#2A2A27] mx-1.5" />

          {/* Thread Mode Toggle */}
          <button
            type="button"
            onClick={toggleThreadMode}
            className={`h-7 px-2.5 rounded-[4px] text-xs flex items-center gap-1.5 transition-colors ${
              isThreadMode
                ? 'bg-[#1F5C47] text-white font-medium'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]'
            }`}
          >
            <Split className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Thread mode</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenAi('refine')}
          className="text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>AI assist</span>
        </button>
      </div>

      {/* Editor Main Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-3xl mx-auto w-full">
        {!isThreadMode ? (
          /* Normal Single Document Writing Area */
          <div className="h-full flex flex-col space-y-2">
            <textarea
              ref={textareaRef}
              value={writtenText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Start drafting your post, essay, or caption..."
              className="w-full flex-1 min-h-[500px] text-sm p-4 rounded-[6px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed resize-none font-sans"
            />
            <div className="flex items-center justify-end gap-3 text-xs text-[#6F6C66] dark:text-[#9E9B93] tabular-nums pt-1">
              <span>{wordCount} words</span>
              <span>·</span>
              <span>{charCount} characters</span>
            </div>
          </div>
        ) : (
          /* Thread Mode Cards */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6E4DF] dark:border-[#2A2A27]">
              <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                Thread breakdown ({threadParts.length} parts)
              </span>
              <button
                type="button"
                onClick={addThreadPart}
                className="h-7 px-2.5 rounded-[4px] bg-[#1F5C47] text-white text-xs font-medium hover:bg-[#174A39] flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 stroke-[1.5]" />
                <span>Add part</span>
              </button>
            </div>

            {threadParts.map((part, idx) => {
              const partCharCount = part.length;
              const isOverLimit = partCharCount > 280;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] space-y-2 relative"
                >
                  <div className="flex items-center justify-between text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                    <span>
                      Part {idx + 1}/{threadParts.length}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`tabular-nums ${
                          isOverLimit ? 'text-[#B42318]' : ''
                        }`}
                      >
                        {partCharCount}/280 chars
                      </span>
                      {threadParts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeThreadPart(idx)}
                          className="p-1 rounded hover:bg-[#F3F2EF] dark:hover:bg-[#242421] text-[#6F6C66] hover:text-[#B42318]"
                          title="Remove part"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                        </button>
                      )}
                    </div>
                  </div>

                  <textarea
                    value={part}
                    onChange={(e) => updateThreadPart(idx, e.target.value)}
                    placeholder={`Part ${idx + 1} draft...`}
                    rows={4}
                    className="w-full text-sm p-3 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF] resize-none leading-relaxed"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
