import React, { useState } from 'react';
import {
  X,
  LayoutTemplate,
  Check,
  Clock,
} from 'lucide-react';
import { SCRIPT_TEMPLATES, ScriptTemplateDefinition } from '../../constants';
import { ScriptContentData } from '../../types';

interface StudioTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: ScriptTemplateDefinition) => void;
  currentScript: Partial<ScriptContentData>;
  onSaveCustomTemplate?: (name: string, description: string) => void;
}

export const StudioTemplatesModal: React.FC<StudioTemplatesModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(SCRIPT_TEMPLATES[0].id);

  if (!isOpen) return null;

  const activeTemplate = SCRIPT_TEMPLATES.find((t) => t.id === selectedTemplateId) || SCRIPT_TEMPLATES[0];

  const handleApply = () => {
    onApplyTemplate(activeTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141413]/50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] dark:bg-[#1C1C1A] w-full max-w-3xl rounded-[8px] border border-[#E6E4DF] dark:border-[#2A2A27] flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in duration-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 stroke-[1.5] text-[#6F6C66] dark:text-[#9E9B93]" />
            <h2 className="text-sm font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
              Script Templates
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

        {/* Content Body: Sidebar List + Preview Area */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Templates Picker list */}
          <div className="w-full md:w-64 border-r border-[#E6E4DF] dark:border-[#2A2A27] overflow-y-auto p-2 space-y-1 shrink-0 bg-[#FBFBFA] dark:bg-[#141413]">
            {SCRIPT_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`w-full text-left p-2.5 rounded-[6px] transition-colors flex flex-col gap-0.5 border ${
                    isSelected
                      ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF]'
                      : 'border-transparent hover:bg-[#F3F2EF] dark:hover:bg-[#242421] text-[#6F6C66] dark:text-[#9E9B93]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium truncate">
                      {tmpl.name}
                    </span>
                    {tmpl.targetSeconds && (
                      <span className="text-[10px] tabular-nums opacity-80 shrink-0 ml-1">
                        {tmpl.targetSeconds}s
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] opacity-75 line-clamp-1 leading-snug">
                    {tmpl.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Template Details & Preview */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                  {activeTemplate.name}
                </h3>
                <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93] tabular-nums">
                  ~{activeTemplate.targetSeconds || 60} seconds
                </span>
              </div>
              <p className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                {activeTemplate.description}
              </p>
            </div>

            {/* Hook preview */}
            <div className="p-3 rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] space-y-1">
              <span className="text-[10px] uppercase font-medium tracking-wider text-[#6F6C66] dark:text-[#9E9B93]">
                Hook
              </span>
              <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed">
                "{activeTemplate.hookText}"
              </p>
            </div>

            {/* Body preview */}
            <div className="p-3 rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] space-y-1">
              <span className="text-[10px] uppercase font-medium tracking-wider text-[#6F6C66] dark:text-[#9E9B93]">
                Core Points
              </span>
              <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed whitespace-pre-line">
                {activeTemplate.bodyText}
              </p>
            </div>

            {/* Call to action */}
            <div className="p-3 rounded-[6px] border border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] space-y-1">
              <span className="text-[10px] uppercase font-medium tracking-wider text-[#6F6C66] dark:text-[#9E9B93]">
                Call to Action
              </span>
              <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] leading-relaxed">
                {activeTemplate.callToActionText}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between bg-[#FFFFFF] dark:bg-[#1C1C1A]">
          <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
            Populates the current script editor
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-7 px-3 text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="h-7 px-3 text-xs font-medium rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Apply template</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
